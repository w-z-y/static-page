<template>
  <el-pagination
    ref="jlPaginationRef"
    popper-class="jl-select-popper"
    :page-size.sync="internalPageSize"
    :current-page.sync="internalCurrentPage"
    :background="background"
    :layout="layout"
    :page-sizes="pageSizes"
    v-bind="$attrs"
    v-on="$listeners"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange" />
</template>

<script>
import COM_PREFIX from '../../../../../src/config';
export default {
  name: COM_PREFIX + 'Pagination',
  props: {
    currentPage: { type: Number, default: 1 },
    pageSize: { type: Number, default: 20 },
    pageSizes: {
      type: Array,
      default() {
        return [20, 50, 100, 500];
      },
    },
    layout: { type: String, default: 'total, sizes, prev, pager, next, jumper' },
    background: { type: Boolean, default: true },
  },
  data() {
    return {
      unWatchPagination: null,
    };
  },
  computed: {
    internalPageSize: {
      get() {
        return this.pageSize;
      },
      set(val) {
        this.$emit('update:pageSize', val);
      },
    },
    internalCurrentPage: {
      get() {
        return this.currentPage;
      },
      set(val) {
        this.$emit('update:current-page', val);
      },
    },
  },
  methods: {
    handleSizeChange() {
      this.$emit('page');
    },
    handleCurrentChange() {
      this.$emit('page');
    },
    watchPaginationPage() {
      this.unWatchPagination = this.$watch(
        () => this.$refs.jlPaginationRef.internalPageCount,
        (newVal, oldVal) => {
          if (newVal < oldVal) {
            this.$emit('update:current-page', newVal);
            this.$emit('page');
          }
        }
      );
    },
  },
  mounted() {
    this.watchPaginationPage();
  },
  beforeDestroy() {
    this.unWatchPagination();
    this.unWatchPagination = null;
  },
};
</script>

<style scoped>
.pagination-container {
  background: #fff;
  text-align: right;
}
</style>
