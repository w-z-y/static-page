<template>
  <jl-resizer class="jl-business-card-list" @resize="handleResize" :style="{ gap: internalGap }">
    <div :style="{ gap: internalGap }" v-for="(col, colIdx) in internalColumns" :key="colIdx" class="jl-business-card-list-wrapper__column">
      <jl-card v-for="(item, idx) in col" :border="false" :key="idx" v-bind="item">
        <slot :item="item"></slot>
      </jl-card>
    </div>
  </jl-resizer>
</template>

<script>
import createVue from '@jl/web-ui/src/createVue';
import JlCard from '../../base/Card';
import JlResizer from '../../base/Resizer';
import { handlePxValue } from '@jl/web-ui/src/util';

// 将数据分组
function splitIntoColumns(arr, colCount) {
  if (!Array.isArray(arr)) return Array.from({ length: colCount }, () => []);
  const columns = Array.from({ length: colCount }, () => []);
  arr.forEach((item, idx) => {
    columns[idx % colCount].push(item);
  });
  return columns;
}

// 默认配置
const defaultColumns = [
  { minWidth: 0, columns: 2 },
  { minWidth: 840, columns: 3 },
  { minWidth: 1100, columns: 4 },
];

export default createVue({
  name: 'Business.CardList',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    gap: { type: [Number, String, Array], default: 8 },
    columns: {
      type: [Number, Array],
      default: () => defaultColumns,
    },
  },
  components: {
    JlCard,
    JlResizer,
  },
  computed: {
    internalGap() {
      return handlePxValue(this.gap);
    },
    internalColumns() {
      return splitIntoColumns(this.items, this.colCount);
    },
    userColConfig() {
      // 支持数字（固定列）或数组（响应式配置）
      if (typeof this.columns === 'number') {
        return this.columns;
      }
      if (Array.isArray(this.columns) && this.columns.length > 0) {
        return this.columns.slice();
      }
      return null;
    },
  },
  data() {
    return {
      colCount: 4, // 当前有效列数
    };
  },
  methods: {
    handleResize({ width }) {
      if (typeof this.userColConfig === 'number' && this.userColConfig > 0) {
        this.colCount = this.userColConfig;
        return;
      }
      const breakpoints = Array.isArray(this.userColConfig) ? this.userColConfig : defaultColumns;
      // 确保breakpoints按minWidth升序
      const sorted = breakpoints.slice().sort((a, b) => a.minWidth - b.minWidth);

      let matchedCols = sorted[0]?.columns || 2;
      for (let i = 0; i < sorted.length; ++i) {
        if (width >= sorted[i].minWidth) {
          matchedCols = sorted[i].columns;
        } else {
          break;
        }
      }
      this.colCount = matchedCols;
    },
  },
  mounted() {
    // Set initial columns count based on initial size if possible
    this.$nextTick(() => {
      const container = this.$el;
      if (container && container.offsetWidth) {
        this.handleResize({ width: container.offsetWidth });
      }
    });
  },
});
</script>

<style scoped lang="scss">
.jl-business-card-list {
  background-color: #f2f2f6;
  padding: 20px;
  display: flex;
  .jl-business-card-list-wrapper__column {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
    ::v-deep .jl-card {
      margin: 0;
    }
  }
}
</style>
