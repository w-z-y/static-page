<template>
  <span class="markdown-katex-renderer" v-html="renderedContent"></span>
</template>

<script>
import katex from 'katex';
export default {
  name: 'Markdown.KatexRenderer',
  props: {
    content: {
      type: String,
      default: '',
    },
    displayMode: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    renderedContent() {
      return katex.renderToString(this.content, { displayMode: this.displayMode, throwOnError: false });
    },
  },
};
</script>

<style scoped lang="scss"></style>
