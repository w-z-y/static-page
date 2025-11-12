# Tree 树形控件

树形控件用于展示具有层级关系的数据，支持展开/收起、选择、搜索、拖拽等功能。常用于文件管理、组织架构、分类管理等场景。

## 基本用法

最基础的树形控件用法，通过`data`属性传入树形数据。

::: demo

```vue
<template>
  <jl-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick"> </jl-tree>
</template>

<script>
export default {
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      treeData: [
        {
          label: '一级 1',
          children: [
            {
              label: '二级 1-1',
              children: [{ label: '三级 1-1-1' }],
            },
          ],
        },
        {
          label: '一级 2',
          children: [
            {
              label: '二级 2-1',
              children: [{ label: '三级 2-1-1' }],
            },
            {
              label: '二级 2-2',
              children: [{ label: '三级 2-2-1' }],
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleNodeClick(data) {
      console.log('点击节点:', data);
    },
  },
};
</script>
```

:::

## 自定义节点内容

通过插槽可以自定义节点的显示内容。

::: demo

```vue
<template>
  <jl-tree :data="treeData" :props="defaultProps" show-checkbox>
    <template #node-right="{ node, data }">
      <jl-icon.hover text size="12" icon="el-icon-plus" @click.stop="handleAdd(data)"> </jl-icon.hover>
      <jl-icon.hover text size="12" icon="el-icon-edit" @click.stop="handleEdit(data)"> </jl-icon.hover>
      <jl-icon.hover text size="12" danger icon="el-icon-delete" @click.stop="handleDelete(data)"> </jl-icon.hover>
    </template>
  </jl-tree>
</template>

<script>
export default {
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      treeData: [
        {
          label: '项目A',
          type: 'project',
          count: 5,
          children: [
            {
              label: '模块1',
              type: 'module',
              count: 3,
              children: [
                { label: '功能1', type: 'feature' },
                { label: '功能2', type: 'feature' },
                { label: '功能3', type: 'feature' },
              ],
            },
            {
              label: '模块2',
              type: 'module',
              count: 2,
              children: [
                { label: '功能4', type: 'feature' },
                { label: '功能5', type: 'feature' },
              ],
            },
          ],
        },
      ],
    };
  },
  methods: {
    getNodeIcon(data) {
      const iconMap = {
        project: 'el-icon-folder',
        module: 'el-icon-document',
        feature: 'el-icon-tickets',
      };
      return iconMap[data.type] || 'el-icon-document';
    },
    handleAdd(data) {
      console.log('添加子节点:', data);
    },
    handleEdit(data) {
      console.log('编辑节点:', data);
    },
    handleDelete(data) {
      console.log('删除节点:', data);
    },
  },
};
</script>

<style scoped>
.custom-tree-node {
  display: flex;
  align-items: center;
  width: 100%;
}

.node-actions {
  margin-left: auto;
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.2s;
}

.custom-tree-node:hover .node-actions {
  opacity: 1;
}
</style>
```

:::

## 搜索功能

可以添加搜索功能来快速定位节点。

::: demo

```vue
<template>
  <jl-card header="基本使用">
    <jl-form.input suffix-icon="el-icon-search" v-model="searchText" clearable placeholder="请输入关键字搜索" style="margin-bottom: 16px;">
    </jl-form.input>

    <jl-tree ref="treeRef" default-expand-all :data="treeData" :props="defaultProps"> </jl-tree>
  </jl-card>

  <hr />

  <jl-card header="封装好的文件树(带右击菜单)" style="height: 300px">
    <jl-tree.file-tree
      node-key="label"
      :data="treeData"
      :props="defaultProps"
      :options="dropdownOptions"
      :default-checked-keys="['Vue.js 教程', 'Python 教程']"
      :selectable="(data) => data.type === 2"
      :is-file="(data) => data.type === 2"
      @command="handleCommand"></jl-tree.file-tree>
  </jl-card>
</template>

<script>
export default {
  watch: {
    searchText(value) {
      this.$refs.treeRef.getTreeRef().filter(value);
    },
  },
  data() {
    return {
      searchText: '',
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      treeData: [
        {
          label: '技术文档',
          children: [
            {
              label: '前端开发',
              children: [{ label: 'Vue.js 教程', type: 2 }, { label: 'React 教程' }, { label: 'JavaScript 基础', type: 2 }],
            },
            {
              label: '后端开发',
              children: [{ label: 'Node.js 教程' }, { label: 'Python 教程1', type: 2 }, { label: 'Java 教程' }],
            },
          ],
        },
        {
          label: '产品文档',
          children: [
            {
              label: '产品设计',
              children: [{ label: '用户需求分析' }, { label: 'Python 教程2', type: 2 }, { label: '产品原型设计' }, { label: '用户体验设计' }],
            },
          ],
        },
      ],
    };
  },
  methods: {
    dropdownOptions(node) {
      return [
        {
          label: `新增`,
          value: 'add',
          icon: 'el-icon-plus',
        },
        {
          divided: true,
          label: `编辑`,
          value: 'edit',
          icon: 'el-icon-edit',
        },
        {
          divided: true,
          label: `删除`,
          value: 'delete',
          type: 'danger',
          icon: 'el-icon-delete',
        },
      ];
    },
    handleCommand(command) {
      console.log(command);
    },
  },
};
</script>
```

:::

### Attributes

| 参数               | 说明                                                     | 类型     | 可选值       | 默认值 |
| ------------------ | -------------------------------------------------------- | -------- | ------------ | ------ |
| data               | 树形数据                                                 | array    | —            | []     |
| props              | 配置选项                                                 | object   | —            | —      |
| show-checkbox      | 是否显示复选框                                           | boolean  | true / false | false  |
| default-expand-all | 是否默认展开所有节点                                     | boolean  | true / false | false  |
| check-strictly     | 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法 | boolean  | true / false | false  |
| lazy               | 是否懒加载子节点数据                                     | boolean  | true / false | false  |
| load               | 加载子节点数据的方法                                     | function | —            | —      |
| is-file            | 判断节点是否为文件的方法                                 | function | —            | —      |
| selectable         | 节点是否可被选中                                         | boolean  | true / false | true   |

### 配置选项 (props)

| 参数     | 说明                                         | 类型   | 可选值 | 默认值     |
| -------- | -------------------------------------------- | ------ | ------ | ---------- |
| children | 指定子树为节点对象的某个属性值               | string | —      | 'children' |
| label    | 指定节点标签为节点对象的某个属性值           | string | —      | 'label'    |
| disabled | 指定节点选择框是否禁用为节点对象的某个属性值 | string | —      | 'disabled' |
| isLeaf   | 指定节点是否为叶子节点                       | string | —      | 'leaf'     |

### Events

| 事件名       | 说明                 | 回调参数                                                                                                                                        |
| ------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| node-click   | 当节点被点击时触发   | data: 传递给 data 属性的数组中该节点所对应的对象, node: 当前节点对象                                                                            |
| check        | 当复选框被点击时触发 | data: 传递给 data 属性的数组中该节点所对应的对象, checkedInfo: 包含 checkedNodes、checkedKeys、halfCheckedNodes、halfCheckedKeys 四个属性的对象 |
| check-change | 当复选框被点击时触发 | data: 传递给 data 属性的数组中该节点所对应的对象, checked: 节点本身是否被选中, indeterminate: 节点的子树中是否有被选中的节点                    |

### 方法

| 方法名          | 说明                                                      | 参数                           |
| --------------- | --------------------------------------------------------- | ------------------------------ |
| getCheckedNodes | 若节点可被选择，则返回目前被选中的节点所组成的数组        | (leafOnly, includeHalfChecked) |
| setCheckedNodes | 通过 keys 设置目前勾选的节点                              | (nodes)                        |
| getCheckedKeys  | 若节点可被选择，则返回目前被选中的节点的 key 所组成的数组 | (leafOnly)                     |
| setCheckedKeys  | 通过 keys 设置目前勾选的节点                              | (keys, leafOnly)               |
| getCurrentKey   | 获取当前被选中节点的 key                                  | —                              |
| getCurrentNode  | 获取当前被选中节点的 data                                 | —                              |
| setCurrentKey   | 通过 key 设置某个节点的当前选中状态                       | (key)                          |
| setCurrentNode  | 通过 node 设置某个节点的当前选中状态                      | (node)                         |
| getNode         | 根据 data 或者 key 拿到 Tree 组件中的 node                | (data)                         |
| remove          | 删除 Tree 中的一个节点                                    | (data)                         |
| append          | 为 Tree 中的一个节点追加一个子节点                        | (data, parentNode)             |
| insertBefore    | 为 Tree 的一个节点的前面增加一个节点                      | (data, refNode)                |
| insertAfter     | 为 Tree 的一个节点的后面增加一个节点                      | (data, refNode)                |

### Slot

| 插槽名  | 说明           | 参数           |
| ------- | -------------- | -------------- |
| default | 自定义节点内容 | { node, data } |
