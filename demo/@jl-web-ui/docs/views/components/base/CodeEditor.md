# CodeEditor 代码编辑器

## 基本用法

### SQL

<ClientOnly>
::: demo

```vue
<template>
  <jl-code-editor.sql v-model="value" style="height: 200px"></jl-code-editor.sql>
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
</ClientOnly>

### Attributes

| 参数    | 说明         | 类型   | 可选值 | 默认值 |
| ------- | ------------ | ------ | ------ | ------ |
| v-model | 多选绑定的值 | object | —      | —      |
