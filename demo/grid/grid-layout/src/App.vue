<template>
  <div id="app">
    <el-button @click="handleAddNode">添加节点</el-button>
    A3
    <div class="a3-paper">
      <MyGridLayout style="flex:1" v-model="layout" ref="myGridLayoutRef">
        <template #default="{ data }">
          <!-- {{ data }} -->
          {{ data.i }}
        </template>
      </MyGridLayout>
    </div>
  </div>
</template>

<script>
import MyGridLayout from './components/GridLayout.vue'

export default {
  name: 'App',
  components: {
    MyGridLayout
  },
  data() {
    return {
      layout: [
        { x: 0, y: 0, w: 12, h: 4, i: '0', data: {} },
        { x: 0, y: 4, w: 12, h: 4, i: '1', data: {} },
        { x: 0, y: 8, w: 12, h: 4, i: '2', data: {} },
        { x: 12, y: 8, w: 4, h: 8, i: '3', data: {} },
      ],
    }
  },
  methods: {
    handleAddNode() {
      this.$refs.myGridLayoutRef.addItem({})
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

.a3-paper {
  height: 297mm;
  width: 420mm;
  border: 1px solid;
  padding: 20mm 25mm;
  display: flex;
}
</style>
