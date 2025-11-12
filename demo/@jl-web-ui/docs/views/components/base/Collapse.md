# Collapse 折叠面板

折叠面板用于将内容分组到可折叠的面板中，支持手风琴模式、自定义标题、操作按钮等功能。常用于 FAQ、设置面板、信息展示等场景。

## 基本用法

::: demo

```vue
<template>
  <jl-collapse :options="collapseOptions" v-model="activeNames"> </jl-collapse>
</template>

<script>
export default {
  data() {
    return {
      activeNames: ['panel1'],
      collapseOptions: [
        { label: '面板1', value: 'panel1' },
        { label: '面板2', value: 'panel2' },
        { label: '面板3', value: 'panel3' },
      ],
    };
  },
};
</script>
```

:::

## 显示标签 `show-label-mark`

::: demo

```vue
<template>
  <jl-collapse :options="collapseOptions" v-model="activeNames" show-label-mark> </jl-collapse>
</template>

<script>
export default {
  data() {
    return {
      activeNames: ['panel1'],
      collapseOptions: [
        { label: '面板1', value: 'panel1' },
        { label: '面板2', value: 'panel2' },
        { label: '面板3', value: 'panel3' },
      ],
    };
  },
};
</script>
```

:::

## 插槽

::: tip Slot
`title` 自定义面板标题的插槽

`title-operation` 标题右侧操作区域的插槽(默认`阻止冒泡`了, 便于点击不触发展开收起)

`default` 内容
:::

::: demo

```vue
<template>
  <jl-collapse :options="collapseOptions" v-model="activeNames">
    <!-- title -->
    <template #title="{ option, index }">
      <jl-icon :icon="option.icon" style="margin-right: 8px;"></jl-icon>
      <span>{{ option.label }}</span>
      <el-badge v-if="option.count" :value="option.count" style="margin-left: 8px;"></el-badge>
    </template>
    <!-- title-operation -->
    <template #title-operation="{ option, index }">
      <jl-button text icon="el-icon-edit">编辑</jl-button>
      <jl-button text danger icon="el-icon-delete">删除</jl-button>
    </template>
    <!-- default -->
    <template #default="{ option, index }"> 面板{{ index + 1 }}配置: {{ option }} </template>
  </jl-collapse>
</template>

<script>
export default {
  data() {
    return {
      activeNames: ['panel2'],
      collapseOptions: [
        { label: '面板1', value: 'panel1' },
        { label: '面板2', value: 'panel2' },
        { label: '面板3', value: 'panel3' },
      ],
    };
  },
};
</script>
```

:::

## 默认展开全部

通过`defaultExpandAll`属性可以设置默认展开所有面板。

::: demo

```vue
<template>
  <jl-collapse :options="collapseOptions" v-model="activeNames" default-expand-all>
    <template #default="{ option, index }"> 面板{{ index + 1 }}内容 </template>
  </jl-collapse>
</template>

<script>
export default {
  data() {
    return {
      activeNames: [],
      collapseOptions: [
        { label: '面板1', value: 'panel1' },
        { label: '面板2', value: 'panel2' },
        { label: '面板3', value: 'panel3' },
      ],
    };
  },
};
</script>
```

:::

## 箭头位置

通过`reverse`属性可以控制箭头的位置，默认在右侧，设置为`true`时在左侧。

::: demo

```vue
<template>
  <jl-card style="margin-bottom: 20px;" header="默认箭头位置（右侧）">
    <jl-collapse :options="collapseOptions" v-model="activeNames1"> </jl-collapse>
  </jl-card>
  <jl-card header="箭头位置在左侧">
    <jl-collapse :options="collapseOptions" v-model="activeNames2" :reverse="true"> </jl-collapse>
  </jl-card>
</template>

<script>
export default {
  data() {
    return {
      activeNames1: [],
      activeNames2: [],
      collapseOptions: [
        { label: '面板1', value: 'panel1' },
        { label: '面板2', value: 'panel2' },
        { label: '面板3', value: 'panel3' },
      ],
    };
  },
};
</script>
```

:::

### Attributes

| 参数             | 说明             | 类型                                      | 可选值       | 默认值 |
| ---------------- | ---------------- | ----------------------------------------- | ------------ | ------ |
| value            | 当前激活的面板   | string/array                              | —            | —      |
| options          | 折叠面板选项配置 | <DocOption type="collapse"></DocOption>[] | —            | []     |
| reverse          | 箭头是否放在前面 | boolean                                   | true / false | false  |
| defaultExpandAll | 是否默认展开全部 | boolean                                   | true / false | false  |
| accordion        | 是否手风琴模式   | boolean                                   | true / false | false  |

### Events

| 事件名 | 说明                   | 回调参数                        |
| ------ | ---------------------- | ------------------------------- |
| change | 当前激活面板改变时触发 | activeNames: 当前激活的面板名称 |

### Slot

| 插槽名          | 说明             | 参数              |
| --------------- | ---------------- | ----------------- |
| title           | 自定义标题内容   | { option, index } |
| title-operation | 标题后的操作按钮 | { option, index } |
| default         | 面板内容         | { option, index } |
