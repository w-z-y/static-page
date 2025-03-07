<template>
  <el-table ref="myTableRef" :data="data" :row-class-name="internalRowClassName" class="my-table" v-bind="$attrs" v-on="$listeners" :tree-props="defaultTreeProps">
    <template v-for="column in columns">
      <el-table-column :show-overflow-tooltip="showOverflowTooltip" v-bind="column" :key="column.keyValue || column.value" :prop="column.value">
        <template #header="{ column: internalColumn, $index }">
          <slot name="header" v-bind="{ column: { ...internalColumn, ...column }, $index }">
            {{ column.label }}
          </slot>
        </template>
        <template #default="{ row, column: internalColumn, $index }">
          <slot v-bind="{ row, column: { ...internalColumn, ...column }, $index }">
            <span :class="{ 'table-cell-content': showOverflowTooltip }"> {{ row[column.value] }}</span>
          </slot>
        </template>
      </el-table-column>
    </template>
    <slot name="append"></slot>
  </el-table>
</template>

<script>
import { DEFAULT_TREE_PROPS } from '@/constant';
import merge from '@/utils/merge';

export default {
  name: 'MyTable',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
    treeProps: {
      type: Object,
      default: () => DEFAULT_TREE_PROPS,
    },
    rowClassName: {
      type: [Function, String],
      default: '',
    },
    showOverflowTooltip: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    defaultTreeProps() {
      return merge({ ...DEFAULT_TREE_PROPS }, this.treeProps || {});
    },
  },
  methods: {
    internalRowClassName({ row, rowIndex }) {
      if (this.rowClassName) {
        if (typeof this.rowClassName === 'function') {
          return this.rowClassName({ row, rowIndex });
        }
        return this.rowClassName;
      }
      return row[this.defaultTreeProps.children]?.length || row[this.defaultTreeProps.hasChildren] ? 'root-row' : '';
    },
    // 树切换
    toggleTreeExpansion() {
      const tableRef = this.$refs.myTableRef;
      console.log('tableRef', tableRef);
      if (!tableRef && !this.data?.length) return;
      const store = tableRef.store;
      this.isExpandAll = !this.isExpandAll;
      this.data.forEach((row) => {
        store.toggleTreeExpansion(row);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.my-table {
  width: 100%;
  display: flex;
  flex-direction: column;
  ::v-deep .el-table__body-wrapper {
    flex: 1;
    .el-table__body {
      tr.root-row {
        position: sticky;
        top: 0;
        background-color: #f3f9ee;
        z-index: 1;
        td {
          background-color: #f3f9ee;
        }
      }
      .cell {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        .table-cell-content {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    .el-table__empty-block {
      position: sticky;
      width: 100%;
      left: 0;
    }
  }
}
</style>
