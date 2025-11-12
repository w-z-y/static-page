<template>
  <div class="markdown-html" v-html="html"></div>
</template>

<script>
// 防止xss攻击
import DOMPurify from 'dompurify';
export default {
  name: 'MyComponent',
  props: {
    token: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    html() {
      if (this.token.type === 'html' && this.token?.text) {
        return DOMPurify.sanitize(this.token.text);
      } else {
        return null;
      }
    },
  },
};
</script>

<style scoped lang="scss"></style>
