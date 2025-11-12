# Card 卡片

卡片用于将内容和操作分组在一个容器中，常用于页面的信息展示、分区、嵌套等场景。支持自定义标题、内容、操作区等。

## 基本用法

::: demo

```vue
<jl-card>
  这是卡片
</jl-card>
```

:::

## 卡片阴影

::: demo

```vue
<jl-card shadow>
  常显
</jl-card>
<jl-card shadow="hover">
  鼠标悬浮时显示
</jl-card>
<jl-card hover>
  鼠标悬浮时有位移
</jl-card>
```

:::

## 无边框

::: demo

```vue
<div style="background: linear-gradient(45deg,rgba(30, 143, 255, 0.13),rgba(255, 102, 224, 0.12));padding: 40px">
  <jl-card :border="false">
    无边框卡片
  </jl-card>
  <br />
  <jl-card :border="false" shadow transparent>
    无边框、transparent 透明卡片, hover 阴影
  </jl-card>
</div>
```

:::

## 插槽 `header`

::: demo

```vue
<jl-card padding="20px 40px" header="卡片头部" show-label-mark>
  这是卡片
</jl-card>
<br />
<jl-card padding="20px 40px">
  <template #header>
    <div class="flex items-center">
      卡片头部
      <jl-button primary style="margin-left: auto">新增</jl-button>
    </div>
  </template>
  这是卡片
</jl-card>
```

:::

### Attributes

| 参数            | 说明                                                                                           | 类型             | 可选值                 | 默认值  |
| --------------- | ---------------------------------------------------------------------------------------------- | ---------------- | ---------------------- | ------- |
| header          | 自定义`card`头部标题                                                                           | string           | -                      | -       |
| showLabelMark   | 显示 mark 标识                                                                                 | boolean          | true / false           | false   |
| padding         | 卡片主体`padding`大小                                                                          | string           | -                      | "0.7em" |
| transparent     | 卡片底色透明                                                                                   | boolean          | true / false           | false   |
| overflowVisible | 是否超出卡片显示，会丢失盒模型，需要内部 dom 实现盒模型（特殊场景使用，如：AI 预设提示词卡片） | boolean          | true / false           | false   |
| shadow          | 控制阴影                                                                                       | string / boolean | "hover" / true / false | false   |
| hover           | 悬浮效果                                                                                       | boolean          | true / false           | false   |
| visible         | 超出卡片 body 是否可见                                                                         | boolean          | true / false           | false   |

### Slot

| name   | 说明                 |
| ------ | -------------------- |
| header | 自定义`card`头部内容 |
