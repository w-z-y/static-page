# TextEditor 文本编辑器

- 只能粘贴文本
- 不支持图片(需要支持，请使用`jl-markdown-editor`组件)

## 基本用法

<ClientOnly>
::: demo

```vue
<template>
  <jl-text-editor ref="jlTextEditor" v-model="value"></jl-text-editor>
</template>

<script>
export default {
  data() {
    return {
      value: '文本编辑器',
    };
  },
};
</script>
```

:::
</ClientOnly>
