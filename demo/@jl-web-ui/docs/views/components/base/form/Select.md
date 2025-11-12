# Select 下拉框

### 基本用法

::: demo

```vue
<template>
  <jl-form.select v-model="value" :options="selectOptions" placeholder="请选择"></jl-form.select>
</template>
<script>
export default {
  data() {
    return {
      value: '',
      selectOptions: [
        { label: '选项一选项一选项一选项一选项一选项一', value: 'option1' },
        { label: '选项二', value: 'option2' },
        { label: '选项三', value: 'option3' },
      ],
    };
  },
};
</script>
```

:::

### 多选 `multiple`，折叠显示 `collapse-tags`

::: demo

```vue
<template>
  <jl-form.select v-model="value" multiple :options="selectOptions" placeholder="请选择"></jl-form.select>
  <jl-form.select v-model="value" collapse-tags multiple :options="selectOptions" placeholder="请选择"></jl-form.select>
</template>
<script>
export default {
  data() {
    return {
      value: [],
      selectOptions: [
        { label: '选项一', value: 'option1' },
        { label: '选项二', value: 'option2' },
        { label: '选项三', value: 'option3' },
      ],
    };
  },
};
</script>
```

:::

### 使用 `props`

::: demo

```vue
<template>
  <jl-form.select v-model="value" :options="selectOptions" :props="defaultProps" placeholder="请选择"></jl-form.select>
</template>
<script>
export default {
  data() {
    return {
      value: '',
      defaultProps: {
        label: 'fullName',
        value: 'id',
      },
      selectOptions: [
        { fullName: '选项一', id: 'option1' },
        { fullName: '选项二', id: 'option2' },
        { fullName: '选项三', id: 'option3' },
      ],
    };
  },
};
</script>
```

:::

### 树形下拉

::: tip expandOnClickNode
`expandOnClickNode` 控制非叶子节点是否点击展开/收起 & 不可被选择
:::

::: demo

```vue
<template>
  <jl-card header="基本用法">
    <jl-form.select type="tree" v-model="value" :options="selectOptions" placeholder="请选择"></jl-form.select>
  </jl-card>
  <jl-card header="selectable 精确控制节点是否可选择">
    <jl-form.select type="tree" v-model="value3" :selectable="isSelectable" :options="selectOptions2" placeholder="请选择"></jl-form.select>
  </jl-card>
  <jl-card header="多选">
    <jl-form.select multiple type="tree" v-model="value4" :options="selectOptions" placeholder="请选择" style="width: 400px"></jl-form.select>
  </jl-card>
</template>
<script>
export default {
  data() {
    return {
      value: 'option1-1',
      value2: 'option1-1',
      value3: 'option1-1',
      value4: ['option1-1', 'option4-1'],
      selectOptions: [
        {
          label: '选项一',
          value: 'option1',
          children: [{ label: '子选项一', value: 'option1-1' }],
        },
        { label: '选项二', value: 'option2', disabled: true },
        { label: '选项三', value: 'option3' },
        {
          label: '选项四',
          value: 'option4',
          disabled: true,
          children: [{ label: '子选项一', value: 'option4-1' }],
        },
      ],
      selectOptions2: [
        {
          label: '选项一(不可选)',
          value: 'option1',
          children: [{ label: '子选项一', value: 'option1-1' }],
        },
        { label: '选项二', value: 'option2', disabled: true },
        { label: '选项三', value: 'option3' },
        {
          label: '选项四',
          value: 'option4',
          children: [{ label: '子选项一', value: 'option4-1' }],
        },
        {
          label: '选项五',
          value: 'option5',
          children: [{ label: '子选项一(不可选)', value: 'option5-1' }],
        },
      ],
    };
  },
  methods: {
    isSelectable(data) {
      if (['option1', 'option5-1'].includes(data.value)) return false;
      return true;
    },
  },
};
</script>
```

:::
