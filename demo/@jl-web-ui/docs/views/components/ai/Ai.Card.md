# Ai.Card Ai 消息卡片

父级需要混入`@jl/web-uilib/mixin/resizeObserve`，才能实现不同尺寸不同样式的卡片

## 基本用法

<ClientOnly>
::: demo

```vue
<template>
  <jl-ai.card title="这是卡片标题这是卡片标题这是卡片标题这是卡片标题" description="创建时间：10-07 12:30">
    <template #img>
      <img src="https://fastly.picsum.photos/id/962/200/200.jpg?hmac=XehF7z9JYkgC-2ZfSP05h7eyumIq9wNKUDoCLklIhr4" />
    </template>
  </jl-ai.card>
</template>

<script>
export default {};
</script>
```

:::
</ClientOnly>
