# Tooltip 文字提示

用于展示鼠标 hover 时的提示信息。

## 基本用法

`content`默认使用`default插槽`中的文本

::: demo

```vue
<jl-tooltip>
    <jl-button>默认文本</jl-button>
</jl-tooltip>
<jl-tooltip :enterable="false">
    <jl-button>禁止鼠标进入到 tooltip 中</jl-button>
</jl-tooltip>
```

:::

## 显示箭头`visible-arrow` 和 修改显示位置`placement`

::: demo

```vue
<template>
  <div class="box">
    <div class="top">
      <jl-tooltip placement="top-start" visible-arrow :content="content">
        <jl-button>左上</jl-button>
      </jl-tooltip>
      <jl-tooltip placement="top" visible-arrow :content="content">
        <jl-button>左边</jl-button>
      </jl-tooltip>
      <jl-tooltip placement="top-end" visible-arrow :content="content">
        <jl-button>左下</jl-button>
      </jl-tooltip>
    </div>
    <div class="left">
      <jl-tooltip placement="left-start" visible-arrow :content="content">
        <jl-button>左上</jl-button>
      </jl-tooltip>
      <jl-tooltip placement="left" visible-arrow :content="content">
        <jl-button>左边</jl-button>
      </jl-tooltip>
      <jl-tooltip placement="left-end" visible-arrow :content="content">
        <jl-button>左下</jl-button>
      </jl-tooltip>
    </div>
    <div class="right">
      <jl-tooltip placement="right-start" visible-arrow :content="content">
        <jl-button>右上</jl-button>
      </jl-tooltip>
      <jl-tooltip placement="right" visible-arrow :content="content">
        <jl-button>右边</jl-button>
      </jl-tooltip>
      <jl-tooltip placement="right-end" visible-arrow :content="content">
        <jl-button>右下</jl-button>
      </jl-tooltip>
    </div>
    <div class="bottom">
      <jl-tooltip placement="bottom-start" visible-arrow :content="content">
        <jl-button>下边</jl-button>
      </jl-tooltip>
      <jl-tooltip placement="bottom" visible-arrow :content="content">
        <jl-button>下左</jl-button>
      </jl-tooltip>
      <jl-tooltip placement="bottom-end" visible-arrow :content="content">
        <jl-button>下右</jl-button>
      </jl-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: '测试测试测试测试测试测试',
    };
  },
};
</script>
```

:::
:::

## 自定义`content`

::: demo

```vue
<jl-tooltip content="这里是自定义内容">
    <jl-button>自定义内容</jl-button>
</jl-tooltip>
```

:::

## 文字自动省略 `rows`

::: tip rows

1.  `rows`控制省略行数

2.  文字不超出，不提示

:::

- 一行文字 `:rows="1"`

  ::: demo

  ```vue
  <template>
    <!-- 文字不超出，不提示 -->
    <jl-tooltip :rows="1">
      {{ text1 }}
    </jl-tooltip>
    <hr />
    <jl-tooltip :rows="1">
      {{ text2 }}
    </jl-tooltip>
  </template>
  <script>
  export default {
    data() {
      return {
        text1: '测试一行文字----',
        text2: '测试一行文字----'.repeat(20),
      };
    },
  };
  </script>
  ```

  :::

- 多行文字 `:rows="{n}"`

  ::: demo

  ```vue
  <template>
    <jl-card header="rows='2'">
      <jl-tooltip :rows="2">
        {{ text1 }}
      </jl-tooltip>
    </jl-card>
    <hr />
    <jl-card header="rows='2'">
      <jl-tooltip :rows="2">
        {{ text2 }}
      </jl-tooltip>
    </jl-card>
    <hr />
    <jl-card header="rows='3'">
      <jl-tooltip :rows="3">
        {{ text2 }}
      </jl-tooltip>
    </jl-card>
  </template>
  <script>
  export default {
    data() {
      return {
        text1: '测试多行文字----(文字未超出)',
        text2: '测试多行文字----'.repeat(30),
      };
    },
  };
  </script>
  ```

  :::

## `content`插槽

::: demo

```vue
<jl-tooltip>
    <!-- content 插槽 -->
    <template #content>
        <div>
          #content插槽
          <br>
          换行
        </div>
    </template>
    <jl-button>content 插槽</jl-button>
</jl-tooltip>
```

:::

## 其他事件控制

::: demo

```vue
<template>
  <jl-button primary @click="tooltipVisible = !tooltipVisible">点击这里</jl-button>
  <jl-tooltip v-model="tooltipVisible" visible-arrow>
    <jl-button>Tooltip</jl-button>
  </jl-tooltip>
</template>
<script>
export default {
  data() {
    return {
      tooltipVisible: false,
    };
  },
};
</script>
```

:::

## `hide-on-click` 点击隐藏提示（特殊场景）

::: demo

```vue
<template>
  <jl-tooltip content="点击按钮隐藏" hide-on-click>
    <jl-button>点击隐藏</jl-button>
  </jl-tooltip>
</template>
```

:::

### Attributes

| 参数            | 说明                            | 类型    | 可选值                                                                                                    | 默认值           |
| --------------- | ------------------------------- | ------- | --------------------------------------------------------------------------------------------------------- | ---------------- |
| value / v-model | 控制 tooltip 显示与隐藏（受控） | boolean | true / false                                                                                              | false            |
| rows            | 控制省略行数                    | number  | —                                                                                                         | 0                |
| content         | 显示的内容                      | string  | —                                                                                                         | 默认插槽中的内容 |
| block           | 是否块级元素（占一整行）        | boolean | true / false                                                                                              | false            |
| enterable       | 鼠标是否可进入到 tooltip 中     | boolean | true / false                                                                                              | false            |
| disabled        | 禁用                            | boolean | true / false                                                                                              | false            |
| placement       | 位置                            | string  | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end | top              |
| hide-on-click   | 点击时是否隐藏 tooltip          | boolean | true / false                                                                                              | false            |
| visible-arrow   | 是否显示箭头                    | boolean | true / false                                                                                              | false            |

### Slot

| name    | 说明                    |
| ------- | ----------------------- |
| content | 自定义`tooltip`提示内容 |
