<template>
  <span class="markdown-inline-tokens">
    <template v-for="token in tokens">
      <!-- ✅ -->
      <template v-if="token.type === 'escape'">
        {{ unescapeHtml(token.text) }}
      </template>
      <!-- ✅ -->
      <template v-else-if="token.type === 'html'">
        <Markdown.HTML :token="token" />
      </template>
      <!-- ✅ -->
      <template v-else-if="token.type === 'link'">
        <a v-if="token.tokens" :href="token.href" target="_blank" rel="nofollow" :title="token.title">
          <Markdown.InlineTokens :tokens="token.tokens" />
        </a>
        <a v-else :href="token.href" target="_blank" rel="nofollow" :title="token.title">
          {{ token.text }}
        </a>
      </template>
      <!-- ✅ -->
      <template v-else-if="token.type === 'image'">
        <Markdown.Image :src="token.href" :alt="token.text" preview />
      </template>
      <!-- ✅ -->
      <template v-else-if="token.type === 'strong'">
        <strong><Markdown.InlineTokens :tokens="token.tokens" /></strong>
      </template>
      <!-- ✅ -->
      <template v-else-if="token.type === 'em'">
        <em><Markdown.InlineTokens :tokens="token.tokens" /></em>
      </template>
      <!-- ✅ -->
      <template v-else-if="token.type === 'codespan'">
        <code>{{ unescapeHtml(token.text) }}</code>
      </template>
      <!-- ✅ -->
      <template v-else-if="token.type === 'br'">
        <br />
      </template>
      <!-- ✅ -->
      <template v-else-if="token.type === 'del'">
        <del>
          <Markdown.InlineTokens :tokens="token.tokens" />
        </del>
      </template>
      <!-- ✅ -->
      <template v-else-if="token.type === 'inlineKatex'">
        <Markdown.KatexRenderer v-if="token.text" :content="token.text" :displayMode="token.displayMode" />
      </template>
      <!-- 🚫 -->
      <template v-else-if="token.type === 'iframe'">
        <!-- <iframe :src="" :title="token.fileId" width="100%" frameborder="0"></iframe> -->
      </template>
      <!-- ✅ -->
      <template v-else-if="token.type === 'footnote'">
        <Markdown.Footnote :token="token" v-on="$listeners">
          <slot :token="token"></slot>
        </Markdown.Footnote>
      </template>
      <!-- ✅ -->
      <template v-else-if="token.type === 'text'">
        <Markdown.InlineTokens v-if="token.tokens" :tokens="token.tokens" />
        <template v-else>
          {{ token.raw }}
        </template>
      </template>
    </template>
  </span>
</template>

<script>
import { unescapeHtml } from '../utils';
import Image from '../../../../base/Image';
import Footnote from './Footnote.vue';
import KatexRenderer from './KatexRenderer.vue';
import HTML from './HTML.vue';
export default {
  name: 'Markdown.InlineTokens',
  components: {
    'Markdown.Image': Image,
    'Markdown.Footnote': Footnote,
    'Markdown.KatexRenderer': KatexRenderer,
    'Markdown.HTML': HTML,
  },
  props: {
    tokens: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    unescapeHtml,
  },
};
</script>

<style scoped lang="scss">
@use '../styles/inline-tokens.scss';
</style>
