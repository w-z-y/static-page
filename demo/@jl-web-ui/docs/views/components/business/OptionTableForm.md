# OptionTableForm 选项表格表单

## 新增到尾部

<ClientOnly>
::: demo

```vue
<template>
  <jl-business.option-table-form v-model="value" :columns="columns" max-height="200"></jl-business.option-table-form>
</template>
<script>
export default {
  data() {
    return {
      value: [],
      columns: [
        { label: '选项名', value: 'fullName', type: 'input' },
        { label: '选项值', value: 'id', type: 'input' },
        { label: '必填', value: 'required', type: 'checkbox', width: 50 },
        {
          label: '下拉',
          value: 'opt',
          type: 'select',
          attrs: {
            options: [
              { label: '选项一', value: 'opt1' },
              { label: '选项二', value: 'opt2' },
            ],
          },
        },
      ],
    };
  },
};
</script>
```

:::
</ClientOnly>

## 当前行下新增

<ClientOnly>
::: demo

```vue
<template>
  <jl-business.option-table-form
    v-model="value"
    auto-add-one-row
    add-button-position="row"
    :columns="columns"
    max-height="200"></jl-business.option-table-form>
</template>
<script>
export default {
  data() {
    return {
      value: [],
      columns: [
        { label: '选项名', value: 'fullName', type: 'input', required: true },
        { label: '选项值', value: 'id', type: 'input' },
        {
          label: '下拉',
          value: 'opt',
          type: 'select',
          attrs: {
            options: [
              { label: '选项一', value: 'opt1' },
              { label: '选项二', value: 'opt2' },
            ],
          },
        },
      ],
    };
  },
};
</script>
```

:::
</ClientOnly>

## 数据回显 + 隐藏操作按钮

<ClientOnly>
::: demo

```vue
<template>
  <jl-business.option-table-form v-model="value" :show-operate-button="false" :columns="columns" max-height="200"></jl-business.option-table-form>
</template>
<script>
export default {
  data() {
    return {
      value: [
        { fullName: '配置一', id: 'id1' },
        { fullName: '配置二', id: 'id2' },
      ],
      columns: [
        { label: '选项名', value: 'fullName', type: 'input' },
        { label: '选项值', value: 'id', type: 'input' },
        {
          label: '下拉',
          value: 'opt',
          type: 'select',
          attrs: {
            options: [
              { label: '选项一', value: 'opt1' },
              { label: '选项二', value: 'opt2' },
            ],
          },
        },
      ],
    };
  },
};
</script>
```

:::
</ClientOnly>

## 表单校验

<ClientOnly>
::: demo

```vue
<template>
  <jl-button primary @click="handleClick">表单校验</jl-button>
  <jl-business.option-table-form verifiy ref="optionTableFormRef" v-model="value" :columns="columns" max-height="400"></jl-business.option-table-form>
</template>
<script>
export default {
  data() {
    return {
      value: [
        { fullName: '配置一', id: 'id1' },
        { fullName: '配置二', id: 'id2' },
        { fullName: '', id: 'id2' },
      ],
      columns: [
        { label: '选项名', value: 'fullName', type: 'input', required: true },
        { label: '选项值', value: 'id', type: 'input' },
        {
          label: '下拉',
          value: 'opt',
          type: 'select',
          attrs: {
            options: [
              { label: '选项一', value: 'opt1' },
              { label: '选项二', value: 'opt2' },
            ],
          },
        },
      ],
    };
  },
  methods: {
    handleClick() {
      this.$refs.optionTableFormRef.validate((valid) => {
        if (valid) {
          this.$message.success('校验成功');
        } else {
          this.$message.error('校验失败');
        }
      });
    },
  },
};
</script>
```

:::
</ClientOnly>

## 拖拽排序

:::tip
要绑定一个 `row-key`
:::

<ClientOnly>
::: demo

```vue
<template>
  <jl-business.option-table-form draggable row-key="id" v-model="value" :columns="columns" max-height="400"></jl-business.option-table-form>
</template>
<script>
export default {
  data() {
    return {
      value: [
        { fullName: '配置一', id: 'id1' },
        { fullName: '配置二', id: 'id2' },
        { fullName: '', id: 'id3' },
      ],
      columns: [
        { label: '选项名', value: 'fullName', type: 'input', required: true },
        { label: '选项值', value: 'id', type: 'input' },
      ],
    };
  },
};
</script>
```

:::
</ClientOnly>

## 高级用法

<ClientOnly>
::: demo

```vue
<template>
  <jl-business.option-table-form
    :before-add="handleBeforeAdd"
    show-edit-button
    show-delete-confirm
    v-model="value"
    :columns="columns"
    max-height="200"
    @remove="handleRemove"
    @edit="handleEdit"></jl-business.option-table-form>

  <jl-dialog :visible.sync="dialogVisible" width="400px" title="示例" @ok="handleConfirm" @closed="handleClosed">
    <jl-form ref="formRef" v-model="formData" :options="formOptions" label-width="80px"></jl-form>
  </jl-dialog>
</template>
<script>
export default {
  computed: {
    columns() {
      return this.formOptions.map((i) => {
        return { ...i, disabled: true };
      });
    },
  },
  data() {
    return {
      value: [],
      formOptions: [
        { label: '选项名', value: 'fullName', type: 'input' },
        { label: '选项值', value: 'id', type: 'input' },
        {
          label: '下拉',
          value: 'opt',
          type: 'select',
          attrs: {
            options: [
              { label: '选项一', value: 'opt1' },
              { label: '选项二', value: 'opt2' },
            ],
          },
        },
      ],
      dialogVisible: false,
      formData: {
        fullName: '',
        id: '',
      },
      rowClone: null,
      operateType: null,
      beforeAddResolve: null,
    };
  },
  methods: {
    handleRemove(row) {
      console.log(row);
    },
    async handleEdit(row) {
      this.operateType = 'edit';
      this.dialogVisible = true;
      await this.$nextTick();
      this.rowClone = row;
      this.formData = { ...row };
    },
    handleBeforeAdd(resolve) {
      this.operateType = 'add';
      this.dialogVisible = true;
      this.beforeAddResolve = resolve;
    },
    handleConfirm() {
      switch (this.operateType) {
        case 'add':
          this.beforeAddResolve?.({ ...this.formData });
          break;
        case 'edit':
          this.rowClone = Object.assign(this.rowClone, { ...this.formData });
          break;
      }
      this.dialogVisible = false;
      this.beforeAddResolve = null;
    },
    handleClosed() {
      this.$refs.formRef.resetFields();
    },
  },
};
</script>
```

:::
</ClientOnly>

### Attributes

| 参数                | 说明                                     | 类型          | 可选值 | 默认值   |
| ------------------- | ---------------------------------------- | ------------- | ------ | -------- |
| value/v-model       | 绑定值                                   | array         | —      | []       |
| options             | 选项配置                                 | array         | —      | []       |
| draggable           | 是否开启拖拽                             | boolean       | —      | false    |
| max-height          | 最大高度                                 | string/number | —      | 200px    |
| add-button-text     | 添加按钮文案                             | string        | —      | 添加选项 |
| show-operate-button | 显示操作按钮                             | boolean       | —      | true     |
| show-delete-confirm | 显示操作提示(主要用于删除确认提示)       | boolean       | —      | false    |
| show-edit-button    | 显示编辑按钮                             | boolean       | —      | false    |
| auto-add-one-row    | 自动添加一项                             | boolean       | —      | false    |
| verifiy             | 开启校验功能(调用 validate 方法进行校验) | boolean       | —      | false    |

### Events

| 方法名 | 说明                                         | 参数            |
| ------ | -------------------------------------------- | --------------- |
| edit   | 点击编辑按钮(当配置 show-edit-button 时生效) | row(当前行数据) |
| remove | 点击删除回调                                 | row(当前行数据) |

### 方法

| 方法名 | 说明           | 参数  |
| ------ | -------------- | ----- |
| add    | 添加一行选项   | —     |
| remove | 删除第几个选项 | index |
