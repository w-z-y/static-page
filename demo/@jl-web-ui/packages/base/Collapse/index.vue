<template>
  <el-collapse v-model="activeNames" class="jl-collapse xxxxx" :class="{ 'is-reverse': reverse }" :accordion="accordion" v-bind="$attrs" v-on="$listeners">
    <el-collapse-item
      v-for="(option, index) in options"
      :key="option[defaultProps.value]"
      :name="option[defaultProps.value]"
      :disabled="options[defaultProps.disabled]">
      <template #title>
        <div class="jl-collapse-title">
          <!-- slot 标题 -->
          <span class="flex items-center">
            <slot name="title" v-bind="{ option, index }">
              <span v-if="showLabelMark" class="label-mark"></span>
              <span class="flex-1 flex items-center">
                <span>{{ option[defaultProps.label] }}</span>
              </span>
            </slot>
          </span>
          <!-- slot 标题后的操作 -->
          <span @click.stop>
            <slot name="title-operation" v-bind="{ option, index }"></slot>
          </span>
        </div>
      </template>
      <template #default>
        <slot v-bind="{ option, index }">
          <jl-empty></jl-empty>
        </slot>
      </template>
    </el-collapse-item>
  </el-collapse>
</template>
<script>
import COM_PREFIX from '@jl/web-ui/src/config';
import modelMixin from '@jl/web-ui/src/mixin/model';
import propsMixin from '@jl/web-ui/src/mixin/props';
export default {
  name: COM_PREFIX + 'Collapse',
  mixins: [modelMixin, propsMixin],
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    // 是否显示标签前的标记
    showLabelMark: {
      type: Boolean,
      default: false,
    },
    // 箭头是否放在前面(默认后面)
    reverse: {
      type: Boolean,
      default: false,
    },
    // 是否手风琴模式
    accordion: {
      type: Boolean,
      default: false,
    },
    // 是否默认展开全部
    defaultExpandAll: {
      type: Boolean,
      default: false,
    },
    // 是否手风琴模式
    accordion: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    optionsLength() {
      return this.options.length;
    },
  },
  data() {
    return {
      activeNames: null,
    };
  },
  watch: {
    value: {
      handler(val) {
        this.activeNames = val;
      },
      immediate: true,
    },
    optionsLength: {
      handler(val) {
        if (!val) return;
        if (this.defaultExpandAll) {
          this.activeNames = this.options.map((i) => i[this.defaultProps.value]);
        }
      },
      immediate: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.jl-collapse {
  &.el-collapse {
    .el-collapse-item {
      ::v-deep .el-collapse-item__header {
        height: auto;
        gap: 10px;
        line-height: unset;
        padding: 10px;
        .jl-collapse-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          overflow: hidden;
          flex: 1;
          font-size: 16px;
          color: var(--jl-text-second);
          .label-mark {
            display: inline-block;
            width: 0.5em;
            height: 1em;
            border-radius: 0.3em;
            margin-right: 0.7em;
            background-color: var(--jl-primary);
          }
        }
      }
      ::v-deep .el-collapse-item__content {
        overflow: hidden;
        padding: 12px;
      }
    }
    &.is-reverse {
      .el-collapse-item {
        ::v-deep .el-collapse-item__header {
          flex-direction: row-reverse;
        }
      }
    }
  }
}
</style>
