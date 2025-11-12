import { throttle } from '../util/index';

export default {
  methods: {
    resizeObserverWindowMixin_handleResizeWindow: throttle(function () {
      const rect = this.$el.getBoundingClientRect();
      this.$eventBus.$emit('window-resize', rect);
    }, 150),
  },
  mounted() {
    window.addEventListener('resize', this.resizeObserverWindowMixin_handleResizeWindow);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeObserverWindowMixin_handleResizeWindow);
  },
};
