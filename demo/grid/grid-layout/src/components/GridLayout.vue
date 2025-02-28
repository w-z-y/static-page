<template>
  <grid-layout class="grid-layout" prevent-collision :margin="margin" :layout="layout" :col-num="gridLayoutCols"
    :row-height="rowHeight" :max-rows="gridLayoutRows" is-draggable is-bounded is-resizable :vertical-compact="false"
    :auto-size="false">
    <grid-item is-bounded v-for="item in layout" :key="item.i" :x="item.x" :y="item.y" :w="item.w" :h="item.h"
      :i="item.i" :class="['grid-item', { 'highlight': item.i == -1 }]" drag-allow-from=".vue-draggable-handle"
      drag-ignore-from=".no-drag" @click.native="handleClick(item)">
      <!-- {{ gridLayoutCols }} x {{ gridLayoutRows }} -->
      <div class="content">
        <i class="vue-draggable-handle el-icon-rank">
        </i>
        <div class="no-drag">
          <slot :data="item.data"></slot>
        </div>
      </div>
    </grid-item>
  </grid-layout>
</template>

<script>
import { GridLayout, GridItem } from 'vue-grid-layout'
export default {
  name: "MyGridLayout",
  model: {
    prop: 'layout',
    event: 'change'
  },
  props: {
    layout: {
      type: Array,
      defualt: () => []
    }
  },
  components: {
    'grid-layout': GridLayout,
    'grid-item': GridItem
  },
  data() {
    return {
      rowHeight: 0,
      gridLayoutCols: 24,
      gridLayoutRows: Infinity,
      margin: [10, 10],
    }
  },
  computed: {
    newItem() {
      return {
        w: this.gridLayoutCols / 2,
        h: this.gridLayoutCols / 6
      }
    }
  },
  methods: {
    addItem(data = {}) {
      const grid = layoutFill(this.layout, this.gridLayoutRows, this.gridLayoutCols);
      const foundMaxEmpty = findItemEmptyRegion(grid, this.gridLayoutRows, this.gridLayoutCols, this.newItem)
      if (foundMaxEmpty) {
        const { x, y, w, h } = foundMaxEmpty
        this.$emit('change', [...this.layout, { x, y, w: data.w || w, h: data.h || h, i: this.layout.length, data }])
        // this.layout.push({ x, y, w, h, i: this.layout.length, data });
        return true
      } else {
        const foundEmpty = findEmptyRegion(grid, this.gridLayoutRows, this.gridLayoutCols,)
        if (foundEmpty) {
          const { x, y, w, h } = foundEmpty
          this.$emit('change', [...this.layout, { x, y, w: data.w || w, h: data.h || h, i: this.layout.length, data }])
          // this.layout.push({ x, y, w, h, i: this.layout.length, data });
          return true
        } else {
          console.warn('无法找到合适的空白位置');
          return false
        }
      }
    },
    handleClick(data) {
      console.log(data)
      this.$emit('click', data)
    }
  },
  mounted() {
    this.rowHeight = Math.floor(document.querySelector('.grid-layout').clientWidth / this.gridLayoutCols) - this.margin[0]
    this.gridLayoutRows = Math.floor((document.querySelector('.grid-layout').clientHeight) / (this.rowHeight + this.margin[1]))
  }
}

function layoutFill(layout, rows, cols) {
  const grid = Array.from({ length: rows }, () => Array(cols).fill(false));
  layout.forEach(({ x, y, w, h }) => {
    for (let i = y; i < y + h; i++) {
      for (let j = x; j < x + w; j++) {
        if (i < rows && j < cols) {
          grid[i][j] = true;
        }
      }
    }
  });
  return grid;
}

function findItemEmptyRegion(grid, rows, cols, item) {
  console.log(item)
  for (let x = 0; x <= cols - item.w; x++) {
    for (let y = 0; y < rows - item.h; y++) {
      let canPlace = true;
      let i = 0;
      while (i < item.h && canPlace) {
        let j = 0;
        while (j < item.w) {
          if (grid[y + i] && grid[y + i][x + j]) {
            canPlace = false;
            break;
          }
          j++;
        }
        i++;
      }
      if (canPlace) {
        return { x: x, y: y, w: item.w, h: item.h };
      }
    }
  }
  return null;
}

function findEmptyRegion(grid, rows, cols) {
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      if (!grid[y][x]) {
        let width = 0;
        let height = 0;
        while (x + width < cols && !grid[y][x + width]) {
          width++;
        }
        while (y + height < rows && !grid[y + height].slice(x, x + width).some(cell => cell)) {
          height++;
        }
        return { x, y, w: width, h: height };
      }
    }
  }
  return null;
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// .grid-layout{
// }
.grid-item {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 10px;
  touch-action: none;
  box-sizing: border-box;
}

.grid-item .content {
  font-size: 24px;
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 100%;
  width: 100%;
}

.grid-item .content .vue-draggable-handle {
  display: none;
  position: absolute;
  width: 20px;
  height: 20px;
  top: 0;
  left: 0;
  padding: 0 8px 8px 0;
  background-origin: content-box;
  box-sizing: border-box;
  border-radius: 10px;
  cursor: move;
}

.grid-item:hover .content .vue-draggable-handle {
  display: block;
}

.grid-item .content .no-drag {
  height: 100%;
  width: 100%;
}
</style>
