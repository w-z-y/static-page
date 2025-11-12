export default {
  methods: {
    clearSelection() {
      tthis.getTableRef().clearSelection()
    },
    async selectionMixin_initSelection() {
      await this.$nextTick();
      this.selectionMixin_toggleSelection();
    },
    async selectionMixin_toggleSelection() {
      this.internalValue.map((internalRow) => {
        const findItem = this.data.find((row) => this.getValueByRowKey(row) === this.getValueByRowKey(internalRow));
        if (findItem) {
          this.getTableRef().toggleRowSelection(findItem);
        }
      });
    },
    // 更新选择状态
    selectionMixin_updateSelection(row, shouldSelect) {
      const rowKey = this.getValueByRowKey(row);
      const index = this.internalValue.findIndex((internalRow) => this.getValueByRowKey(internalRow) === rowKey);
      const hasExit = index !== -1;

      if (this.multiple) {
        if (shouldSelect && !hasExit) {
          this.internalValue.push(row);
        } else if (!shouldSelect && index > -1) {
          this.internalValue.splice(index, 1);
        }
      } else {
        this.getTableRef().clearSelection();
        this.internalValue = hasExit ? [] : [row];
        this.getTableRef().toggleRowSelection(row, !hasExit);
      }
    },
    selectionMixin_handleSelectAll(selection) {
      // 单选时不触发
      if (!this.multiple) return
      const isDeselecting = this.internalValue.length > selection.length;
      this.data.map((row) => {
        this.selectionMixin_updateSelection(row, !isDeselecting);
      });
    },
    selectionMixin_handleSelectOne(selection, row) {
      const rowKey = this.getValueByRowKey(row);
      if (!rowKey) {
        this.$message.warning('需要绑定row-key')
      }
      const isSelected = this.internalValue.map((internalRow) => this.getValueByRowKey(internalRow)).includes(rowKey);
      this.selectionMixin_updateSelection(row, !isSelected);
    },
  },
};
