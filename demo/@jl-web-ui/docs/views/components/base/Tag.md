# Tag 标签

## 基本用法

::: demo

```vue
<template>
  <jl-tag>标签一</jl-tag>
  <jl-tag success>标签二</jl-tag>
  <jl-tag danger>标签三</jl-tag>
  <jl-tag warning>标签四</jl-tag>
  <jl-tag info>标签五</jl-tag>
</template>
```

:::

## `plain`

::: demo

```vue
<template>
  <jl-tag plain>标签一</jl-tag>
  <jl-tag plain success>标签二</jl-tag>
  <jl-tag plain danger>标签三</jl-tag>
  <jl-tag plain warning>标签四</jl-tag>
  <jl-tag plain info>标签五</jl-tag>
</template>
```

:::

## `plain` `border`="false" 无边框

::: demo

```vue
<template>
  <jl-tag :border="false" plain>标签一</jl-tag>
  <jl-tag :border="false" plain success>标签二</jl-tag>
  <jl-tag :border="false" plain danger>标签三</jl-tag>
  <jl-tag :border="false" plain warning>标签四</jl-tag>
  <jl-tag :border="false" plain info>标签五</jl-tag>
</template>
```

:::

## `text`

::: demo

```vue
<template>
  <jl-card>
    <jl-tag text>标签一</jl-tag>
    <jl-tag text success>标签二</jl-tag>
    <jl-tag text danger>标签三</jl-tag>
    <jl-tag text warning>标签四</jl-tag>
    <jl-tag text info>标签五</jl-tag>
  </jl-card>
  <jl-card style="margin-top: 10px">
    <jl-tag text text-background>标签一</jl-tag>
    <jl-tag text success text-background>标签二</jl-tag>
    <jl-tag text danger text-background>标签三</jl-tag>
    <jl-tag text warning text-background>标签四</jl-tag>
    <jl-tag text info text-background>标签五</jl-tag>
  </jl-card>
</template>
```

:::

## `closable` 可关闭

::: demo

```vue
<template>
  <jl-card>
    <jl-tag closable>标签一</jl-tag>
    <jl-tag closable success>标签二</jl-tag>
    <jl-tag closable danger>标签三</jl-tag>
    <jl-tag closable warning>标签四</jl-tag>
    <jl-tag closable info>标签五</jl-tag>
  </jl-card>
  <jl-card style="margin-top: 10px">
    <jl-tag plain closable>标签一</jl-tag>
    <jl-tag plain closable success>标签二</jl-tag>
    <jl-tag plain closable danger>标签三</jl-tag>
    <jl-tag plain closable warning>标签四</jl-tag>
    <jl-tag plain closable info>标签五</jl-tag>
  </jl-card>
  <jl-card style="margin-top: 10px">
    <jl-tag plain closable :border="false">标签一</jl-tag>
    <jl-tag plain closable :border="false" success>标签二</jl-tag>
    <jl-tag plain closable :border="false" danger>标签三</jl-tag>
    <jl-tag plain closable :border="false" warning>标签四</jl-tag>
    <jl-tag plain closable :border="false" info>标签五</jl-tag>
  </jl-card>
  <jl-card style="margin-top: 10px">
    <jl-tag closable text>标签一</jl-tag>
    <jl-tag closable text success>标签二</jl-tag>
    <jl-tag closable text danger>标签三</jl-tag>
    <jl-tag closable text warning>标签四</jl-tag>
    <jl-tag closable text info>标签五</jl-tag>
  </jl-card>
</template>
```

:::

## `size` 字体大小

::: demo

```vue
<template>
  <jl-tag :size="30" info>标签一</jl-tag>
</template>
```

:::

## `color` 自定义颜色

- `color` 属性支持颜色关键字、十六进制、rgb 等多种格式。
- 使用 `text`（Element Tag 的属性）时，可配合 `textBackground` 属性实现带背景的文字标签效果。

::: demo

```vue
<template>
  <jl-card>
    <jl-tag :color="color">标签一</jl-tag>
    <jl-tag :color="color" closable>标签一</jl-tag>
    <jl-tag :color="color" plain>标签一</jl-tag>
    <jl-tag :color="color" plain closable>标签一</jl-tag>
    <jl-tag :color="color" text>标签一</jl-tag>
    <jl-tag :color="color" text closable>标签一</jl-tag>
    <jl-tag :color="color" text closable text-background>标签一</jl-tag>
    <el-color-picker v-model="color" style="vertical-align: middle;" />
  </jl-card>
  <jl-card style="margin-top: 10px">
    <jl-tag color="pink">标签一</jl-tag>
    <jl-tag color="pink" closable>标签一</jl-tag>
    <jl-tag color="pink" plain>标签一</jl-tag>
    <jl-tag color="pink" plain closable>标签一</jl-tag>
    <jl-tag color="pink" text>标签一</jl-tag>
    <jl-tag color="pink" text closable>标签一</jl-tag>
    <jl-tag color="pink" text closable text-background>标签一</jl-tag>
  </jl-card>
  <jl-card style="margin-top: 10px">
    <jl-tag color="#049fd1">标签一</jl-tag>
    <jl-tag color="#049fd1" closable>标签一</jl-tag>
    <jl-tag color="#049fd1" plain>标签一</jl-tag>
    <jl-tag color="#049fd1" plain closable>标签一</jl-tag>
    <jl-tag color="#049fd1" text>标签一</jl-tag>
    <jl-tag color="#049fd1" text closable>标签一</jl-tag>
    <jl-tag color="#049fd1" text closable text-background>标签一</jl-tag>
  </jl-card>
  <jl-card style="margin-top: 10px">
    <jl-tag color="rgb(255, 85, 0)">标签一</jl-tag>
    <jl-tag color="rgb(255, 85, 0)" closable>标签一</jl-tag>
    <jl-tag color="rgb(255, 85, 0)" plain>标签一</jl-tag>
    <jl-tag color="rgb(255, 85, 0)" plain closable>标签一</jl-tag>
    <jl-tag color="rgb(255, 85, 0)" text>标签一</jl-tag>
    <jl-tag color="rgb(255, 85, 0)" text closable>标签一</jl-tag>
    <jl-tag color="rgb(255, 85, 0)" text closable text-background>标签一</jl-tag>
  </jl-card>
</template>
<script>
export default {
  data() {
    return {
      color: '#4d6bfe',
    };
  },
};
</script>
```

:::

## Attributes

| 参数             | 说明           | 类型            | 可选值 | 默认值  |
| ---------------- | -------------- | --------------- | ------ | ------- |
| `size`           | 字体大小       | string / number | —      | `12px`  |
| `plain`          | 是否为朴素标签 | boolean         | —      | `false` |
| `border`         | 是否显示边框   | boolean         | —      | `true`  |
| `color`          | 自定义颜色     | string          | —      | —       |
| `text`           | 是否为文字标签 | boolean         | —      | `false` |
| `textBackground` | 文字标签带背景 | boolean         | —      | `false` |
