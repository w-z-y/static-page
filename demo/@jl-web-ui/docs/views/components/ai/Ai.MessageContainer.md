# Ai.MessageContainer Ai消息容器

## 基本用法

::: demo

```vue
<template>
  <jl-ai.message-container style="height: 400px">
    <div class="content">{{content}}</div>
  </jl-ai.message-container>
</template>

<script>
const emojis = ['😀', '😂', '🥰', '😎', '🤔', '🙌', '🎉', '🚀', '🌟', '🔥'];
export default {
  data(){
    return {
      content: Array.from({length: 800}, () => emojis[Math.floor(Math.random() * emojis.length)]).join("")
    }
  },
  mounted(){
    setInterval(() => {
      this.content += emojis[Math.floor(Math.random() * emojis.length)];
      this.content += emojis[Math.floor(Math.random() * emojis.length)];
    }, 100)
  }
}
</script>

<style>
.content {
  word-break: break-word;
}
</style>
```

:::
