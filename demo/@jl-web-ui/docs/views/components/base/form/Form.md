# Form 表单

表单用于收集用户输入的数据，支持多种表单控件类型、验证规则、布局配置等功能。可以快速构建复杂的表单页面。

## 基本用法

<ClientOnly>
::: demo

```vue
<template>
  <jl-card>
    <jl-form label-width="120px" v-model="formData" :options="options"> </jl-form>
  </jl-card>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        name: '',
        age: 18,
      },
      options: [
        { label: '姓名', value: 'name', type: 'input', span: 12 },
        { label: '年龄', value: 'age', type: 'input-number', span: 12 },
      ],
    };
  },
};
</script>
```

:::
</ClientOnly>

## 全部功能

::: tip footer 按钮控制
:show-search="false" 隐藏查询按钮

:show-reset="false" 隐藏重置按钮

:show-expand="false" 展开/收起按钮
:::

<ClientOnly>

::: demo

```vue
<template>
  <jl-card header="参数配置" style="margin-bottom: 10px">
    <jl-form v-model="setting" :options="settingOptons" label-width="100px" />
  </jl-card>
  <jl-card header="示例">
    <jl-form
      label-width="120px"
      v-model="formData"
      footer
      :gap="setting.gap"
      :fold-length="setting.foldLength"
      :options="formOptions"
      :show-search="setting.showSearch"
      :show-reset="setting.showReset"
      :search-text="setting.searchText"
      :reset-text="setting.resetText"
      @search="handleSearch"
      @reset="handleReset">
      <template #form-item="{ option }">
        <!-- 自定义slot实现 (option.value 为 formOptions 中的配置项的 value) -->
        <template v-if="option.value === 'height'"> {{ formData[option.value] }}cm </template>
      </template>

      <template #footer-prefix>
        <jl-button>prefix</jl-button>
      </template>
      <template #footer-suffix>
        <jl-button>suffix</jl-button>
      </template>
    </jl-form>
  </jl-card>
</template>

<script>
export default {
  computed: {
    formOptions() {
      return [
        { label: '姓名', value: 'name', type: 'input', required: true, span: 12 },
        {
          label: '年龄',
          value: 'age',
          type: 'input-number',
          span: 12,
          tip: '这是一个提示',
          attrs: {
            style: { width: '200px' },
          },
        },
        { label: '身高(自定义slot)', value: 'height' },
        { label: '个人简介', value: 'profile', type: 'textarea' },
        { label: '详情', value: 'desc', type: 'textarea-popover' },
        {
          label: '生日',
          value: 'birthday',
          type: 'date',
          attrs: {
            valueFormat: 'yyyy/MM/dd',
            format: 'yyyy/MM/dd',
          },
        },
        {
          label: '状态',
          value: 'status',
          type: 'select',
          span: 12,
          attrs: {
            options: [
              { label: '启用', value: 'enabled' },
              { label: '禁用', value: 'disabled' },
              { label: '待审核', value: 'pending' },
            ],
          },
        },
        {
          label: '部门',
          value: 'department',
          type: 'select-tree',
          span: 12,
          attrs: {
            options: this.selectionTree,
          },
        },
        {
          label: '颜色',
          value: 'color',
          type: 'color-picker',
          span: 12,
        },
        {
          label: '进度',
          value: 'progress',
          type: 'slider',
          attrs: {
            min: 0,
            max: 100,
            step: 1,
            style: { width: '200px' },
          },
        },
        {
          label: '性别',
          value: 'gender',
          type: 'radio',
          span: 12,
          attrs: {
            options: [
              { label: '男', value: '1' },
              { label: '女', value: '0' },
            ],
          },
        },
        {
          label: '兴趣爱好',
          value: 'hobbies',
          type: 'checkbox',
          attrs: {
            options: [
              { label: '阅读', value: 'reading' },
              { label: '运动', value: 'sports' },
              { label: '音乐', value: 'music' },
            ],
          },
        },
        {
          label: '是否启用',
          value: 'enabled',
          type: 'switch',
          attrs: {
            activeText: '启用',
            inactiveText: '禁用',
          },
        },
        {
          label: '文件上传',
          value: 'fileList',
          type: 'upload',
          attrs: {
            drag: true,
            tip: '只能上传jpg/png文件，且不超过500kb',
            action: 'https://jsonplaceholder.typicode.com/posts/',
          },
        },
      ];
    },
  },
  data() {
    return {
      // 表单
      formData: {
        name: '',
        desc: '',
        color: '',
        height: 180,
        age: 18,
        profile: '',
        progress: 20,
        birthday: '',
        gender: '1',
        status: 'enabled',
        department: 'frontend',
        hobbies: ['sports'],
        enabled: false,
        fileList: [],
      },
      // 树形下拉选择列表
      selectionTree: [
        {
          label: '技术部',
          value: 'tech',
          children: [
            { label: '前端组', value: 'frontend' },
            { label: '后端组', value: 'backend' },
          ],
        },
        {
          label: '市场部',
          value: 'marketing',
          children: [
            { label: '国内市场', value: 'domestic' },
            { label: '国际市场', value: 'international' },
          ],
        },
      ],
      setting: {
        gap: 10,
        foldLength: 8,
        showSearch: true,
        showReset: true,
        searchText: '查询',
        resetText: '重置',
      },
      settingOptons: [
        {
          label: '显示查询按钮',
          value: 'showSearch',
          type: 'switch',
          span: 12,
        },
        {
          label: '显示重置按钮',
          value: 'showReset',
          type: 'switch',
          span: 12,
        },
        {
          label: '折叠显示项数',
          value: 'foldLength',
          type: 'input-number',
          attrs: {
            min: 1,
          },
          span: 12,
        },
        {
          label: '间距',
          value: 'gap',
          type: 'input-number',
          attrs: {
            min: 1,
          },
          span: 12,
        },
        {
          label: '查询按钮文本',
          value: 'searchText',
          type: 'input',
          span: 12,
        },
        {
          label: '重置按钮文本',
          value: 'resetText',
          type: 'input',
          span: 12,
        },
      ],
    };
  },
  methods: {
    handleSearch() {
      console.log('查询数据:', this.formData);
    },
    handleReset() {
      console.log('重置表单');
    },
  },
};
</script>
```

:::
</ClientOnly>

## 表单项 `Option` 示例

<ClientOnly>
:::demo

```vue
<template>
  <jl-form class="demo3" :options="options" v-model="formData" label-width="200px" label-position="left">
    <template #form-item="{ option }">
      <template v-if="option.value === 'style'">
        <jl-json-editor v-model="formData.style" style="height: 60px;"></jl-json-editor>
      </template>
    </template>
  </jl-form>
  <jl-json-editor v-model="formData" style="height: 320px; margin-top: 20px"></jl-json-editor>
</template>
<script>
export default {
  computed: {
    options() {
      return [
        {
          label: '控件示例',
          value: 'value',
          type: this.formData.type,
          disabled: this.formData.disabled,
          span: this.formData.span,
          required: this.formData.required,
          tip: this.formData.tip,
          description: this.formData.description,

          attrs: {
            options: this.itemOptions,
            style: this.formData.style,
          },
          listeners: {
            change(val) {
              console.log(val);
            },
          },
        },
        {
          label: '切换控件类型',
          value: 'type',
          type: 'select',
          attrs: {
            options: this.typeOptions,
          },
          listeners: {
            change: this.handleChange,
          },
        },
        {
          label: '控件布局',
          value: 'span',
          type: 'slider',
          attrs: {
            min: 1,
            max: 24,
          },
        },
        {
          label: 'tip (提示内容)',
          value: 'tip',
          type: 'input',
        },
        {
          label: 'required (必填)',
          value: 'required',
          type: 'switch',
        },
        {
          label: 'disabled (禁用)',
          value: 'disabled',
          type: 'switch',
        },
        {
          label: 'style (表单项中控件样式)',
          value: 'style',
        },
        {
          label: 'description (底部提示)',
          value: 'description',
          type: 'input',
        },
      ];
    },
    typeOptions() {
      return [
        { label: '输入框 (input)', value: 'input' },
        { label: '数字输入框 (input-number)', value: 'input-number' },
        { label: '多行文本 (textarea)', value: 'textarea' },
        { label: '下拉选择 (select)', value: 'select' },
        { label: '树形下拉 (select-tree)', value: 'select-tree' },
        { label: '单选框 (radio)', value: 'radio' },
        { label: '多选框 (checkbox)', value: 'checkbox' },
        { label: '级联选择 (cascader)', value: 'cascader' },
        { label: '颜色选择器 (color-picker)', value: 'color-picker' },
        { label: '开关 (switch)', value: 'switch' },
        { label: '文件上传 (upload)', value: 'upload' },
        { label: '滑块 (slider)', value: 'slider' },
        { label: '评分 (rate)', value: 'rate' },
        { label: '日期选择 (date)', value: 'date' },
        { label: '日期时间选择 (datetime)', value: 'datetime' },
        { label: '任意时间 (time)', value: 'time' },
        { label: '固定时间 (time-select)', value: 'time-select' },
        { label: '自定义周期选择 (cycle-select)', value: 'cycle-select' },
      ];
    },
  },
  data() {
    return {
      formData: {
        value: null,
        type: 'input',
        required: false,
        disabled: false,
        width: 100,
        style: {
          width: '600px',
        },
        description: '',
        tip: '',
        span: 24,

        attrs: '控制属性(写法一)',
        props: '控制属性(写法二)',

        listeners: '控制事件(写法一)',
        events: '控制事件(写法二)',
      },
      itemOptions: [
        { label: '选项一', value: '1' },
        { label: '选项二', value: '2', children: [{ label: '子选项一', value: '1-1' }] },
      ],
    };
  },
  methods: {
    handleChange() {
      if (this.formData.type === 'cycle-select') {
        this.formData.value = {};
      } else {
        this.formData.value = null;
      }
    },
  },
};
</script>
<style>
.jl-form-select {
  width: 200px;
  display: block;
  margin-left: auto;
  margin-bottom: 10px;
}
.demo3 .el-col:nth-of-type(1) {
  border: 1px solid var(--jl-primary);
  padding: 10px;
  overflow: hidden;
  position: relative;
}
/* .demo3 .el-col:nth-of-type(3)::before {
  content: '';
  position: absolute;
  left: 0px;
  width: 706px;
  bottom: 0;
  top: 0;
  pointer-events: none;
  z-index: 0;
  background-image: repeating-linear-gradient(
    to right,
    #0000 0,
    rgba(0, 0, 0, 0.06) calc(100% / 24 - 1px),
    transparent calc(100% / 24 - 1px),
    transparent calc(100% / 24)
  );
  background-size: 100% 100%;
} */
</style>
```

:::
</ClientOnly>

### Attributes

| 参数            | 说明                   | 类型                                  | 可选值       | 默认值   |
| --------------- | ---------------------- | ------------------------------------- | ------------ | -------- |
| options         | 表单项配置             | <DocOption type="form"></DocOption>[] | —            | []       |
| value / v-model | 表单数据               | object                                | —            | {}       |
| footer          | 表单默认操作按钮       | string                                | —            | 重置     |
| loading         | 加载状态               | boolean                               | true / false | false    |
| gap             | 表单项间距             | number                                | —            | 16       |
| foldLength      | 折叠时显示的表单项数量 | number                                | —            | Infinity |
| showLabel       | 是否显示标签           | boolean                               | true / false | true     |
| showSearch      | 是否显示查询按钮       | boolean                               | true / false | true     |
| showReset       | 是否显示重置按钮       | boolean                               | true / false | true     |
| searchText      | 查询按钮文本           | string                                | —            | 查询     |
| resetText       | 重置按钮文本           | string                                | —            | 重置     |

### Events

| 事件名 | 说明                    | 回调参数           |
| ------ | ----------------------- | ------------------ |
| search | 点击查询按钮时触发      | —                  |
| reset  | 点击重置按钮时触发      | —                  |
| expand | 展开/收起状态变化时触发 | isExpand: 是否展开 |

### 方法

| 方法名        | 说明         | 参数                 |
| ------------- | ------------ | -------------------- |
| validate      | 校验         | (valid, field) => {} |
| clearValidate | 清除表单校验 | —                    |
| resetFields   | 重置表单     | —                    |

### Slot

| 插槽名           | 说明             | 参数                                    |
| ---------------- | ---------------- | --------------------------------------- |
| form-item        | 自定义表单项     | { <DocOption type="form"></DocOption> } |
| form-item-suffix | 自定义表单项后缀 | { <DocOption type="form"></DocOption> } |
| footer-prefix    | 自定义底部前置   | —                                       |
| footer           | 自定义底部       | —                                       |
| footer-suffix    | 自定义底部后置   | —                                       |
