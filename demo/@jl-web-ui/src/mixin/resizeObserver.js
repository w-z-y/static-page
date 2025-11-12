import { throttle } from '../util/index';
export default {
  data() {
    return {
      resizeObserveMixin_observeCancel: null,
    };
  },
  methods: {
    resizeObserveMixin_onResize: throttle(function ({ width, height }) {
      this.$eventBus && this.$eventBus.$emit('el-resize', { width, height });
    }, 0),
    resizeObserveMixin_observeElementResize(element, callback) {
      if (!element || !(element instanceof HTMLElement)) {
        console.warn('observeElementResize: 请传入有效的 DOM 元素');
        return () => {};
      }
      const resizeObserver = new ResizeObserver((entries) => {
        for (let i = 0; i < entries.length; i++) {
          const rect = this.$el.getBoundingClientRect();
          callback(rect);
        }
      });
      resizeObserver.observe(element);

      // 返回一个取消监听的函数
      return () => {
        resizeObserver.unobserve(element);
        resizeObserver.disconnect();
      };
    },
  },
  mounted() {
    // 默认监听 this.$el，可覆盖调用 observe 方法监听其他元素
    this.resizeObserveMixin_observeCancel = this.resizeObserveMixin_observeElementResize(this.$el, this.resizeObserveMixin_onResize);
  },
  beforeDestroy() {
    if (this.resizeObserveMixin_observeCancel) {
      this.resizeObserveMixin_observeCancel();
      this.resizeObserveMixin_observeCancel = null;
    }
  },
};
