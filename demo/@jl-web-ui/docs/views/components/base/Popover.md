# Popover 弹出框

- 优化了内存问题
- 解决悬浮内容尺寸变化时，会导致位置不更新问题

## 基本用法

::: demo

```vue
<jl-popover title="标题" content="内容">
    <jl-button>hover 激活</jl-button>
</jl-popover>
<jl-popover title="标题" content="内容" trigger="click">
    <jl-button>click 激活</jl-button>
</jl-popover>
<jl-popover>
    <template #content>
        <div>
            这里是自定义内容
        </div>
    </template>
    <jl-button>自定义content</jl-button>
</jl-popover>
```

:::

## content 插槽的内容会动态变化

::: demo

```vue
<template>
  <jl-popover>
    <template #content>
      <div class="popover-content-list-item" v-for="item in contentNum">这里是自定义内容</div>
      <jl-ai.button @click="update">点击更新内容</jl-ai.button>
    </template>
    <jl-button>内容更新，位置同步更新</jl-button>
  </jl-popover>
</template>
<script>
export default {
  data() {
    return {
      contentNum: 2,
    };
  },
  methods: {
    update() {
      this.contentNum = Math.floor(Math.random() * 10) + 1;
    },
  },
};
</script>
<style>
.popover-content-list-item {
  margin-bottom: 4px;
  padding: 4px 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
}
</style>
```

:::

### Attributes

| 参数            | 说明                            | 类型    | 可选值                                                                                                    | 默认值           |
| --------------- | ------------------------------- | ------- | --------------------------------------------------------------------------------------------------------- | ---------------- |
| value / v-model | 控制 tooltip 显示与隐藏（受控） | boolean | true / false                                                                                              | false            |
| content         | 显示的内容                      | string  | —                                                                                                         | 默认插槽中的内容 |
| disabled        | 禁用                            | boolean | true / false                                                                                              | false            |
| placement       | 位置                            | string  | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end | top              |

### Slot

| name    | 说明                    |
| ------- | ----------------------- |
| content | 自定义`popover`提示内容 |
