<template>
  <div class="table-example">
    <MyFullScreen ref=".table-example" />
    <MyTable ref="tableRef" :data="tableData" :columns="columns">
      <template #default="{ row, column }">
        <template v-if="column.value === 'name'">
          <el-tag>{{ row.name }}</el-tag>
        </template>
        <template v-else-if="column.value === 'operation'">
          <el-button type="text" @click="handleEdit(row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(row)">删除</el-button>
        </template>
      </template>
    </MyTable>
  </div>
</template>

<script>
export default {
  name: 'TableExample',
  data() {
    return {
      tableData: [
        {
          name: '张三',
          age: 18,
          address: '北京市朝阳区北京市朝阳区北京市朝阳区北京市朝阳区北京市朝阳区',
          phone: '13800138000',
        },
        {
          name: '李四',
          age: 20,
          address: '上海市浦东新区',
          phone: '13900139000',
        },
        {
          name: '王五',
          age: 25,
          address: '广州市天河区',
          phone: '13700137000',
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
    handleEdit(row) {
      console.log('编辑', row);
    },
    handleDelete(row) {
      console.log('删除', row);
    },
  },
};
</script>

<style lang="scss" scoped>
.table-example {
  width: 100%;
}
</style>
