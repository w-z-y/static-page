# Table 表格

表单用于收集用户输入的数据，支持多种表单控件类型、验证规则、布局配置等功能。可以快速构建复杂的表单页面。

## 基本用法

最基础的表单用法，通过`options`属性配置表单项。
::: demo

```vue
<template>
  <jl-table v-loading="isLoading" :data="tableList" :columns="tableColumns" :pagination="pageParams" :page-sizes="[10, 20]" @page="getTableList">
  </jl-table>
</template>

<script>
const list = [];
const total = 11;
export default {
  computed: {
    tableColumns() {
      return [
        { label: '序号', type: 'index', width: 50, fixed: 'left' },
        { label: '普通文本普通文本', value: 'name', required: true, align: 'center' },
        { label: '文本超出文本超出文本超出', value: 'name2', required: true, sortable: true, width: 100 },
        { label: '年龄', value: 'age', width: 150 },
      ];
    },
  },
  data() {
    return {
      isLoading: false,
      pageParams: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        sort: 'desc',
        sortField: '',
      },
      tableList: [],
    };
  },
  mounted() {
    for (let i = 1; i <= total; i++) {
      list.push({
        name: `姓名${i}`,
        age: 20 + (i % 10),
        profile1: `这是第${i}位用户的个人简介。`,
        profile2: `这是第${i}位用户的个人简介。`,
      });
    }
    this.getTableList();
  },
  methods: {
    getTableList() {
      this.isLoading = true;
      const { currentPage, pageSize } = this.pageParams;
      const start = (currentPage - 1) * pageSize;
      const end = start + pageSize;
      console.log(start, end);
      this.tableList = list.slice(start, end);
      this.pageParams.total = total;
      setTimeout(() => {
        this.isLoading = false;
      }, 200);
    },
  },
};
</script>
```

:::

## 高级用法

最基础的表单用法，通过`options`属性配置表单项。
::: demo

```vue
<template>
  <jl-card>
    <jl-form v-model="configFormData" :options="configFormList"></jl-form>
  </jl-card>
  <jl-card style="height: 500px; margin-top: 20px">
    <jl-table
      :key="`demo-${index}`"
      v-loading="isLoading"
      v-model="selectionList"
      row-key="name"
      height="100%"
      show-overflow-tooltip
      ref="tableRef"
      sortable-column
      sortable-row
      show-summary
      select-on-row-click
      :is-virtual="configFormData.isVirtual"
      :multiple="configFormData.isMultiple"
      :item-size="56"
      :data="tableList"
      :columns="columns"
      :pagination="configFormData.isPagination ? pageParams : null"
      :summary-method="getSummaries"
      @page="getTableList">
      <!-- 这里是自定义插槽 -->
      <template #header="{ column }">
        <template v-if="column.value === 'test'">
          <jl-dropdown v-model="filters.type" :options="dropdownOptions" @command="handleCommand">
            <template #default="{ label, visible }">
              <span class="cursor-pointer">
                {{ label }}
                <jl-icon icon="el-icon-arrow-down" :class="{ 'jl-rotate': visible }"></jl-icon>
              </span>
            </template>
          </jl-dropdown>
        </template>
      </template>
      <template #cell="{ row, column }">
        <template v-if="column.value === 'action'">
          <jl-button text>编辑</jl-button>
          <jl-button text danger @click="handleDelete">删除</jl-button>
        </template>
      </template>
    </jl-table>
  </jl-card>
</template>

<script>
const list = [];
const total = 30;
export default {
  computed: {
    tableColumns: {
      set(val) {
        this.columns = val;
        return val;
      },
      get() {
        return this.columns;
      },
    },
  },
  data() {
    return {
      filters: {
        type: 'all',
      },
      index: 1,
      dropdownOptions: [
        { label: '全部', value: 'all' },
        { label: '归我所有', value: 'mine' },
        { label: '与我共享', value: 'share' },
      ],
      configFormData: {
        isMultiple: true,
        isPagination: true,
        isVirtual: false,
      },
      configFormList: [
        {
          label: '单选/多选',
          value: 'isMultiple',
          type: 'switch',
          span: 6,
          listeners: {
            change: () => {
              this.$refs.tableRef.clearSelection();
            },
          },
        },
        {
          label: '是否分页',
          value: 'isPagination',
          type: 'switch',
          span: 6,
        },
        {
          label: '开启虚拟列表',
          value: 'isVirtual',
          type: 'switch',
          span: 6,
          listeners: {
            change: () => {
              this.index++;
            },
          },
        },
      ],
      /*





      */
      selectionList: [],
      isLoading: false,
      columns: [
        { type: 'selection', width: 80, fixed: 'left' },
        { label: '序号', type: 'index', width: 50, fixed: 'left' },
        { label: '普通文本普通文本', value: 'name', required: true },
        { label: 'test', value: 'test', width: 150, required: true },
        {
          label: '基本信息',
          width: 150,
          children: [
            { label: '年龄', value: 'age', type: 'input-number', width: 150 },
            { label: '个人简介1', value: 'profile1', width: 120 },
          ],
        },
        {
          label: '二级标题',
          children: [
            { label: '个人简介2', value: 'profile1', type: 'input', width: 120 },
            { label: '个人简介3', value: 'profile2', width: 120 },
          ],
        },
        { label: '操作', value: 'action', fixed: 'right', width: 140 },
      ],
      pageParams: {
        currentPage: 1,
        pageSize: 20,
        total: 0,
        sort: 'desc',
        sortField: '',
      },
      tableList: [],
    };
  },
  mounted() {
    for (let i = 1; i <= total; i++) {
      list.push({
        index: i,
        name: `姓名${i}`,
        age: 20 + (i % 10),
        test: `test${i}`,
        profile1: `这是第${i}位用户的个人简介。`,
        profile2: `这是第${i}位用户的个人简介。`,
      });
    }
    this.getTableList();
  },
  methods: {
    getTableList() {
      this.isLoading = true;
      const { currentPage, pageSize } = this.pageParams;
      const start = (currentPage - 1) * pageSize;
      const end = start + pageSize;
      console.log(start, end);
      this.tableList = list.slice(start, end);
      this.pageParams.total = total;
      setTimeout(() => {
        this.isLoading = false;
      }, 200);
    },
    handleCommand(command) {
      console.log('选择:', command);
    },
    handleDelete() {
      this.$jlConfirm({
        title: '提示标题', // 默认内容： 提示
        content: '提示内容', // 默认内容： 此操作将永久删除
        beforeClose: async () => {
          await new Promise((resolve) => {
            setTimeout(resolve, 1000);
          });
        },
      });
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总数';
          return;
        }
        const values = data.map((item) => Number(item[column.property]));
        if (!values.every((value) => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += ' (岁)';
        } else {
          sums[index] = '-';
        }
      });

      return sums;
    },
  },
};
</script>
```

:::

### Attributes

| 参数                  | 说明                                      | 类型                                   | 可选值                         | 默认值             |
| --------------------- | ----------------------------------------- | -------------------------------------- | ------------------------------ | ------------------ |
| row-key               | 行数据的 Key                              | String                                 | —                              | -                  |
| columns               | 表格配置                                  | <DocOption type="table"></DocOption>[] | —                              | []                 |
| data                  | 表格数据                                  | array                                  | —                              | []                 |
| pagination            | 分页参数                                  | object                                 | —                              | -                  |
| page-sizes            | 分页可选每页条数                          | array                                  | —                              | [20, 50, 100, 500] |
| show-overflow-tooltip | 自动省略提示                              | boolean / object                       | false / true / { rows: {num} } | false              |
| is-virtual            | 开启虚拟滚动(row-key 必传)                | boolean                                | false / true                   | false              |
| item-size             | 虚拟滚动每行高度                          | number                                 | -                              | 40                 |
| sortable-column       | 开启一级列拖拽排序                        | boolean                                | true / false                   | false              |
| sortable-row          | 开启行拖拽排序                            | boolean                                | true / false                   | false              |
| v-model               | 单选，多选绑定的值                        | array                                  | —                              | []                 |
| verifiy               | 开启校验功能(调用 validate 方法进行校验)  | boolean                                | —                              | false              |
| multiple              | 是否多选模式(针对于 type: 'selection' 列) | boolean                                | true / false                   | true               |
| select-on-row-click   | 是否多选模式(针对于 type: 'selection' 列) | boolean                                | true / false                   | true               |

## Events

| 参数 | 说明         |
| ---- | ------------ |
| page | 切换分页触发 |
| sort | 排序         |

## Slot

| 插槽名 | 说明         | 参数                       |
| ------ | ------------ | -------------------------- |
| cell   | 自定义表格项 | { row, column: { value } } |
