<template>
  <el-table-column
    :class-name="className"
    :is="isVirtual ? 'virtual-column' : 'el-table-column'"
    v-bind="{ ...$attrs, ...column }"
    v-on="$listeners"
    :prop="column.value"
    :header-align="column.align">
    <template v-if="!columnTypes.includes(column.type)" #header="{ column: columnItem, $index }">
      <slot name="header" v-bind="{ column, $index }"></slot>
    </template>

    <!-- 递归 -->
    <template v-if="column.children">
      <template v-for="subColumn in column.children">
        <jl-table-column :column="subColumn">
          <template v-if="!columnTypes.includes(subColumn.type)" #header="{ column: columnItem, $index }">
            <slot name="header" v-bind="{ column: subColumn, $index }"></slot>
          </template>
          <template #default="{ row, $index }">
            <slot v-bind="{ row, column: subColumn, $index }"></slot>
          </template>
        </jl-table-column>
      </template>
    </template>

    <template v-if="!column.children && !columnTypes.includes(column.type)" #default="{ row, $index }">
      <slot v-bind="{ row, column, $index }"></slot>
    </template>
  </el-table-column>
</template>

<script>
import COM_PREFIX from '../../../../../src/config';
import virtualColumn from './virtual-column.vue';
export default {
  name: COM_PREFIX + 'TableColumn',
  inject: ['isVirtual'],
  props: {
    column: { type: Object, default: () => ({}) },
    // 是否多选(false时，为单选)
    multiple: { type: Boolean, default: true },
  },
  components: {
    virtualColumn,
    JlTableColumn: () => import('./column.vue'),
  },
  computed: {
    columnTypes() {
      return ['selection', 'index'];
    },
    columnKey() {
      return (column) => {
        return column.keyValue || column.value;
      };
    },
    className() {
      if (!this.multiple && this.columnTypes.includes(this.column.type)) {
        return 'allow-drag is-built-in';
      } else {
        return 'allow-drag';
      }
    },
  },
};
</script>

<style scoped lang="scss"></style>
