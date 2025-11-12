<template>
  <jl-card class="markdown-echarts">
    <div v-if="isError">
      数据错误，加载失败
      <jl-ai.markdown style="height: 300px; overflow: auto" :data="codeBlock"></jl-ai.markdown>
    </div>
    <jl-eCharts v-else-if="optionParse" :option="optionParse"></jl-eCharts>
  </jl-card>
</template>

<script>
import { parseNonStandardJSON } from '../utils';
import JlCard from '../../../../base/Card';
import JlECharts from '../../../../base/Echarts/index.vue';
import JlAiMarkdown from '../../index.vue';

export default {
  name: 'Markdown.Echarts',
  components: {
    JlCard,
    JlECharts,
    'jl-ai.markdown': JlAiMarkdown,
  },

  props: {
    code: {
      type: String,
      default: '',
    },
  },
  computed: {
    optionParse() {
      try {
        return parseNonStandardJSON(this.code);
      } catch (e) {
        Promise.reject(e, this.code);
        this.isError = true;
        return null;
      }
    },
    codeBlock() {
      return '```json\n' + this.code + '\n```';
    },
  },
  data() {
    return {
      isError: false,
    };
  },
};
</script>

<style scoped lang="scss"></style>
