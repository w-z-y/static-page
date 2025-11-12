<template>
  <Markdown.Tokens class="jl-markdown" :tokens="tokens" v-on="$listeners">
    <template #default="{ token }">
      <slot :token="token"></slot>
    </template>
  </Markdown.Tokens>
</template>

<script>
import COM_PREFIX from '@jl/web-ui/src/config';
import marked from 'marked';
import { processChineseContent } from './src/utils/index';
import MarkdownTokens from './src/components/Tokens.vue';
import footnoteExtension from './src/extension/footnote';
import katexExtension from './src/extension/katex';
import detailsExtension from './src/extension/details';
// import interpolationExtension from './src/extension/interpolation';

const options = {
  throwOnError: false,
  breaks: true,
};
marked.setOptions(options);
marked.use(footnoteExtension(options));
marked.use(katexExtension(options));
marked.use(detailsExtension(options));
// 插值表达式
// marked.use(interpolationExtension(options));

export default {
  name: COM_PREFIX + 'Ai.Markdown',
  components: {
    'Markdown.Tokens': MarkdownTokens,
  },
  props: {
    data: {
      type: String,
      default: '',
    },
  },
  computed: {
    tokens() {
      const tokens = marked.lexer(processChineseContent(this.data));
      // console.log('tokens', tokens);
      return tokens;
    },
  },
};
</script>

<style scoped lang="scss">
@use './src/styles/index.scss';
</style>
