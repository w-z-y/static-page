# CardList 卡片列表

- 区别于`jl-layout`，可以从容器的角度配置布局，而不需要给每项配置。

## 基本用法

::: tip 默认响应式
缩小容器尺寸查看效果
:::

<ClientOnly>
::: demo

```vue
<template>
  <jl-business.card-list :items="dataList">
    <template #default="{ item }">
      <div :style="{ height: `${item.h}px` }" class="flex items-center justify-center">{{ item.idx }}</div>
    </template>
  </jl-business.card-list>
</template>

<script>
export default {
  data() {
    return {
      dataList: [],
    };
  },
  mounted() {
    // 生成随机数据
    this.dataList = Array.from({ length: 5 }, (i, idx) => ({ idx: idx + 1, h: Math.floor(Math.random() * 100) + 10 }));
  },
};
</script>
```

:::
</ClientOnly>

## 固定列数

::: warning 提示
`columns`设置为固定数字时，丢失响应式
:::

<ClientOnly>
::: demo

```vue
<template>
  <jl-card header="固定一列">
    <jl-business.card-list :items="dataList" :columns="1">
      <template #default="{ item }">
        <div :style="{ height: `${item.h}px` }" class="flex items-center justify-center">{{ item.idx }}</div>
      </template>
    </jl-business.card-list>
  </jl-card>
  <jl-card header="固定两列">
    <jl-business.card-list :items="dataList" :columns="2">
      <template #default="{ item }">
        <div :style="{ height: `${item.h}px` }" class="flex items-center justify-center">{{ item.idx }}</div>
      </template>
    </jl-business.card-list>
  </jl-card>
  <jl-card header="固定十列">
    <jl-business.card-list :items="dataList" :columns="10">
      <template #default="{ item }">
        <div :style="{ height: `${item.h}px` }" class="flex items-center justify-center">{{ item.idx }}</div>
      </template>
    </jl-business.card-list>
  </jl-card>
</template>

<script>
export default {
  data() {
    return {
      dataList: [],
    };
  },
  mounted() {
    // 生成随机数据
    this.dataList = Array.from({ length: 10 }, (i, idx) => ({ idx: idx + 1, h: Math.floor(Math.random() * 100) + 10 }));
  },
};
</script>
```

:::
</ClientOnly>

## 自定义响应式

::: warning 提示
`columns`设置数组对象时

```js
type columns = { minWidth: number, columns: number }[];
```

:::
<ClientOnly>
::: demo

```vue
<template>
  <jl-business.card-list :items="dataList" :columns="columns">
    <template #default="{ item }">
      <div :style="{ height: `${item.h}px` }" class="flex items-center justify-center">{{ item.idx }}</div>
    </template>
  </jl-business.card-list>
</template>

<script>
export default {
  data() {
    return {
      dataList: [],
      // 可以乱序
      columns: [
        { minWidth: 600, columns: 6 },
        { minWidth: 400, columns: 4 },
        { minWidth: 500, columns: 5 },
        { minWidth: 0, columns: 2 },
        { minWidth: 700, columns: 7 },
        { minWidth: 300, columns: 3 },
      ],
    };
  },
  mounted() {
    // 生成随机数据
    this.dataList = Array.from({ length: 10 }, (i, idx) => ({ idx: idx + 1, h: Math.floor(Math.random() * 100) + 10 }));
  },
};
</script>
```

:::
</ClientOnly>

### Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| -------- | -------------------------------------------------------------------------------------- | ------------------------- | ----------------------- | -------- |
| items | 需要展示的卡片对象数组，每个对象用于渲染一个卡片 | array | — | [] |
| columns | 列数或响应式断点配置<br>可以是数字（固定列数）、数组（断点数组） | number / array | — | _见下方_ |
| gap | 卡片及列之间的间隔，可以是 number / string（如"16px"），或数组（[rowGap, colGap]） | number / string / array | — | 8 |

#### columns 默认配置：

```js
[
  { minWidth: 0, internalColumns: 2 },
  { minWidth: 840, internalColumns: 3 },
  { minWidth: 1100, internalColumns: 4 },
];
```
