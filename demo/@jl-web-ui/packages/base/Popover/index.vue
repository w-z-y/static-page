<template>
  <span class="jl-popover" ref="referenceRef">
    <slot></slot>
    <el-popover v-if="showPopper" :trigger="trigger" ref="tooltipRef" v-bind="$attrs" v-on="$listeners" :placement="placement" :visible-arrow="false">
      <template #default>
        <jl-resizer @resize="handleUpdatePopper">
          <slot name="content">
            {{ content }}
          </slot>
        </jl-resizer>
      </template>
    </el-popover>
  </span>
</template>

<script>
import createVue from '@jl/web-ui/src/createVue';
import JlResizer from '../Resizer';
import popperMixin from '@jl/web-ui/src/mixin/popper';

import { on, off } from '@jl/web-ui/src/util/dom';
export default createVue({
  name: 'Popover',
  props: {
    content: { type: String, default: '' },
    placement: { type: String, default: 'top' },
    trigger: { type: String, default: 'hover' },
  },
  mixins: [popperMixin],
  model: true,
  components: {
    JlResizer,
  },
  data() {
    return {
      isOverflow: false,
      internalContent: '',
      textEl: null,
      showPopper: false,
      showReference: false,
    };
  },
  watch: {
    internalValue(newValue) {
      this.popperMixin_isHovering = newValue;
    },
  },
  methods: {
    handleUpdatePopper() {
      const popper = this.$refs.tooltipRef;
      popper.updatePopper && popper.updatePopper();
    },
    getContent() {
      this.textEl = this.$refs.referenceRef;
      if (!this.textEl) return;
      this.internalContent = this.textEl.innerText;
    },
    handleClick() {
      if (this.trigger !== 'click') return;
      this.popperMixin_isHovering = true;
    },
    handleMouseEnter() {
      if (this.disabled || this.trigger !== 'hover') return;
      this.popperMixin_isHovering = true;
    },
    async handleMouseLeave() {
      if (this.trigger !== 'hover') return;
      this.popperMixin_isHovering = false;
    },
    // document click
    handleDocumentClick(e) {
      const reference = this.$refs.referenceRef;
      if (reference.contains(e.target)) {
        return;
      }
      this.popperMixin_isHovering = false;
    },
  },
  mounted() {
    const reference = this.$refs.referenceRef;
    if (this.trigger === 'click') {
      on(reference, 'click', this.handleClick);
      on(document, 'click', this.handleDocumentClick);
    } else if (this.trigger === 'hover') {
      on(reference, 'mouseenter', this.handleMouseEnter);
      on(reference, 'mouseleave', this.handleMouseLeave);
    }
  },
  destroyed() {
    const reference = this.$refs.referenceRef;

    off(reference, 'click', this.handleClick);
    off(reference, 'mouseenter', this.handleMouseEnter);
    off(reference, 'mouseleave', this.handleMouseLeave);
    off(document, 'click', this.handleDocumentClick);
  },
});
</script>

<style lang="scss" scoped>
.jl-popover {
}
</style>
