<script setup>
import { ref } from 'vue'
import * as Y from 'yjs';
import { WebsocketProvider } from "y-websocket";

const doc = new Y.Doc();
const text = doc.getText('text')

text.insert(0, 'abc')
text.format(1, 2, { bold: true }) // 拆分成两步操作 [{insert: 'a'}, {insert: 'bc', attributes: {bold: true}}]
text.toString()
text.delete(0, 1) // 会删除第一步操作，[{insert: 'bc', attributes: {bold: true}}]
text.insert(0, 'new') // [{insert: 'new'}, {insert: 'bc', attributes: {bold: true}}]


const provider = new WebsocketProvider(
  "ws://localhost:5173",
  "test",
  doc
);

console.log('text', text.toDelta(),provider);

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >Vue Docs Scaling up Guide</a
    >.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
