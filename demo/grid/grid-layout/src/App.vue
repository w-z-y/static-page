<template>
  <div id="app">
    <HelloWorld :layout="layout" />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
      layout: [
        { x: 0, y: 0, w: 1, h: 1, i: '0', data: {} },
        { x: 4, y: 0, w: 4, h: 4, i: '1', data: {} },
        { x: 20, y: 13, w: 4, h: 4, i: '2', data: {} },
        { x: 0, y: 8, w: 14, h: 8, i: '3', data: {} },
      ],
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
