function updateScrollY() {
  const height = this.height;
  if (height === null) return false;
  const bodyWrapper = this.table.bodyWrapper;
  if (this.table.$el && bodyWrapper) {
    const body = bodyWrapper.querySelector('.el-table__body');
    const prevScrollY = this.scrollY;
    const scrollY = body.offsetHeight - this.bodyHeight > 1; // 这行修复了，在150%屏幕下，border会变成0.667px导致的滚动状态计算错误问题
    this.scrollY = scrollY;
    return prevScrollY !== scrollY;
  }
  return false;
}

export default {
  mounted() {
    if (this.isVirtual) {
      if (!this.rowKey) {
        console.error('虚拟表格需要传入row-key进行绑定');
      }
    } else {
      const tableRef = this.getTableRef();
      tableRef.layout.updateScrollY = updateScrollY;
      // tableRef.doLayot = doLayout;
    }
  },
};
