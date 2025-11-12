# Empty 空状态

空状态组件用于在数据为空时显示友好的提示信息，支持自定义图片、描述文本、操作按钮等。常用于列表为空、搜索结果为空、网络错误等场景。

## 基本用法

::: demo

```vue
<template>
  <jl-empty></jl-empty>
</template>
```

:::

## 自定义图片、图片尺寸

通过`image`属性可以自定义空状态图片。

::: demo

```vue
<template>
  <div>
    <jl-empty image="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" description="暂无数据"> </jl-empty>

    <jl-empty
      :image-size="200"
      image="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
      description="暂无数据">
    </jl-empty>
  </div>
</template>
```

:::

## 添加操作按钮

可以通过插槽添加操作按钮。
:::demo

```vue
<template>
  <jl-empty description="暂无数据">
    <template #default>
      <jl-button primary @click="handleAdd">添加数据</jl-button>
    </template>
  </jl-empty>
</template>

<script>
export default {
  methods: {
    handleAdd() {
      console.log('添加数据');
    },
  },
};
</script>
```

:::

### Attributes

| 参数        | 说明           | 类型   | 可选值 | 默认值     |
| ----------- | -------------- | ------ | ------ | ---------- |
| image       | 空状态图片地址 | string | —      | —          |
| image-size  | 图片尺寸       | number | —      | 100        |
| description | 空状态描述文本 | string | —      | '暂无数据' |

### Slot

| 插槽名  | 说明           |
| ------- | -------------- |
| default | 自定义底部内容 |
