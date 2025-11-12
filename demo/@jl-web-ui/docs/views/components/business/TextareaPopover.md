## 基本用法

::: demo

```vue
<template>
  <jl-business.textarea-popover v-model="value" :rows="1" placeholder="请输入" style="width: 200px"></jl-business.textarea-popover>
</template>
<script>
export default {
  data() {
    return {
      value: '',
    };
  },
};
</script>
```

:::

::: demo

```vue
<template>
  <jl-business.textarea-popover v-model="value" :rows="2" style="width: 100%" placeholder="请输入"></jl-business.textarea-popover>
</template>
<script>
export default {
  data() {
    return {
      value: '',
    };
  },
};
</script>
```

:::

### Attributes

| 属性名               | 说明                                   | 类型   | 默认值         |
| -------------------- | -------------------------------------- | ------ | -------------- |
| v-model / value      | 绑定值                                 | String | -              |
| popoverProps         | popover 的属性（如宽度等）             | Object | { width: 500 } |
| popoverTextAreaProps | popover 中 textarea 的属性（如行数等） | Object | { rows: 8 }    |

### Events

| 事件名 | 说明           | 回调参数 |
| ------ | -------------- | -------- |
| blur   | 失去焦点时触发 | -        |
