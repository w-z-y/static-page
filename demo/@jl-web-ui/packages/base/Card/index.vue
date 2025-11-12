<template>
  <el-card
    :class="{
      transparent,
      'is-overflow-visible': overflowVisible,
      'is-border': border,
      'is-hover': hover,
    }"
    :shadow="internalShadow"
    v-bind="$attrs"
    class="jl-card"
    :body-style="{ padding: internalPadding }">
    <template #header v-if="header || $slots.header">
      <div class="flex items-center" style="gap: 10px">
        <span v-if="showLabelMark" class="label-mark flex-shrink-0"></span>
        <span class="flex-1 overflow-hidden text-ellipsis">{{ header }}</span>

        <span style="margin-left: auto">
          <slot name="operation"></slot>
        </span>
      </div>
    </template>
    <template #[slotName] v-for="(slot, slotName) in $slots">
      <slot :name="slotName" />
    </template>
  </el-card>
</template>

<script>
import COM_PREFIX from '@jl/web-ui/src/config';
import { handlePxValue } from '@jl/web-ui/src/util';
export default {
  name: COM_PREFIX + 'Card',
  props: {
    header: { type: String, default: '' }, // 超出默认隐藏（设置为true, 会丢失盒模型）
    showLabelMark: { type: Boolean, default: false }, // 是否显示mark标记
    padding: { type: [Number, String, Array], default: '0.7em' },
    transparent: { type: Boolean, default: false },
    overflowVisible: { type: Boolean, default: false }, // 超出默认隐藏（设置为true, 会丢失盒模型）
    shadow: { type: [Boolean, String], default: false },
    border: { type: Boolean, default: true },
    hover: { type: Boolean, default: false }, // hover偏移效果
  },
  computed: {
    internalPadding() {
      return handlePxValue(this.padding);
    },
    internalShadow() {
      if (typeof this.shadow === 'boolean') {
        return this.shadow ? 'always' : 'never';
      } else {
        return this.shadow;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.jl-card {
  width: 100%;
  display: flex;
  color: #303133;
  flex-direction: column;
  color: var(--jl-sidebar-color);
  background-color: var(--jl-global-background-color);
  position: relative;
  overflow: hidden;
  border-width: 0;
  &.is-always-shadow:hover {
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
  }
  &.is-border {
    border-width: 1px;
    border-color: var(--jl-global-border-color);
    border-radius: var(--jl-border-radius);
    ::v-deep .el-card__header {
      border-bottom: 1px solid var(--jl-global-border-color);
    }
  }
  &.is-hover {
    transition: box-shadow 200ms, transform 200ms;
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
    }
  }

  &.is-overflow-visible {
    overflow: visible;
    ::v-deep {
      .el-card__body {
        overflow: visible;
      }
    }
  }
  &.transparent {
    background-color: #0000;
  }
  ::v-deep {
    .el-card__header {
      border: none;
      padding: 0.7em;

      .label-mark {
        display: inline-block;
        width: 0.3em;
        height: 1em;
        border-radius: 0.3em;
        background-color: var(--jl-primary);
      }
    }
    .el-card__body {
      box-sizing: border-box;
      width: 100%;
      flex: 1;
      overflow: auto;
    }
  }
}
</style>
