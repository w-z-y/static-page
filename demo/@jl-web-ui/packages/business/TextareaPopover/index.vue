<template>
  <div class="jl-textarea-popover">
    <jl-popover
      ref="popoverRef"
      placement="bottom-start"
      v-bind="popoverProps"
      v-model="popoverVisible"
      trigger="manual"
      popper-class="jl-textarea-popper"
      @after-enter="handleAfterEnter"
      :visible-arrow="false"
      :popper-options="{
        boundariesElement: 'body',
        gpuAcceleration: false,
      }">
      <template #content>
        <jl-form.input ref="expandInput" type="textarea" v-bind="{ ...$attrs, ...popoverTextAreaProps }" v-model="internalValue" @blur="handleBlur" />
      </template>
    </jl-popover>

    <jl-resizer @click="handleOpenTextareaPopover" @resize="updatePopoverSize">
      <jl-form.input ref="inputRef" v-bind="$attrs" v-on="$listeners" type="textarea" v-model="internalValue" />
    </jl-resizer>
  </div>
</template>

<script>
import COM_PREFIX from '@jl/web-ui/src/config';
import modelMixin from '@jl/web-ui/src/mixin/model';
import JlFormInput from '../../base/Form/input';
import JlPopover from '../../base/Popover';
import JlResizer from '../../base/Resizer';

export default {
  name: COM_PREFIX + 'Business.TextareaPopover',
  mixins: [modelMixin],
  inheritAttrs: true,
  components: {
    'jl-form.input': JlFormInput,
    'jl-popover': JlPopover,
    'jl-resizer': JlResizer,
  },
  props: {
    // popover属性
    popoverProps: {
      type: Object,
      default: () => ({
        width: 500,
      }),
    },
    // popover中的textarea属性
    popoverTextAreaProps: {
      type: Object,
      default: () => ({
        rows: 8,
      }),
    },
  },
  data() {
    return {
      popoverVisible: false,
      resizeObserver: null,
    };
  },
  methods: {
    handleAfterEnter() {
      this.$refs.expandInput.focus();
    },
    handleOpenTextareaPopover() {
      this.popoverVisible = true;
      this.updatePopoverSize();
    },
    async updatePopoverSize() {
      if (!this.popoverVisible) return;
      await this.$nextTick();
      const popover = this.$refs.popoverRef.$refs.tooltipRef;
      const popper = popover?.$refs?.popper;
      if (popper) {
        const { width } = this.$refs.inputRef.$el.getBoundingClientRect();
        popper.style.setProperty('--jl-textarea-popover-reference-width', `${Math.max(width, this.popoverProps.width)}px`);
      }
    },
    async handleBlur() {
      this.popoverVisible = false;
      this.$emit('blur');
    },
  },
};
</script>

<style lang="scss" scoped>
.jl-textarea-popover {
  display: inline-block;
}
</style>
<style lang="scss">
.jl-textarea-popper {
  &.el-popover {
    transform: translate(-1px, calc(var(--jl-textarea-popover-reference-height) * -1));
    width: var(--jl-textarea-popover-reference-width) !important;
    margin-top: 0;
    padding: 0;
  }
}
</style>
