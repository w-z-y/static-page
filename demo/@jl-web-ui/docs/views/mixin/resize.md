## `resizeObserve` 混入

用于监听窗口尺寸变化，Vue 原型需要提供`$eventBus`

- 父组件使用

```js
import resizeObserveMixin from '@jl/web-ui/lib/mixin/resizeObserve';

export default {
  //...
  mixins: [resizeObserveMixin],
  //...
};
```

- 子组件使用

```js
export default {
  methods: {
    windowResize(size) {
      console.log('window尺寸变化', size);
    },
  },
  mounted() {
    this.$eventBus.$on('window-resize', this.windowResize);
  },
  beforeDestroy() {
    this.$eventBus.$off('window-resize', this.windowResize);
  },
};
```
