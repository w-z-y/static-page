# OptionForm 选项表单

<ClientOnly>
::: demo

```vue
<template>
  <jl-business.option-form v-model="value" :options="options" max-height="200px"></jl-business.option-form>
</template>
<script>
export default {
  computed: {
    options() {
      return [
        { label: '输入框', value: 'input', type: 'input' },
        {
          label: '单选',
          value: 'required',
          type: 'checkbox',
          width: 32,
        },
        {
          label: '下拉',
          value: 'select',
          type: 'select',
          span: 6,
          attrs: {
            options: this.dataOptions,
          },
        },
        {
          label: '多选',
          value: 'checkbox',
          type: 'checkbox',
          width: 200,
          attrs: {
            options: this.dataOptions,
          },
        },
      ];
    },
  },
  data() {
    return {
      value: [],
      dataOptions: [
        { label: '选项一', value: 'opt1' },
        { label: '选项二', value: 'opt2' },
      ],
    };
  },
};
</script>
```

:::
</ClientOnly>

#### 可拖拽排序 `draggable` + 自动添加一行

<ClientOnly>
::: demo

```vue
<template>
  <jl-business.option-form
    draggable
    auto-add-one-row
    v-model="value"
    :options="options"
    max-height="200px"
    add-button-text="添加一行数据"
    @remove="handleRemove"
    show-delete-confirm></jl-business.option-form>
</template>
<script>
export default {
  computed: {
    options() {
      return [
        { label: '输入框', value: 'input', type: 'input', flex: 1 },
        {
          label: '是否必填',
          value: 'required',
          type: 'checkbox',
          width: '32px',
        },
        {
          label: '下拉',
          value: 'select',
          type: 'select',
          span: 6,
          attrs: {
            options: this.dataOptions,
          },
        },
      ];
    },
  },
  data() {
    return {
      value: [],
      dataOptions: [
        { label: '选项一', value: 'opt1' },
        { label: '选项二', value: 'opt2' },
      ],
    };
  },
  methods: {
    handleRemove(row) {
      console.log(row);
    },
  },
};
</script>
```

:::
</ClientOnly>

### Attributes

| 参数                | 说明                               | 类型          | 可选值 | 默认值   |
| ------------------- | ---------------------------------- | ------------- | ------ | -------- |
| value/v-model       | 绑定值                             | array         | —      | []       |
| options             | 选项配置                           | array         | —      | []       |
| draggable           | 是否开启拖拽                       | boolean       | —      | false    |
| max-height          | 最大高度                           | string/number | —      | 200px    |
| add-button-text     | 添加按钮文案                       | string        | —      | 添加选项 |
| show-operate-button | 显示操作按钮                       | boolean       | —      | true     |
| show-delete-confirm | 显示操作提示(主要用于删除确认提示) | boolean       | —      | false    |
| auto-add-one-row    | 自动添加一项                       | boolean       | —      | false    |

### Events

| 事件名 | 说明         | 参数            |
| ------ | ------------ | --------------- |
| remove | 点击删除回调 | row(当前行数据) |

### 方法

| 方法名 | 说明           | 参数       |
| ------ | -------------- | ---------- |
| add    | 添加一行选项   | —          |
| remove | 删除第几个选项 | index 下标 |
