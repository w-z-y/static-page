<template>
  <MySpace direction="vertical" class="table-example">
    <MyFullScreen ref=".table-example" />
    <MyCard class="w-100">
      <MyTable ref="tableRef" :data="tableData" :columns="columns" row-key="id" default-expand-all :span-method="spanMethod">
        <template #default="{ row, column }">
          <!-- <template v-if="column.value === 'name'">
            <el-tag>{{ row.name }}</el-tag>
          </template> -->
          <template v-if="column.value === 'operation'">
            <el-button type="text" @click="handleEdit(row)">编辑</el-button>
            <el-button type="text" @click="handleDelete(row)">删除</el-button>
          </template>
        </template>
      </MyTable>
    </MyCard>
    <MyCard class="w-100" style="height: 300px">
      <MyTable :cell-style="{ padding: '1px 0' }" size="small" ref="tableRef" height="100%" :data="tableData2" :columns="columns" row-key="id" default-expand-all>
        <template #default="{ row, column }">
          <template v-if="column.value === 'operation'">
            <el-button type="text" @click="handleEdit(row)">编辑</el-button>
            <el-button type="text" @click="handleDelete(row)">删除</el-button>
          </template>
        </template>
      </MyTable>
    </MyCard>
  </MySpace>
</template>

<script>
export default {
  name: 'TableExample',
  data() {
    return {
      tableData: [
        {
          id: 1,
          name: '张三张三张三张三张三张三张三张三张三',
          age: 18,
          address: '上海市浦东新区',
          phone: '13800138000',
        },
        {
          id: 2,
          name: '张三张三张三张三张三张三张三张三张三',
          age: 18,
          address: '上海市浦东新区',
          phone: '13800138001',
        },
        {
          id: 3,
          name: '王五',
          age: 25,
          address: '上海市浦东新区',
          phone: '13800138002',
        },
      ],
      tableData2: [
        {
          id: 111, // 0 不可点击
          name: '分类一分类一分类一分类一分类一分类一分类一分类一分类一',
          children: [
            {
              id: 11,
              name: '张三',
              age: 18,
              address: '上海市浦东新区',
              phone: '13800138000',
            },
          ],
        },
        {
          id: 1,
          name: '分类二',
          address: '上海市浦东新区',
          phone: '13800138001',
        },
        {
          name: '分类三',
          id: 2,
        },
      ],
      columns: [
        {
          label: '姓名',
          value: 'name',
          //   slot: true,
        },
        {
          label: '年龄',
          value: 'age',
        },
        {
          label: '地址',
          value: 'address',
        },
        {
          label: '电话',
          value: 'phone',
        },
        {
          label: '操作',
          value: 'operation',
          //   slot: true,
        },
      ],
      tableRef: null,
    };
  },
  mounted() {
    this.tableRef = this.$refs.tableRef.$el;
    console.log('tableRef', this.tableRef);
  },
  methods: {
    rowClassName({ row }) {
      console.log('rowClassName', row);
      return 'table-row-class';
    },
    handleEdit(row) {
      console.log('编辑', row);
    },
    handleDelete(row) {
      console.log('删除', row);
    },
    spanMethod({ row, rowIndex, column }) {
      const standardColumn = 'name';
      const mergeColumns = ['name', 'address'];
      
      // 如果是序号列或不在合并列中,返回默认值
      if (column.type === 'index' || !mergeColumns.includes(column.property)) {
        return { rowspan: 1, colspan: 1 };
      }

      const property = column.property;
      const prevRow = this.tableData[rowIndex - 1];

      // 检查是否需要与上一行合并
      const shouldMergeWithPrev = prevRow && 
        prevRow[property] === row[property] && 
        (property === standardColumn || prevRow[standardColumn] === row[standardColumn]);
      
      if (shouldMergeWithPrev) {
        return { rowspan: 0, colspan: 0 };
      }

      // 计算向下合并的行数
      let mergeCount = 1;
      for (let i = rowIndex + 1; i < this.tableData.length; i++) {
        const nextRow = this.tableData[i];
        const canMerge = nextRow[property] === row[property] && 
          (property === standardColumn || nextRow[standardColumn] === row[standardColumn]);
        
        if (!canMerge) break;
        mergeCount++;
      }

      return {
        rowspan: mergeCount,
        colspan: 1
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.table-example {
  width: 100%;
}
::v-deep .root-row {
  background-color: #f3f9ee;
}
</style>
