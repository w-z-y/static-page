<!-- 悬浮有背景 -->
<template>
  <span class="jl-ai-button" :class="{ 'is-disabled': disabled }" @mouseenter="isHovering = true" @mouseleave="isHovering = false">
    <span class="jl-icon-hover" @click="handleClick" :style="textStyle">
      <jl-icon v-bind="$attrs" :color="internalColor[0]" :disabled="disabled" :class="{ [iconHoverClass]: !disabled && isHovering }"></jl-icon>
      <slot></slot>
    </span>
  </span>
</template>

<script>
import CreateVue from '@jl/web-ui/src/createVue';
import JlIcon from '../../base/Icon/index.vue';
export default CreateVue({
  name: 'Ai.Button',
  components: { JlIcon },
  props: {
    // 图标颜色
    color: { type: [String, Array], default: () => ['#3a48fb', '#ec78ff', '#ff78b1'] },
    // 禁用
    disabled: { type: Boolean, default: false },
    // 图标hover时的类名
    iconHoverClass: { type: String, default: 'jl-animation-shake-y' },
  },
  computed: {
    internalColor() {
      const color = this.color || this.colorDisabled;
      const colorList = Array.isArray(color) ? color : [color];
      return this.disabled ? [this.colorDisabled] : colorList;
    },
    textStyle() {
      return {
        background: `linear-gradient(90deg, ${this.internalColor.join(',')})`,
        backgroundClip: 'text',
        flex: 1,
        color: 'transparent',
      };
    },
  },
  data() {
    return {
      isHovering: false,
      colorDisabled: '#c0c0c0',
    };
  },
  methods: {
    handleClick(e) {
      if (this.disabled) return;
      this.$emit('click', e);
    },
  },
});
</script>

<style lang="scss" scoped>
.jl-ai-button {
  user-select: none;
  line-height: 1;
  display: inline-block;
  background-color: #f5f5f5;
  border-radius: var(--jl-border-radius);
  &.is-disabled {
    cursor: not-allowed;
  }
  &:not(.is-disabled) {
    cursor: pointer;
    &:hover {
      background-color: #edf4ff;
    }
  }
  .jl-icon-hover {
    vertical-align: bottom;
    display: inline-flex;
    justify-content: center;
    gap: 5px;
    align-items: center;
    padding: 0.3em;
    font-size: 1em;
    border-radius: 4px;
  }
}
</style>
