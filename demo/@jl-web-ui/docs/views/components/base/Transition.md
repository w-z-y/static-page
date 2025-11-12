# Transition 过渡

监听内容过渡变化，提供过渡的不同时机的回调

<ClientOnly>
::: demo

```vue
<template>
  <jl-transition
    :style="{ width: dynamicWidth }"
    style="border: 1px solid #ccc; transition: 200ms; padding: 20px;"
    @transition-start="handleTransitionStart"
    @transition-end="handleTransitionEnd">
    <div>宽度过渡</div>
  </jl-transition>
</template>
<script>
export default {
  data() {
    return {
      dynamicWidth: '100px',
    };
  },
  mounted() {
    setInterval(() => {
      this.dynamicWidth = Math.floor(200 + Math.random() * 401) + 'px';
    }, 1000);
  },
  methods: {
    handleTransitionStart() {
      console.log('start');
    },
    handleTransitionEnd() {
      console.log('end');
    },
  },
};
</script>
```

:::
</ClientOnly>

### Events

| 事件名           | 说明           | 回调参数        |
| ---------------- | -------------- | --------------- |
| transition-start | 过渡开始时触发 | event: 事件对象 |
| transition-end   | 过渡结束时触发 | event: 事件对象 |

### Slot

| 插槽属性 | 说明                              |
| -------- | --------------------------------- |
| default  | 暴露属性`is-transition`, 为布尔值 |
