# Ai.Bubble Ai 消息气泡

## 基本用法

::: demo

```vue
<template>
  <jl-ai.bubble placement="end">
    <template #content> Hello! </template>
  </jl-ai.bubble>
  <jl-ai.bubble content="Hello! 😊 "> </jl-ai.bubble>
  <jl-ai.bubble>
    <template #content>How can I assist you today?</template>
  </jl-ai.bubble>
  <jl-ai.bubble block content="这是一个blcok气泡"> </jl-ai.bubble>
  <jl-ai.bubble content="这是一个inline-block气泡"> </jl-ai.bubble>
</template>

<script>
export default {};
</script>
```

:::

## 插槽

::: demo

````vue
<template>
  <jl-ai.bubble placement="end">
    <template #header>
      <span style="color: #ccc; font-size: 12px">2025-01-01 08:30</span>
    </template>
    <template #content> Hello! </template>
    <template #footer>
      <jl-icon.hover icon="el-icon-refresh-right" content="刷新"></jl-icon.hover>
    </template>
  </jl-ai.bubble>
  <jl-ai.bubble block>
    <template #header>
      <span style="color: #ccc; font-size: 12px">2025-01-01 08:31</span>
    </template>
    <template #content>
      <jl-ai.markdown :data="markdownData" />
    </template>
    <template #footer>
      <jl-icon.hover icon="el-icon-refresh-right" content="刷新"></jl-icon.hover>
    </template>
  </jl-ai.bubble>
</template>

<script>
export default {
  data() {
    return {
      markdownData: '## Hello! \n```js\n console.log("Hello") \n\n```\n 😊 How can I assist you today?',
    };
  },
};
</script>
````

:::

## Attribute

| 属性名    | 说明           | 类型    | 可选值          | 默认值  |
| --------- | -------------- | ------- | --------------- | ------- |
| placement | 气泡的对齐方式 | string  | 'start' / 'end' | 'start' |
| block     | 是否块级显示   | boolean | true / false    | false   |

## Slot

| 插槽名   | 说明         |
| -------- | ------------ |
| header   | 气泡头部内容 |
| content  | 气泡主体内容 |
| footer   | 气泡底部内容 |
