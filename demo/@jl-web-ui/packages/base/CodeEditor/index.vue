<template>
  <div class="jl-code-editor" ref="codeEditorRef"></div>
</template>
<script>
import COM_PREFIX from '@jl/web-ui/src/config';
import modelMixin from '@jl/web-ui/src/mixin/model';
import * as monaco from 'monaco-editor';

export default {
  name: COM_PREFIX + 'CodeEditor',
  mixins: [modelMixin],
  props: {
    lang: {
      type: String,
      default: '',
    },
    suggestions: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    internalValue: {
      handler(newVal) {
        if (this.isInputing) return;

        console.log('newVal', newVal);
        if (this.monacoEditor) {
          this.monacoEditor.setValue(newVal);
        }
      },
      immediate: true,
    },
  },
  data() {
    return {
      isInputing: false,
      monacoEditor: null,
      completionProviderDisposable: null,
      resizeObserver: null,
    };
  },
  mounted() {
    this.registerCompletion();
    this.initEditor();
    // 监听容器尺寸变化，触发layout
    this.initResizeObserver();
  },
  beforeDestroy() {
    // 销毁 monaco 编辑器实例
    if (this.monacoEditor) {
      this.monacoEditor.dispose();
      this.monacoEditor = null;
    }
    // 销毁 completion provider
    if (this.completionProviderDisposable) {
      this.completionProviderDisposable.dispose();
      this.completionProviderDisposable = null;
    }
    // 移除resize observer
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  },
  methods: {
    // 初始化
    initEditor() {
      // 初始化编辑器实例
      this.monacoEditor = monaco.editor.create(this.$refs['codeEditorRef'], {
        value: this.internalValue,
        language: this.lang,
      });
      // 监听编辑器content变化
      this.monacoEditor.onDidChangeModelContent(async () => {
        this.isInputing = true;
        this.internalValue = this.monacoEditor.getValue();
        await this.$nextTick();
        this.isInputing = false;
      });
    },
    // 注册提示
    registerCompletion() {
      let suggestions = [];
      // 保存 provider 的 disposable 以便销毁
      this.completionProviderDisposable = monaco.languages.registerCompletionItemProvider(this.lang, {
        triggerCharacters: this.suggestions,
        provideCompletionItems: (model, position) => {
          suggestions = this.getSuggest();
          return {
            suggestions,
          };
        },
      });
    },
    getSuggest() {
      return this.suggestions.map((key) => ({
        label: key,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: key,
      }));
    },
    // 监听resize
    initResizeObserver() {
      if (window.ResizeObserver) {
        this.resizeObserver = new ResizeObserver(() => {
          if (this.monacoEditor) {
            // 修复获取不到高度导致报错问题
            if (!this.$el.offsetHeight) return;
            this.monacoEditor.layout();
          }
        });
        this.resizeObserver.observe(this.$refs['codeEditorRef']);
      } else {
        this._windowResizeHandler = () => {
          if (this.monacoEditor) {
            // 修复获取不到高度导致报错问题
            if (!this.$el.offsetHeight) return;
            this.monacoEditor.layout();
          }
        };
        window.addEventListener('resize', this._windowResizeHandler);
      }
    },
  },
  destroyed() {
    // 兼容beforeDestroy未清理window resize
    if (this._windowResizeHandler) {
      window.removeEventListener('resize', this._windowResizeHandler);
      this._windowResizeHandler = null;
    }
  },
};
</script>
<style lang="scss" scoped>
@import '@jl/web-ui/src/style/element.scss';
.jl-code-editor {
  width: 100%;
  ::v-deep .monaco-editor {
    overflow: hidden;
    box-sizing: border-box;
    border: 1px solid $--border-color-base;
    transition: $--border-transition-base;
    border-radius: $--input-border-radius;

    &:hover,
    &.focused {
      border-color: var(--jl-primary);
    }
  }
}
</style>
