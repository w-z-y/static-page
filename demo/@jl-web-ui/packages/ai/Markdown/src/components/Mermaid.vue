<template>
  <pre v-if="mermaid" class="mermaid">{{ code }}</pre>
</template>

<script>
import { loadCDN } from '@jl/web-ui/src/util';
import { MERMAID } from '@jl/web-ui/src/constant/cdn';

export default {
  name: 'Markdown.Mermaid',
  props: {
    code: {
      type: String,
      default: '',
    },
    isEnd: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      mermaid: null,
    };
  },
  async mounted() {
    await this.loadMermaid();
    this.renderMermaid();
  },
  watch: {
    code() {
      if (this.mermaid) {
        this.renderMermaid();
      }
    },
  },
  methods: {
    async loadMermaid() {
      try {
        await loadCDN(MERMAID);
        this.mermaid = window.mermaid;
      } catch (e) {
        console.error('mermaid加载失败', e);
      }
    },
    renderMermaid() {
      if (!this.mermaid) return;
      // 初始化 mermaid
      this.mermaid.initialize({ startOnLoad: false });
      // 渲染当前 mermaid 代码
      this.$nextTick(() => {
        try {
          this.mermaid.render('mermaid' + Date.now(), this.code, (svgCode) => {
            this.$el.innerHTML = svgCode;
          });
        } catch (e) {
          this.$el.innerText = 'Mermaid 语法错误:\n' + e.message;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.mermaid {
}
</style>
