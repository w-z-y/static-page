<template>
  <!-- 当表格高度不固定时，列表数据动态增加，会出现表头闪烁，需要将 height 设置为null -->
  <component
    ref="tableFormRef"
    class="jl-table overflow-hidden h-full"
    :is="verifiy ? 'el-form' : 'div'"
    :class="{ 'table-is-single-selection': !multiple }"
    :validate-on-rule-change="false"
    :model="formMixin_formData"
    :rules="formMixin_formRules"
    :style="{ height }">
    <component
      :is="isVirtual ? 'virtual-scroll' : 'div'"
      :data="isVirtual ? data : undefined"
      :key-prop="rowKey"
      :item-size="itemSize"
      :style="{ height: containerHeight }"
      @change="(virtualList) => (tableData = virtualList)">
      <el-table
        ref="myTableRef"
        v-bind="$attrs"
        v-on="$listeners"
        :header-row-class-name="internalHeaderRowClassName"
        :row-class-name="internalRowClassName"
        :key="sortableMixin_tableKey"
        :hasNO="false"
        :height="height ? '100%' : null"
        :default-expand-all="defaultExpandAll"
        :data="isVirtual ? tableData : data"
        :row-key="rowKey"
        :tree-props="defaultTreeProps"
        :summary-method="summaryMethod ? (params) => summaryMethod({ ...params, data }) : null"
        @row-click="handleRowClick"
        @select="selectionMixin_handleSelectOne"
        @select-all="selectionMixin_handleSelectAll"
        @sort-change="handleSortChange">
        <template #empty>
          <jl-empty :image-size="100"></jl-empty>
        </template>
        <!-- default 插槽 -->
        <slot>
          <template v-for="(columnItem, columnIndex) in visibleColumns">
            <jl-table-column :column="columnItem" :multiple="multiple">
              <template #header="{ column, $index }">
                <!-- header 插槽 -->
                <slot name="header" v-bind="{ column, $index }">
                  <span v-if="column.required" style="color: var(--jl-danger)">*</span>
                  <jl-tooltip :rows="1">{{ column.label }}</jl-tooltip>
                </slot>
              </template>
              <template #default="{ row, column, $index }">
                <!-- cell 插槽 -->
                <slot name="cell" v-bind="{ row, column, cell: cellValue(row, column), $index }">
                  <template v-if="column.type || column.component">
                    <el-form-item v-if="verifiy" :prop="`${column.value}-${$index}`">
                      <jl-dynamic-component @click.native.stop v-model="row[column.value]" :data="row" :option="column"> </jl-dynamic-component>
                    </el-form-item>
                    <template v-else>
                      <jl-dynamic-component @click.native.stop v-model="row[column.value]" :data="row" :option="column"> </jl-dynamic-component>
                    </template>
                  </template>
                  <span v-else>
                    <jl-tooltip v-if="showOverflowTooltip" :rows="showOverflowTooltip.rows || 1">
                      {{ cellValue(row, column) }}
                    </jl-tooltip>
                    <template v-else>
                      {{ cellValue(row, column) }}
                    </template>
                  </span>
                </slot>
              </template>
            </jl-table-column>
          </template>
        </slot>
        <template #append>
          <!-- append 插槽 -->
          <slot name="append"></slot>
        </template>
      </el-table>
    </component>

    <jl-pagination
      v-if="pagination"
      :total="pagination[defaultProps.total]"
      :current-page.sync="pagination[defaultProps.currentPage]"
      :page-size.sync="pagination[defaultProps.pageSize]"
      :page-sizes="pageSizes"
      @page="handlePagination"
      background
      class="pagination"></jl-pagination>
  </component>
</template>

<script>
import createVue from '@jl/web-ui/src/createVue';
// config
import COM_PREFIX from '@jl/web-ui/src/config';
// util
import merge from '@jl/web-ui/src/util/merge';
// mixin
import modelMixin from '@jl/web-ui/src/mixin/model';
import tableMixin from './src/mixins/table';
import sortableMixin from './src/mixins/sortable';
import selectionMixin from './src/mixins/selection';
import formMixin from './src/mixins/form';
// component
import JlEmpty from '../Empty';
import JlTooltip from '../Tooltip';
import JlDynamicComponent from '../DynamicComponent';
import JlPagination from './src/components/pagination.vue';
import JlTableColumn from './src/components/column.vue';
import virtualScroll from './src/components/virtual-scroll.vue';

const DEFAULT_TREE_PROPS = {
  children: 'children',
  hasChildren: 'hasChildren',
};

const SORT_ORDER = {
  descending: 'desc',
  ascending: 'asc',
};

export default createVue({
  inheritAttrs: false,
  defaultProps: true,
  name: COM_PREFIX + 'Table',
  mixins: [modelMixin, tableMixin, sortableMixin, selectionMixin, formMixin],
  components: { JlEmpty, JlTooltip, JlDynamicComponent, virtualScroll, JlPagination, JlTableColumn },
  props: {
    /*
        常用
    */
    // 绑定数据
    data: { type: Array, default: () => [] },
    // 列配置
    columns: { type: Array, default: () => [] },
    // 表格高度
    height: { type: [String, Number], default: null },
    // 是否分页
    pagination: { type: Object, default: () => null },
    // 超出省略，支持配置多行 rows: n
    showOverflowTooltip: { type: [Boolean, Object], default: false },
    /*
        其他配置
    */
    /* 排序相关 */
    // 开启列拖拽排序:
    //      true  为开启一级表头拖拽
    //      TODO: number则开启对应层级的表头拖拽（如：1 就是只能拖拽1级表头排序）
    //      TODO: array, [2, 3]表示，只能拖拽2,3级的表头, 1级禁用
    sortableColumn: { type: [Boolean, Number, Array], default: false },
    sortableRow: { type: Boolean, default: false },
    // 分页配置
    pageSizes: { type: Array },
    /* 虚拟列表相关 */
    // 虚拟列表项大概高度
    itemSize: { type: Number, default: 40 },
    // key映射
    rowKey: { type: [Function, String] }, // 虚拟滚动需要
    // 是否开启虚拟列表
    isVirtual: { type: Boolean, default: false },
    // 多选绑定的值, 外部 v-model 使用
    value: { type: Array, default: () => [] },
    // 是否: 行点击选中
    selectOnRowClick: { type: Boolean, default: false },
    // 是否多选(false时，为单选)
    multiple: { type: Boolean, default: true },
    // 树模式下key映射
    treeProps: { type: Object, default: () => DEFAULT_TREE_PROPS },
    // 行类名
    headerRowClassName: { type: [Function, String], default: '' },
    rowClassName: { type: [Function, String], default: '' },
    // 展开行默认展开全部
    defaultExpandAll: { type: Boolean, default: false },
    // 合并单元格方法
    summaryMethod: { type: Function, default: null },
    // 开启校验功能(form)
    verifiy: { type: Boolean, default: false },
  },
  provide() {
    return { isVirtual: this.isVirtual };
  },
  computed: {
    visibleColumns() {
      return this.columns.filter((option) => option.visible !== false);
    },
    containerHeight() {
      return this.height ? (this.pagination ? 'calc(100% - 40px)' : '100%') : null;
    },
    defaultTreeProps() {
      return merge({ ...DEFAULT_TREE_PROPS }, this.treeProps || {});
    },
    cellValue() {
      return (row, column) => {
        return column.formatter ? column.formatter(row[column.value], row) : row[column.value];
      };
    },
    columnKey() {
      return (column) => {
        return column.keyValue || column.value;
      };
    },
  },
  data() {
    return {
      tableData: [],
      isExpandAll: this.defaultExpandAll,

      tempSelection: [],
      // tempFormData: {},
    };
  },
  watch: {
    data: {
      handler() {
        !this.isVirtual && this.selectionMixin_initSelection();
      },
    },
  },
  activated() {
    this.doLayout();
  },
  methods: {
    handleRowClick(row) {
      if (this.selectOnRowClick) {
        this.selectionMixin_handleSelectOne([], row);
      }
    },
    // form 表单校验
    validate(callback) {
      return this.$refs.tableFormRef.validate(callback);
    },
    async doLayout() {
      await this.$nextTick();
      this.getTableRef()?.doLayout?.();
    },
    getTableRef() {
      return this.$refs.myTableRef;
    },
    // 只支持非虚拟列表
    scrollToBottom() {
      if (!this.isVirtual) {
        const scrollContainer = this.getTableRef().$el.querySelector('.el-table__body-wrapper');
        scrollContainer.style['scroll-behavior'] = 'smooth';
        scrollContainer.scrollTo(scrollContainer.scrollLeft, scrollContainer.scrollHeight);
        scrollContainer.style.removeProperty('scroll-behavior');
      }
    },
    internalHeaderRowClassName({ row, rowIndex }) {
      let className = ['jl-table-header-row'];
      if (this.headerRowClassName) {
        if (typeof this.headerRowClassName === 'function') {
          className.push(this.headerRowClassName({ row, rowIndex }));
        } else {
          className.push(this.headerRowClassName);
        }
      }
      return className.join(' ');
    },
    internalRowClassName({ row, rowIndex }) {
      let className = ['jl-table-row'];
      if (this.rowClassName) {
        if (typeof this.rowClassName === 'function') {
          className.push(this.rowClassName({ row, rowIndex }));
        } else {
          className.push(this.rowClassName);
        }
      }
      if (row[this.defaultTreeProps.children]?.length || row[this.defaultTreeProps.hasChildren]) {
        // 展开行根行添加root-row类名
        className.push('root-row');
      }
      return className.join(' ');
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
    // 切换分页
    handlePagination(...arg) {
      this.$emit('page', ...arg);
    },
    // 获取绑定rowKey对应行数据的值
    getValueByRowKey(row) {
      if (typeof this.rowKey === 'function') {
        return this.rowKey(row);
      }
      return row[this.rowKey];
    },
    // 清空勾选
    clearSelection() {
      this.internalValue = [];
      this.getTableRef().clearSelection();
    },
    // 排序
    handleSortChange({ column, prop: propName, order: orderType }) {
      const order = SORT_ORDER[orderType] || '';
      const prop = order ? propName : '';
      this.$emit('sort', { column, prop, order });
    },
  },
  mounted() {
    !this.isVirtual && this.doLayout();
  },
});
</script>

<style lang="scss" scoped>
@use './src/style/index.scss';
</style>
