<template>
  <div class="markdown-code-block">
    <template v-if="customLang.includes(lang)">
      <template v-if="codeBlockStatus === STATUS.PENDING">
        <div v-loading="true" style="height: 200px" element-loading-text="图表生成中"></div>
      </template>
      <template v-else>
        <template v-if="lang === 'echarts'">
          <Markdown.Echarts :code="code" :is-end="codeBlockStatus === STATUS.END" />
        </template>
        <template v-else-if="lang === 'mermaid'">
          <Markdown.Mermaid :code="code" :is-end="codeBlockStatus === STATUS.END" />
        </template>
      </template>
    </template>
    <template v-else>
      <pre class="hljs" :class="[`language-${internalLang}`]"><code v-html="internalCode"></code></pre>
    </template>
  </div>
</template>

<script>
import 'highlight.js/scss/github.scss';
import hljs from 'highlight.js';
import Echarts from './Echarts';
import Mermaid from './Mermaid';

const STATUS = {
  PENDING: 'pending',
  END: 'end',
};

export default {
  name: 'Markdown.CodeBlock',
  components: {
    'Markdown.Echarts': Echarts,
    'Markdown.Mermaid': Mermaid,
  },
  props: {
    token: {
      type: Object,
      default: () => {},
    },
    lang: {
      type: String,
      default: '',
    },
    code: {
      type: String,
      default: '',
    },
  },
  computed: {
    internalLang() {
      if (!this.lang || !hljs.getLanguage(this.lang)) {
        return 'text';
      }
      return this.lang;
    },
    internalCode() {
      return hljs.highlight(this.code, { language: this.internalLang }).value;
    },
    codeBlockStatus() {
      const code = this.token.raw || '';
      const fenceEnd = code.match(/^```$/m) && code.trim().endsWith('```');
      if (!fenceEnd) {
        return STATUS.PENDING;
      }
      return STATUS.END;
    },
  },
  data() {
    return {
      STATUS,
      customLang: ['echarts', 'mermaid'],
    };
  },
};
</script>

<style scoped lang="scss">
@use '../styles/code-block.scss';
</style>
