<template>
  <grid-layout class="grid-layout" prevent-collision :margin="margin" :layout="layout" :col-num="gridLayoutCols"
    :row-height="rowHeight" :max-rows="gridLayoutRows" is-draggable is-bounded is-resizable :vertical-compact="false"
    :auto-size="false">
    <grid-item is-bounded v-for="item in layout" :key="item.i" :x="item.x" :y="item.y" :w="item.w" :h="item.h"
      :i="item.i" :class="['grid-item', { 'highlight': item.i == -1 }]" drag-allow-from=".vue-draggable-handle"
      drag-ignore-from=".no-drag" @click="handleClick(item)">
      <div class="content">
        <i class="vue-draggable-handle el-icon-rank">
        </i>
        <div class="no-drag">
          {{ gridLayoutRows }} x {{ gridLayoutCols }}
          <span>{{ item.i }}</span>
          <br />
          <button @click="$emit('add-item', item.data)"><i class="el-icon-plus"></i> click</button>
        </div>
      </div>
    </grid-item>
  </grid-layout>
</template>

<script>
import { GridLayout, GridItem } from 'vue-grid-layout'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    'grid-layout': GridLayout,
    'grid-item': GridItem
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
