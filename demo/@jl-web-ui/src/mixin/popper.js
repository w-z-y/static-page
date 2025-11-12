// 引入后，组件中只需要使用 popperMixin_isHovering:boolean 变量控制即可

export default {
  data() {
    return {
      popperMixin_isHovering: false,

      popperMixin_showPopperUnwatcher: null,
    };
  },
  watch: {
    // 悬浮状态
    async popperMixin_isHovering(newVal) {
      if (newVal) {
        this.showPopper = true;
      }
      await this.$nextTick();
      const popper = this.$refs.tooltipRef;
      const reference = this.$refs.referenceRef;
      if (!popper) return;
      if (newVal) {
        if (reference) {
          popper.referenceElm = reference;
          popper.popperJS && (popper.popperJS._reference = reference);
        }
        // 监听为了销毁
        this.popperMixin_showPopperUnwatcher = this.$watch(
          () => popper.showPopper,
          (isShowNewVal) => {
            this.showPopper = this.internalValue = isShowNewVal;
            if (isShowNewVal) {
            } else {
              this.popperMixin_unwatchShowPopper();
            }
          }
        );
        popper.show && popper.show();
        setTimeout(() => {
          popper.updatePopper && popper.updatePopper();
        }, 0);
        // popover的
        popper.handleMouseEnter && popper.handleMouseEnter();
      } else {
        // tooltip的
        popper.hide && popper.hide();
        // popover的
        popper.handleMouseLeave && popper.handleMouseLeave();
      }
    },
  },
  methods: {
    popperMixin_unwatchShowPopper() {
      if (this.popperMixin_showPopperUnwatcher) {
        this.popperMixin_showPopperUnwatcher();
        this.popperMixin_showPopperUnwatcher = null;
      }
    },
  },
  beforeDestroy() {
    // 组件销毁时清理 watcher，防止内存泄漏
    this.popperMixin_unwatchShowPopper();
  },
};
