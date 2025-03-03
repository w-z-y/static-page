<template>
  <div>
    <el-popover placement="bottom-start" width="512" v-model="visible" :visible-arrow="false" transition="0">
      <div @mouseleave="handleMouseleave" @click="handleClick">
        <div class="table-row" v-for="i in 8" :key="i">
          <div class="table-cell" v-for="j in 24" :key="i + '-' + j" @mouseenter="handleMouseenter(i, j)" :class="{
            'is-active': i <= hoverCell.y && j <= hoverCell.x
          }">
          </div>
        </div>
      </div>
      <template slot="reference">
        <slot></slot>
      </template>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: 'MyInsertTableSelect',
  data() {
    return {
      visible: false,
      hoverCell: {
        x: 0,
        y: 0
      }
    }
  },
  methods: {
    handleMouseenter(i, j) {
      this.hoverCell.x = j
      this.hoverCell.y = i
    },
    handleMouseleave() {
      this.hoverCell.x = 0
      this.hoverCell.y = 0
    },
    handleClick() {
      this.visible = false
      const { x, y } = this.hoverCell
      this.$emit('select', { w: x, h: y })
    }
  }
}
</script>

<style scoped lang="scss">
.table-row {
  --gap: 3px;
  display: flex;
  gap: var(--gap);

  &:not(:last-child) {
    margin-bottom: var(--gap);
  }

  .table-cell {
    border: 1px solid #000;
    width: 16px;
    height: 16px;
    flex-shrink: 0;

    &.is-active {
      background-color: #f9b88b;
    }
  }
}
</style>