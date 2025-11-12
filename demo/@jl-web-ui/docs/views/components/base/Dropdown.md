# Dropdown 下拉菜单

下拉菜单组件用于在点击或悬停时显示一个下拉列表，支持多种触发方式、自定义内容、分割线等功能。常用于导航菜单、操作按钮、筛选条件等场景。

## 基本用法

::: demo

```vue
<template>
  <jl-dropdown :options="dropdownOptions" @command="handleCommand">
    <jl-button>
      下拉菜单
      <jl-icon icon="el-icon-arrow-down"></jl-icon>
    </jl-button>
  </jl-dropdown>
  <jl-dropdown split-button :options="dropdownOptions" @command="handleCommand" @click="handleClick" size="small"> 下拉菜单 </jl-dropdown>
</template>

<script>
export default {
  data() {
    return {
      dropdownOptions: [
        { label: '选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1', value: 'option1', icon: 'el-icon-plus' },
        { label: '选项2', value: 'option2', icon: 'edit' },
        { label: '选项3', value: 'option3' },
        { label: '选项4', value: 'option4', type: 'primary', divided: true },
        { label: '选项5', value: 'option5', type: 'warning', divided: true },
        { label: '选项6', value: 'option6', type: 'danger', divided: true },
        { label: '选项7', value: 'option7', type: 'success', divided: true },
        { label: '选项8', value: 'option8', type: 'info', divided: true },
      ],
    };
  },
  methods: {
    handleCommand(command) {
      console.log('选择:', command);
    },
    handleClick() {
      console.log('点击了按钮');
    },
  },
};
</script>
```

:::

## 回显勾选项 (绑定 `v-model` )

::: demo

```vue
<template>
  <jl-card header="单选">
    当前回显值：{{ value }}
    <br />
    <br />
    <jl-dropdown v-model="value" :options="dropdownOptions" @command="handleCommand" :hide-on-click="false" placement="bottom-start">
      <template #default="{ label }">
        <jl-button>
          {{ label }}
          <jl-icon icon="el-icon-arrow-down"></jl-icon>
        </jl-button>
      </template>
    </jl-dropdown>
  </jl-card>
  <jl-card header="多选(支持反选)">
    当前回显值：{{ value2 }}
    <br />
    <br />
    <jl-dropdown v-model="value2" multiple :options="dropdownOptions" @command="handleCommand" :hide-on-click="false" placement="bottom-start">
      <template #default="{ label }">
        <jl-button>
          {{ label }}
          <jl-icon icon="el-icon-arrow-down"></jl-icon>
        </jl-button>
      </template>
    </jl-dropdown>
  </jl-card>
</template>

<script>
export default {
  data() {
    return {
      value: 'option2',
      value2: ['option1', 'option2'],
      dropdownOptions: [
        { label: '选项1', value: 'option1' },
        { label: '选项2', value: 'option2', showLabel: '回显选项2-showLabel' },
        { label: '选项3', value: 'option3' },
        { label: '选项4', value: 'option4' },
      ],
    };
  },
  methods: {
    handleCommand(command) {
      console.log('选择:', command);
    },
  },
};
</script>
```

:::

## 不同触发方式

通过`trigger`属性可以设置不同的触发方式。

::: demo

```vue
<template>
  <div>
    <jl-card header="点击触发(默认)">
      <jl-dropdown :options="dropdownOptions" trigger="click" @command="handleCommand">
        <jl-button>点击触发</jl-button>
      </jl-dropdown>
    </jl-card>
    <br />
    <jl-card header="悬停触发">
      <jl-dropdown :options="dropdownOptions" trigger="hover" @command="handleCommand">
        <jl-button>悬停触发</jl-button>
      </jl-dropdown>
    </jl-card>
    <br />
    <jl-card header="右键触发">
      <jl-dropdown style="width: 100%" :options="dropdownOptions" trigger="contextmenu" @command="handleCommand">
        <jl-card padding="100px" style="background: #eee; text-align: center">触发区域</jl-card>
      </jl-dropdown>
    </jl-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dropdownOptions: [
        { label: '选项1', value: 'option1' },
        { label: '选项2', value: 'option2' },
        {
          label: '选项3',
          value: 'option3',
          children: [
            { label: '新建文件', value: 'new-file' },
            { label: '打开文件', value: 'open-file' },
            { label: '保存文件', value: 'save-file' },
          ],
        },
      ],
    };
  },
  methods: {
    handleCommand(command) {
      console.log('选择:', command);
    },
  },
};
</script>
```

:::

## 自定义内容

通过 `dropdown` 插槽可以自定义下拉菜单的内容。

::: demo

```vue
<template>
  <jl-dropdown ref="jlDropdownRef">
    <jl-button>
      自定义菜单
      <jl-icon icon="el-icon-arrow-down"></jl-icon>
    </jl-button>
    <template #dropdown>
      <jl-button danger @click="handleCommand('logout')">退出登录</jl-button>
    </template>
  </jl-dropdown>
</template>

<script>
export default {
  methods: {
    handleCommand(command) {
      console.log('执行操作:', command);
      this.$refs.jlDropdownRef.hide();
    },
  },
};
</script>
```

:::

## 多级菜单

可以创建多级的下拉菜单。

::: demo

```vue
<template>
  <jl-dropdown :options="dropdownOptions" @command="handleCommand">
    <jl-button>
      多级菜单
      <jl-icon icon="el-icon-arrow-down"></jl-icon>
    </jl-button>
  </jl-dropdown>
</template>

<script>
export default {
  data() {
    return {
      dropdownOptions: [
        {
          label: '文件操作',
          value: 'file',
          children: [
            { label: '新建文件', value: 'new-file' },
            { label: '打开文件', value: 'open-file' },
            { label: '保存文件', value: 'save-file' },
          ],
        },
        {
          label: '编辑操作',
          value: 'edit',
          children: [
            { label: '撤销', value: 'undo' },
            { label: '重做', value: 'redo' },
            { label: '剪切', value: 'cut' },
            { label: '复制', value: 'copy' },
            { label: '粘贴', value: 'paste' },
          ],
        },
        {
          label: '视图',
          value: 'view',
          disabled: true,
          children: [
            { label: '放大', value: 'zoom-in' },
            { label: '缩小', value: 'zoom-out' },
            { label: '适应窗口', value: 'fit-window' },
          ],
        },
      ],
    };
  },
  methods: {
    handleCommand(command) {
      console.log('执行操作:', command);
    },
  },
};
</script>
```

:::

## 表格行操作

下拉菜单常用于表格行的操作按钮。

::: demo

```vue
<template>
  <jl-table :data="tableData" :columns="columns">
    <template #cell="{ row, column }">
      <template v-if="column.value === 'action'">
        <jl-dropdown :options="actionOptions" @command="(command) => handleAction(command, row)">
          <jl-button text size="mini">
            操作
            <jl-icon icon="el-icon-arrow-down"></jl-icon>
          </jl-button>
        </jl-dropdown>
      </template>
    </template>
  </jl-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        { id: 1, name: '张三', status: 'active' },
        { id: 2, name: '李四', status: 'inactive' },
        { id: 3, name: '王五', status: 'active' },
      ],
      columns: [
        { label: 'ID', value: 'id' },
        { label: '姓名', value: 'name' },
        { label: '状态', value: 'status' },
        { label: '操作', value: 'action' },
      ],
      actionOptions: [
        { label: '查看', value: 'view', icon: 'el-icon-view' },
        { label: '编辑', value: 'edit', icon: 'el-icon-edit' },
        { label: '删除', value: 'delete', icon: 'el-icon-delete' },
      ],
    };
  },
  methods: {
    handleAction(command, row) {
      console.log('执行操作:', command, '行数据:', row);
    },
  },
};
</script>
```

:::

### Attributes

| 参数      | 说明                                | 类型                                      | 可选值                                               | 默认值 |
| --------- | ----------------------------------- | ----------------------------------------- | ---------------------------------------------------- | ------ |
| v-model   | 勾选值                              | array                                     | —                                                    | []     |
| options   | 下拉菜单选项配置                    | <DocOption type="dropdown"></DocOption>[] | —                                                    | []     |
| trigger   | 触发方式                            | string                                    | hover/click/contextmenu                              | click  |
| placement | 菜单弹出位置                        | string                                    | top/top-start/top-end/bottom/bottom-start/bottom-end | bottom |
| disabled  | 是否禁用                            | boolean                                   | true / false                                         | false  |
| multiple  | 是否支持多选(需要搭配 v-model 实现) | boolean                                   | true / false                                         | false  |

### 下拉菜单选项配置 (options)

| 参数     | 说明         | 类型    | 可选值       | 默认值 |
| -------- | ------------ | ------- | ------------ | ------ |
| label    | 选项标签     | string  | —            | —      |
| value    | 选项值       | string  | —            | —      |
| icon     | 选项图标     | string  | —            | —      |
| disabled | 是否禁用     | boolean | true / false | false  |
| divided  | 是否为分割线 | boolean | true / false | false  |
| children | 子菜单选项   | array   | —            | —      |

### Events

| 事件名         | 说明                  | 回调参数            |
| -------------- | --------------------- | ------------------- |
| command        | 点击菜单项时触发      | command: 菜单项的值 |
| visible-change | 下拉框出现/隐藏时触发 | visible: 是否出现   |

### Slot

| 插槽名   | 说明                   |
| -------- | ---------------------- |
| default  | 触发下拉菜单显示的元素 |
| dropdown | 下拉菜单内容           |
