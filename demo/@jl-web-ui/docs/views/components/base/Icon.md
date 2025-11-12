# Icon 图标

图标组件用于显示各种图标，支持多种图标类型、尺寸、颜色、动画效果等。基于 Element UI 的图标系统，提供了丰富的图标库。

::: tip 图标库

1. 默认图标库，点击 [iconfont](https://www.iconfont.cn/invite?type=project&token=BuDKWd7Hxj1UerTg#邀请你加入「@jl/web-ui」) 进入查看

2. 如何同步 =>
   本地运行 `npm run iconfont` 会将远端图标文件自动下载到本地
   :::

3. 未去颜色的图标是无法通过`color`属性改色的

## 基本用法

:::demo

```vue
<template>
  <jl-icon icon="el-icon-edit"></jl-icon>
  <jl-icon icon="el-icon-share"></jl-icon>
  <jl-icon icon="el-icon-delete"></jl-icon>
  <jl-icon icon="el-icon-search"></jl-icon>
  <jl-icon icon="translate"></jl-icon>
</template>
```

:::

## 不同尺寸

通过`size`属性可以设置图标的尺寸。

:::demo

```vue
<template>
  <jl-icon icon="el-icon-star-on" :size="12" color="var(--jl-warning)"></jl-icon>
  <jl-icon icon="el-icon-star-on" color="var(--jl-warning)"></jl-icon>
  <jl-icon icon="el-icon-star-on" size="20px" color="var(--jl-warning)"></jl-icon>
  <jl-icon icon="el-icon-star-off" size="24px" color="var(--jl-warning)"></jl-icon>
  <jl-icon icon="el-icon-star-off" size="32px" color="var(--jl-warning)"></jl-icon>
</template>
```

:::

## 悬停效果 `jl-icon.hover` 组件

通过 `content` 来控制悬浮提示内容，不传则不提示

:::demo

```vue
<template>
  <jl-icon.hover icon="el-icon-date" content="这里是提示内容"></jl-icon.hover>
  <jl-icon.hover icon="el-icon-star-on" color="pink" content="color='pink'"></jl-icon.hover>
  <jl-icon.hover icon="el-icon-star-off" @click="handleClickIcon">点击</jl-icon.hover>
  <jl-icon.hover icon="magic-stick" t>没有提示</jl-icon.hover>
  <jl-icon.hover icon="magic-stick2" icon-hover-class="jl-animation-shake-y">hover图标会动</jl-icon.hover>
  <jl-icon.hover icon="magic-loading" :size="22" text="fontSize:22px"></jl-icon.hover>
</template>
<script>
export default {
  methods: {
    handleClickIcon() {
      this.$message.success('点击图标');
    },
  },
};
</script>
```

:::

## `jl-icon.hover` 组件禁用 `disabled`

:::demo

```vue
<template>
  <jl-icon.hover disabled icon="el-icon-date" content="这里是提示内容"></jl-icon.hover>
  <jl-icon.hover disabled icon="magic-stick" text="魔法棒" content="这是一个魔法棒"></jl-icon.hover>
</template>
```

:::

## 加载状态

通过`loading`属性可以显示加载动画。

:::demo

```vue
<template>
  <jl-icon.loading></jl-icon.loading>
  <jl-icon.loading icon="el-icon-loading"></jl-icon.loading>
  <jl-icon.loading icon="el-icon-refresh"></jl-icon.loading>
</template>
```

:::

## 全屏图标

::: tip reference
`reference` 来绑定需要全屏的元素
:::

:::demo

```vue
<template>
  <jl-icon.fullscreen reference="html"></jl-icon.fullscreen>
  <jl-icon.fullscreen :reference="reference"></jl-icon.fullscreen>
  <jl-icon.hover icon="el-icon-refresh" content="刷新"></jl-icon.hover>
  <jl-icon.hover icon="magic-stick" content="收藏"></jl-icon.hover>
</template>

<script>
export default {
  data() {
    return {
      reference: null,
    };
  },
  mounted() {
    this.reference = document.documentElement;
  },
};
</script>
```

:::

### Attributes

| 参数             | 说明                                     | 类型          | 可选值     | 默认值 |
| ---------------- | ---------------------------------------- | ------------- | ---------- | ------ |
| icon             | 图标名称                                 | string        | —          | —      |
| size             | 图标尺寸                                 | string/number | —          | —      |
| color            | 图标颜色                                 | string        | —          | —      |
| disabled         | 禁用 `jl-icon.hover` 组件使用            | boolean       | true/false | false  |
| icon-hover-class | hover 时，给图标添加的类名(特殊场景使用) | string        | —          | —      |

### Events

| 事件名 | 说明           | 回调参数            |
| ------ | -------------- | ------------------- |
| click  | 点击图标时触发 | event: 点击事件对象 |

### Slot

| 插槽名  | 说明     |
| ------- | -------- |
| default | 图标内容 |
