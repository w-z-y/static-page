<template>
  <div class="markdown-tokens">
    <template v-for="token in tokens">
      <!-- ✅ -->
      <template v-if="token.type === 'hr'">
        <hr />
      </template>
      <!-- ✅ -->
      <template v-else-if="token.type === 'heading'">
        <component :is="`h${token.depth}`" class="dynamic-element">
          <Markdown.InlineTokens :tokens="token.tokens || []" v-on="$listeners">
            <template #default="{ token }">
              <slot :token="token"></slot>
            </template>
          </Markdown.InlineTokens>
        </component>
      </template>
      <!-- ✅ -->
      <template v-else-if="token.type === 'code'">
        <Markdown.CodeBlock :token="token" :lang="token.lang || ''" :code="token.text || ''"></Markdown.CodeBlock>
      </template>
      <!-- ✅ -->
      <template v-else-if="token.type === 'table'">
        <Markdown.Table :token="token"> </Markdown.Table>
      </template>
      <!-- ✅ -->
      <template v-else-if="token.type === 'blockquote'">
        <blockquote dir="auto">
          <Markdown.Tokens :tokens="token.tokens">
            <template #default="{ token }">
              <slot :token="token"></slot>
            </template>
          </Markdown.Tokens>
        </blockquote>
      </template>
      <!-- ✅ -->
      <template v-else-if="token.type === 'list'">
        <component :is="token.ordered ? 'ol' : 'ul'" :start="token.start || 1" dir="auto">
          <li v-for="item in token.items">
            <template v-if="item.task">
              <input type="checkbox" :checked="item.checked" />
            </template>
            <template>
              <Markdown.InlineTokens :tokens="item.tokens" :top="token.loose">
                <template #default="{ token }">
                  <slot :token="token"></slot>
                </template>
              </Markdown.InlineTokens>
            </template>
          </li>
        </component>
      </template>
      <!-- 🚫 -->
      <template v-else-if="token.type === 'details'">
        <Markdown.Collapse :token="token" />
      </template>
      <!-- ✅ -->
      <template v-else-if="token.type === 'html'">
        <Markdown.HTML :token="token" />
      </template>
      <!-- 🚫 -->
      <template v-else-if="token.type === 'iframe'"></template>
      <!-- ✅ -->
      <template v-else-if="token.type === 'paragraph'">
        <p dir="auto">
          <Markdown.InlineTokens :tokens="token.tokens || []" v-on="$listeners">
            <template #default="{ token }">
              <slot :token="token"></slot>
            </template>
          </Markdown.InlineTokens>
        </p>
      </template>
      <!-- ✅ -->
      <template v-else-if="token.type === 'text'">
        <template v-if="top">
          <p>
            <Markdown.InlineTokens v-if="token.tokens" :tokens="token.tokens" v-on="$listeners">
              <template #default="{ token }">
                <slot :token="token"></slot>
              </template>
            </Markdown.InlineTokens>
            <template v-else>
              {{ unescapeHtml(token.text) }}
            </template>
          </p>
        </template>
        <template v-else-if="token.tokens">
          <Markdown.InlineTokens :tokens="token.tokens" v-on="$listeners">
            <template #default="{ token }">
              <slot :token="token"></slot>
            </template>
          </Markdown.InlineTokens>
        </template>
        <template v-else>
          {{ unescapeHtml(token.text) }}
        </template>
      </template>
      <!-- ✅ -->
      <template v-else-if="token.type === 'inlineKatex'">
        <Markdown.KatexRenderer v-if="token.text" :content="token.text" :displayMode="token.displayMode" />
      </template>
      <!-- ✅ -->
      <template v-else-if="token.type === 'blockKatex'">
        <Markdown.KatexRenderer v-if="token.text" :content="token.text" :displayMode="token.displayMode" />
      </template>
      <!-- ✅ -->
      <template v-else-if="token.type === 'space'">
        <div class="space" />
      </template>
    </template>
  </div>
</template>

<script>
import { unescapeHtml } from '../utils';
import CodeBlock from './CodeBlock';
import InlineTokens from './InlineTokens.vue';
import Table from './Table.vue';
import HTML from './HTML.vue';
import KatexRenderer from './KatexRenderer.vue';
import Collapse from './Collapse.vue';
export default {
  name: 'Markdown.Tokens',
  components: {
    'Markdown.InlineTokens': InlineTokens,
    'Markdown.CodeBlock': CodeBlock,
    'Markdown.Table': Table,
    'Markdown.KatexRenderer': KatexRenderer,
    'Markdown.Collapse': Collapse,
    'Markdown.HTML': HTML,
  },
  props: {
    top: {
      type: Boolean,
      default: true,
    },
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
@use '../styles/tokens.scss';
</style>
