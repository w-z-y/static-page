<template>
  <el-table ref="myTableRef" :default-expand-all="defaultExpandAll" :data="data" :row-class-name="internalRowClassName" class="my-table" v-bind="$attrs" v-on="$listeners" :tree-props="defaultTreeProps">
    <template #default>
      <el-table-column v-for="(column, index) in columns" :show-overflow-tooltip="showOverflowTooltip || (column.attrs && column.attrs.showOverflowTooltip)" v-bind="column.attrs" :key="column.keyValue || column.value || index" :prop="column.value">
        <template #header="{ column: internalColumn, $index }">
          <slot name="header" v-bind="{ column: { ...internalColumn, ...column }, $index }"> {{ column.label }} </slot>
        </template>
        <template v-if="!(column.attrs && column.attrs.type)" #default="{ row, column: internalColumn, $index }">
          <slot v-bind="{ row, column: { ...internalColumn, ...column }, $index }">
            <span :class="{ 'table-cell-content': showOverflowTooltip }">
              {{ getValue(row, column, $index) }}
            </span>
          </slot>
        </template>
      </el-table-column>
    </template>
    <template #append>
      <slot name="append"></slot>
    </template>
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
    defaultExpandAll: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    defaultTreeProps() {
      return merge({ ...DEFAULT_TREE_PROPS }, this.treeProps || {});
    },
  },
  data() {
    return {
      isExpandAll: this.defaultExpandAll,
    };
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
      if (!tableRef && !this.data?.length) return;
      this.isExpandAll = !this.isExpandAll;
      this.data.forEach((row) => {
        tableRef.toggleRowExpansion(row, this.isExpandAll);
      });
    },
    getValue(row, column, $index) {
      let cellValue = row[column.value];
      if (cellValue === undefined || cellValue === null) {
        cellValue = '';
      } else {
        if (column.attrs?.formatter) {
          cellValue = column.attrs.formatter(row, column, cellValue, $index);
        } else if (cellValue instanceof Array) {
          cellValue = cellValue.join(',');
        }
      }
      return cellValue;
    },
  },
};
</script>

<style lang="scss" scoped>
.my-table {
  width: 100%;
  display: flex;
  flex-direction: column;
  ::v-deep .el-table__body-wrapper,
  ::v-deep .el-table__fixed-right {
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
      display: flex;
      width: 100% !important;
      left: 0;
    }
  }
}
</style>
