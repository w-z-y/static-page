<template>
  <details>
    <summary v-if="token.summary">{{ token.summary }}</summary>
    <jl-ai.markdown v-if="token.text" :data="token.text"></jl-ai.markdown>
  </details>
</template>

<script>
export default {
  name: 'Markdown.Collapse',
  components: {
    'jl-ai.markdown': () => import('../../index.vue'),
  },
  props: {
    token: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style scoped lang="scss">
details {
  margin: 1em 0;
  padding: 0.5em 1em;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fafbfc;
}
summary {
  font-weight: bold;
  cursor: pointer;
  outline: none;
}
</style>
