<template>
  <span
    class="jl-tooltip"
    ref="referenceRef"
    :style="{
      '-webkit-line-clamp': rows,
      display: block ? '-webkit-box' : '-webkit-inline-box',
      overflow: !rows && 'visible',
    }"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave">
    <slot></slot>
    <el-tooltip
      v-if="showPopper"
      ref="tooltipRef"
      effect="dark"
      :class="{ 'is-one-row': rows === 1 }"
      :popper-class="internalPopperClass"
      :content="hasContentSlot ? undefined : content || internalContent"
      :disabled="isDisabled"
      :enterable="enterable"
      :placement="placement"
      :visible-arrow="visibleArrow">
      <template v-if="hasContentSlot" #content>
        <slot name="content"></slot>
      </template>
    </el-tooltip>
  </span>
</template>

<script>
import createVue from '@jl/web-ui/src/createVue';
import popperMixin from '@jl/web-ui/src/mixin/popper';
export default createVue({
  name: 'Tooltip',
  inheritAttrs: false,
  model: true,
  mixins: [popperMixin],
  props: {
    value: { type: Boolean, default: false },
    rows: { type: Number, default: 0 },
    block: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    enterable: { type: Boolean, default: true },
    content: { type: String, default: '' },
    placement: { type: String, default: 'top' },
    popperClass: { type: String, default: '' },
    hideOnClick: { type: Boolean, default: false },
    visibleArrow: { type: Boolean, default: false },
  },
  watch: {
    async internalValue(newVal) {
      if (newVal) {
        this.handleMouseEnter();
      } else {
        this.handleMouseLeave();
      }
    },
  },
  computed: {
    internalPopperClass() {
      return ['custom-tooltip', this.popperClass].filter(Boolean).join(' ');
    },
    isDisabled() {
      return this.disabled || (!this.isOverflow && !!this.rows);
    },
    hasContentSlot() {
      return !!this.$slots.content;
    },
  },
  data() {
    return {
      isOverflow: false,
      internalContent: '',
      referenceEl: null,

      showPopper: false,
    };
  },
  methods: {
    getContent() {
      this.referenceEl = this.$refs.referenceRef;
      if (!this.referenceEl) return;
      this.internalContent = this.referenceEl.innerText;
    },
    handleMouseEnter() {
      this.getContent();
      this.checkOverflow();
      if (this.isDisabled) return;
      this.popperMixin_isHovering = this.internalValue = true;
    },
    async handleMouseLeave() {
      this.popperMixin_isHovering = false;
      if (!this.enterable) {
        this.showPopper = false;
      }
    },
    checkOverflow() {
      if (!this.referenceEl) return;
      this.isOverflow =
        this.referenceEl.scrollWidth - 1 > this.referenceEl.clientWidth || this.referenceEl.scrollHeight - 1 > this.referenceEl.clientHeight;
    },
    handleClick() {
      if (this.hideOnClick) {
        this.showPopper = false;
      }
      this.$emit('click');
    },
  },
});
</script>

<style lang="scss" scoped>
.jl-tooltip {
  max-width: 100%;
  word-break: break-all;
  vertical-align: bottom;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;

  &.is-one-row {
    white-space: nowrap;
  }
}
</style>
<style lang="scss">
.el-tooltip__popper {
  &.custom-tooltip {
    z-index: 99999 !important;
    max-width: 100px;
    max-height: 300px;
  }
}
</style>
