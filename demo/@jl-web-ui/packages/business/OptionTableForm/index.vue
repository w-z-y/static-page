<template>
  <div class="jl-business-option-form">
    <div class="option-form-container">
      <jl-table ref="jlTableRef" :sortable-row="draggable" :data="internalValue" :columns="internalColumns" v-bind="$attrs" v-on="$listeners">
        <template #header="{ column, $index }">
          <template v-if="column.value === ACTION_SYMBOL && !addButtonPositionIsRow && showOperateButton">
            <jl-icon class="operate-icon add-icon" size="22" icon="el-icon-circle-plus-outline" @click="add()"></jl-icon>
          </template>
        </template>

        <template #cell="{ row, column, cell, $index: index }">
          <template v-if="column.value === DRAG_SYMBOL">
            <jl-icon class="option-drag cursor-move" size="20" icon="move"> </jl-icon>
          </template>

          <template v-else-if="column.value === ACTION_SYMBOL && showOperateButton">
            <jl-icon v-if="showEditButton" class="operate-icon edit-icon" size="22" icon="edit" @click="handleEdit(row)"></jl-icon>

            <jl-icon
              v-if="addButtonPositionIsRow"
              class="operate-icon add-icon"
              size="22"
              icon="el-icon-circle-plus-outline"
              @click="add(index)"></jl-icon>

            <jl-popconfirm
              class="operate-icon"
              :disabled="(autoAddOneRow ? optionTableFormMixin_deleteButtonDisabled : false) || !showDeleteConfirm"
              @confirm="remove(index)">
              <jl-icon
                slot="reference"
                class="delete-icon"
                :class="{ 'is-disabled': autoAddOneRow ? optionTableFormMixin_deleteButtonDisabled : false }"
                size="22"
                icon="el-icon-remove-outline"
                @click="handleClickRemove(index)" />
            </jl-popconfirm>
          </template>
          <slot v-else name="cell" v-bind="{ row, column, cell, $index: index }"></slot>
        </template>
      </jl-table>
    </div>
  </div>
</template>

<script>
import COM_PREFIX from '@jl/web-ui/src/config';

import JlTable from '../../base/Table';
import JlPopconfirm from '../../base/Popconfirm';

const DRAG_SYMBOL = '__drag__';
const ACTION_SYMBOL = '__action__';

import optionTableFormMixin from '@jl/web-ui/src/mixin/business/option-table-form';

const operateItemWidth = 40;

export default {
  name: COM_PREFIX + 'Business.OptionTableForm',
  components: {
    JlTable,
    JlPopconfirm,
  },
  mixins: [optionTableFormMixin],
  props: {
    columns: { type: Array, default: () => [] },
    // 校验只能为 'row' 或 'header'  validator: (value) => ['row', 'header'].includes(value),
    addButtonPosition: { type: String, default: 'header' },
    // 是否显示编辑按钮
    showEditButton: { type: Boolean, default: false },
    // 是否可以拖拽排序
    draggable: { type: Boolean, default: false },
  },
  computed: {
    operateColumnWidth() {
      return this.operateButtonNumber * operateItemWidth;
    },
    internalColumns() {
      let columns = [...this.columns];
      if (this.draggable) {
        // 不能左固定
        columns.unshift({ value: DRAG_SYMBOL, width: 30 });
      }
      if (this.showOperateButton) {
        columns.push({ value: ACTION_SYMBOL, width: this.operateColumnWidth, fixed: 'right' });
      }
      return columns;
    },
    addButtonPositionIsRow() {
      return this.addButtonPosition === 'row';
    },
  },
  data() {
    return {
      DRAG_SYMBOL,
      ACTION_SYMBOL,
      operateButtonNumber: 1,
    };
  },
  created() {
    this.calcOperateButtonNum();
  },
  methods: {
    calcOperateButtonNum() {
      if (this.showEditButton) {
        this.operateButtonNumber++;
      }
      if (this.addButtonPositionIsRow) {
        this.operateButtonNumber++;
      }
    },
    async add(index, isautoAddOneRow) {
      let addObj = null;
      if (!isautoAddOneRow) {
        if (this.beforeAdd) {
          addObj = await new Promise((resolve) => {
            this.beforeAdd(resolve);
          });
        }
      }
      // 当前行下添加
      if (index !== undefined) {
        const insertIndex = typeof index === 'number' ? index + 1 : this.internalValue.length;
        this.internalValue.splice(insertIndex, 0, addObj || structuredClone(this.template));
      } else {
        // 末尾添加
        this.internalValue.push(addObj || structuredClone(this.template));
        this.$nextTick(() => {
          this.$refs.jlTableRef?.scrollToBottom();
        });
      }
    },
    validate(callback) {
      return this.$refs.jlTableRef?.validate(callback);
    },
    handleEdit(row) {
      this.$emit('edit', row);
    },
    remove(index) {
      return this.optionTableFormMixin_remove(index);
    },
  },
};
</script>

<style scoped lang="scss">
@import '@jl/web-ui/src/style/components/business/option-table-form.scss';
.jl-business-option-form {
  --row-gap: 6px;
  --column-gap: 10px;
  height: 100%;
  .option-form-container {
    overflow: auto;
    height: 100%;
    scroll-behavior: smooth;
  }
}
</style>
