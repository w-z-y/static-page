<template>
    <grid-layout class="grid-layout" :use-css-transforms="false" :margin="margin" :layout="layout" :col-num="colNum"
        :row-height="rowHeight" :max-rows="rowNum" is-draggable is-resizable :vertical-compact="false"
        :auto-size="false" :style="{
            background: `radial-gradient(circle at ${margin[0] / 2}px ${margin[1] / 2}px, #333 0px, transparent 1px)`,
            'background-size': `${rowHeight + margin[0] + 0.5}px ${rowHeight + margin[1]}px`,
        }">
        <!-- {{ colNum }} x {{ rowNum }} -->
        <grid-item is-bounded v-for="item in layout" :key="item.i" :x="item.x" :y="item.y" :w="item.w" :h="item.h"
            :i="item.i" :class="['grid-item', { 'highlight': item.i == -1 }]" drag-allow-from=".vue-draggable-handle"
            @click.native="handleClick(item)">
            <i class="left-move-icon vue-draggable-handle el-icon-rank">
            </i>
            <div class="right-more-icon">
                <i class="el-icon-location-information" @click.stop="removeItem(item.i)">
                </i>
                <i class="el-icon-edit-outline" @click.stop="removeItem(item.i)">
                </i>
                <i class="delete-icon el-icon-delete" @click.stop="removeItem(item.i)">
                </i>
            </div>
            <slot :data="item.data"></slot>
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
        },
        colNum: {
            type: Number,
            default: 24
        },
    },
    components: {
        'grid-layout': GridLayout,
        'grid-item': GridItem
    },
    data() {
        return {
            rowHeight: 0,
            rowNum: Infinity,
            margin: [10, 10],
        }
    },
    methods: {
        addItem(data = {}) {
            const { w = 1, h = 1 } = data
            console.log(this.layout, data, w, h)
            const grid = layoutFill(this.layout, this.rowNum, this.colNum);
            const foundMaxEmpty = findItemEmptyRegion(grid, this.rowNum, this.colNum, { w, h })
            if (foundMaxEmpty) {
                const { x, y, w, h } = foundMaxEmpty
                this.$emit('change', [...this.layout, { x, y, w: data.w || w, h: data.h || h, i: this.layout.length, data }])
                return true
            } else {
                const foundEmpty = findEmptyRegion(grid, this.rowNum, this.colNum,)
                if (foundEmpty) {
                    const { x, y, w, h } = foundEmpty
                    this.$emit('change', [...this.layout, { x, y, w, h, i: this.layout.length, data }])
                    return true
                } else {
                    this.$message.warning('无法找到合适的空白位置');
                    return false
                }
            }
        },
        handleClick(data) {
            this.$emit('item-click', data)
        },
        removeItem(itemId) {
            this.$emit('change', this.layout.filter(item => item.i !== itemId));
        }
    },
    mounted() {
        this.rowHeight = Math.floor(document.querySelector('.grid-layout').clientWidth / this.colNum) - this.margin[0]
        this.rowNum = Math.floor((document.querySelector('.grid-layout').clientHeight) / (this.rowHeight + this.margin[1]))
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
@import './index.scss';
</style>