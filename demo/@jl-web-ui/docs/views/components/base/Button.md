# Button 按钮

- 可以直接在组件上使用`primary`,`success`,`warning`,`danger`,`info` | `text`,`plain`

## 基本用法

::: demo

```vue
<jl-button>默认按钮</jl-button>
<jl-button round>默认按钮</jl-button>
<jl-button circle icon="el-icon-search"></jl-button>
```

:::

## 文字按钮 `text`

::: demo

```vue
<jl-button text>文字按钮</jl-button>
<jl-button text success>成功按钮</jl-button>
<jl-button text warning>警告按钮</jl-button>
<jl-button text danger>危险按钮</jl-button>
<jl-button text info>信息按钮</jl-button>
```

:::

## 不同类型

::: demo

```vue
<jl-button primary>主要按钮</jl-button>
<jl-button success>成功按钮</jl-button>
<jl-button warning>警告按钮</jl-button>
<jl-button danger>危险按钮</jl-button>
<jl-button info>信息按钮</jl-button>

<hr />

<jl-button primary plain>主要按钮</jl-button>
<jl-button success plain>成功按钮</jl-button>
<jl-button warning plain>警告按钮</jl-button>
<jl-button danger plain>危险按钮</jl-button>
<jl-button info plain>信息按钮</jl-button>
```

:::

## 图标 `icon`

::: demo

```vue
<jl-button icon="el-icon-plus" primary>新增</jl-button>
<jl-button icon="el-icon-delete" icon-color="red" plain danger>删除</jl-button>
```

:::

## 禁用状态 `disabled`

::: demo

```vue
<jl-button disabled text>文字按钮</jl-button>
<jl-button disabled primary>主要按钮</jl-button>
<jl-button disabled success>成功按钮</jl-button>
<jl-button disabled warning>警告按钮</jl-button>
<jl-button disabled danger>危险按钮</jl-button>
<jl-button disabled info>信息按钮</jl-button>
```

:::

## loading

::: demo

```vue
<jl-button loading text>加载中</jl-button>
<jl-button loading>加载中</jl-button>
```

:::

### Attributes

| 参数      | 说明                        | 类型    | 可选值       | 默认值 |
| --------- | --------------------------- | ------- | ------------ | ------ |
| primary   | 按钮类型                    | boolean | true / false | —      |
| success   | 按钮类型                    | boolean | true / false | —      |
| warning   | 按钮类型                    | boolean | true / false | —      |
| danger    | 按钮类型                    | boolean | true / false | —      |
| info      | 按钮类型                    | boolean | true / false | —      |
| text      | 是否为文本按钮              | boolean | true / false | false  |
| icon      | 图标名称                    | string  | —            | —      |
| iconColor | 图标颜色                    | string  | —            | —      |
| type      | 继承`el-button`的`type`属性 | string  | —            | —      |
