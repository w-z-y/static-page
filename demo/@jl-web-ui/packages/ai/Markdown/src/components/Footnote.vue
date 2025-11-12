<template>
  <span class="markdown-footnote">
    <slot>
      <span class="footnote" :data-footnote="token.text">{{ token.text }}</span>
    </slot>
  </span>
</template>

<script>
export default {
  name: 'Markdown.Footnote',
  props: {
    token: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    handleNodeClick(token) {
      this.$emit('node-click', token);
    },
  },
};
</script>

<style scoped lang="scss">
@use '../styles/footnote.scss';
</style>
