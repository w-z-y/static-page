<template>
  <jl-ai.message-container class="markdown-table-wrapper" hiddenScrollBar :class="{ 'is-expand': isExpand }">
    <table>
      <thead>
        <tr class="">
          <th v-for="header in token.header" scope="col">
            <div>
              <Markdown.InlineTokens :tokens="header.tokens" />
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in token.rows">
          <td v-for="cell in row">
            <div class="break-normal">
              <Markdown.InlineTokens :tokens="cell.tokens" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <template #footer="{ hasScrollbar }">
      <!-- 可以让 BubbleList 容器检测元素变化，从而 MutationObserver 重新计算 -->
      <span v-if="isExpand"></span>
      <jl-icon.hover
        v-if="hasScrollbar || isExpand"
        bg-color="var(--jl-icon-background-color-hover)"
        :icon="isExpand ? 'angle-up' : 'angle-down'"
        :content="(isExpand ? '收起' : '展开') + '表格'"
        text
        @click="handleTriggerExpand">
      </jl-icon.hover>
    </template>
  </jl-ai.message-container>
</template>

<script>
import InlineTokens from './InlineTokens.vue';
import JlAiMessageContainer from '../../../MessageContainer/index.vue';
import JlIconHover from '../../../../base/Icon/hover/index.vue';
export default {
  name: 'Markdown.Table',
  components: {
    'Markdown.InlineTokens': InlineTokens,
    'jl-ai.message-container': JlAiMessageContainer,
    'jl-icon.hover': JlIconHover,
  },
  props: {
    token: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isExpand: false,
    };
  },
  methods: {
    handleTriggerExpand() {
      this.isExpand = !this.isExpand;
    },
  },
};
</script>

<style scoped lang="scss">
@use '../styles/table.scss';
</style>
