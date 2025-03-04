<template>
  <el-table class="my-table" v-bind="$attrs" v-on="$listeners">
    <el-table-column label="serial number" type="index" width="120"> </el-table-column>
    <template v-for="column in columns">
      <el-table-column v-bind="column" :key="column.keyValue || column.value" :prop="column.value">
        <template #default="scope">
          <slot :row="scope.row" :column="column">
            <MyTooltip>{{ scope.row[column.value] }}</MyTooltip>
          </slot>
        </template>
      </el-table-column>
    </template>
    <slot name="append"></slot>
  </el-table>
</template>

<script>
import MyTooltip from '../Tooltip';
export default {
  name: 'MyTable',
  components: { MyTooltip },
  props: {
    columns: {
      type: Array,
      default: () => [],
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
  }
}
</style>
