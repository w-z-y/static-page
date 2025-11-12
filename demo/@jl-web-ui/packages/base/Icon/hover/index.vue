<!-- 悬浮有背景 -->
<template>
  <jl-tooltip
    v-model="tooltipVisible"
    :disabled="disabled || !content"
    :enterable="false"
    :content="content"
    :placement="placement"
    style="overflow: visible">
    <span
      class="jl-icon-hover"
      @click="handleClick"
      :class="{ 'is-disabled': disabled }"
      :style="{ backgroundColor: bgColor, color: internalColor, fontSize }"
      @mouseenter="isHovering = true"
      @mouseleave="isHovering = false">
      <jl-icon
        v-if="icon"
        :size="fontSize"
        :color="internalColor"
        v-bind="$attrs"
        :icon="icon"
        :disabled="disabled"
        :class="{ [iconHoverClass]: !disabled && isHovering }"></jl-icon>
      <template v-if="$slots.default">
        <slot></slot>
      </template>
    </span>
  </jl-tooltip>
</template>

<script>
import COM_PREFIX from '@jl/web-ui/src/config';
import JlTooltip from '../../Tooltip/index.vue';
import JlIcon from '../index.vue';
import { handlePxValue } from '@jl/web-ui/src/util';
export default {
  name: COM_PREFIX + 'Icon.Hover',
  components: { JlTooltip, JlIcon },
  props: {
    // 图标名称
    icon: { default: '', type: String },
    // tooltip 位置
    placement: { type: String, default: 'top' }, // tooltip 提示内容
    // tooltip 提示内容
    content: { type: String, default: '' },
    // 图标颜色
    color: { type: String, default: 'var(--jl-icon-color)' },
    // hover 背景颜色
    bgColor: { type: String, default: '' },
    // 禁用
    disabled: { type: Boolean, default: false },
    // 字体大小
    size: { type: [String, Number], default: '1em' },
    // 图标hover时的类名
    iconHoverClass: { type: String, default: '' },
  },
  computed: {
    fontSize() {
      return handlePxValue(this.size);
    },
    internalColor() {
      return this.disabled ? this.colorDisabled : this.color;
    },
  },
  data() {
    return {
      tooltipVisible: false,
      colorDisabled: '#c0c0c0',
      isHovering: false,
    };
  },
  methods: {
    handleClick(e) {
      if (this.disabled) return;
      this.$emit('click', e);
    },
  },
};
</script>

<style lang="scss" scoped>
.jl-icon-hover {
  box-sizing: content-box;
  display: inline-flex;
  justify-content: center;
  gap: 5px;
  align-items: center;
  padding: 0.3em;
  font-size: 1em;
  height: 1em;
  border-radius: 4px;
  &.is-disabled {
    cursor: not-allowed;
  }
  &:not(.is-disabled) {
    cursor: pointer;
    &:hover {
      background-color: var(--jl-icon-background-color-hover);
    }
  }
  ::v-deep svg {
    display: inline-block;
    vertical-align: -0.2em;
    width: 1em;
    height: 1em;
    fill: currentColor;
    overflow: hidden;
    font-style: normal;
  }
}
</style>
