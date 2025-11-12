<!-- textarea不好的地方在于,内部会计算一个最小高度,无法通过外部控制 -->
<template>
  <div
    ref="editorRef"
    class="jl-text-editor"
    :contenteditable="!disabled"
    :data-placeholder="placeholder"
    :class="{ 'is-empty': internalValue && !internalValue.length }"
    @input="updateContent"
    @blur="updateContent"></div>
</template>

<script>
import createVue from '@jl/web-ui/src/createVue';
import t from '@jl/web-ui/src/util/i18n';
export default createVue({
  name: 'TextEditor',
  model: true,
  lang: true,
  props: {
    value: { type: String, required: true },
    placeholder: { type: String, default: t('textEditor.input.placeholder') },
    disabled: { type: Boolean, default: false },
  },
  data() {
    return {
      isInputing: false,
    };
  },
  methods: {
    async updateContent(event) {
      this.isInputing = true;
      this.internalValue = event.target.innerText.trim() || '';
      await this.$nextTick();
      this.isInputing = false;
    },
    setContent() {
      const editor = this.$refs.editorRef;
      editor && (editor.innerText = this.internalValue || '');
    },
    handlePasteListener(e) {
      e.preventDefault();
      const clipboardData = e.clipboardData || window.clipboardData;
      if (!clipboardData) return;
      // 仅获取纯文本内容，并插入，无格式
      let text = '';
      if (clipboardData.getData) {
        text = clipboardData.getData('text/plain');
      }
      // 兼容老版浏览器 clipboardData.items
      if (!text && clipboardData.items) {
        for (let i = 0; i < clipboardData.items.length; i++) {
          const item = clipboardData.items[i];
          if (item.kind === 'string' && item.type.indexOf('text') !== -1) {
            item.getAsString(function (str) {
              document.execCommand('insertText', false, str);
            });
            return;
          }
        }
      }
      if (text) {
        document.execCommand('insertText', false, text);
      }
    },
    addPasteListener() {
      const editor = this.$refs.editorRef;
      if (editor) {
        editor.addEventListener('paste', this.handlePasteListener);
      }
    },
    removePasteListener() {
      const editor = this.$refs.editorRef;
      if (editor) {
        editor.removeEventListener('paste', this.handlePasteListener);
      }
    },
    focus() {
      const el = this.$refs.editorRef;
      el.focus();
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(el);
      range.collapse(false); // false 表示移动到范围末尾
      sel.removeAllRanges(); // 清除所有选区
      sel.addRange(range); // 添加新的选区，即光标位置

      // 如果有滚动条，滚动到最下方
      if (this.$el && this.$el.scrollHeight > this.$el.clientHeight) {
        this.$el.scrollTop = el.scrollHeight;
      }
    },
  },
  watch: {
    internalValue: {
      immediate: true,
      async handler() {
        if (this.isInputing) return;
        await this.$nextTick();
        this.setContent();
      },
    },
    disabled(newVal) {
      // 切换监听
      this.isInputing = !newVal;
      if (newVal) {
        this.$el.scrollTop = 0;
        this.removePasteListener();
        this.setContent();
      } else {
        this.$nextTick(() => {
          this.focus();
          this.addPasteListener();
        });
      }
    },
  },
  mounted() {
    if (!this.disabled) {
      this.addPasteListener();
    }
  },
  beforeDestroy() {
    this.removePasteListener();
  },
});
</script>

<style scoped lang="scss">
.jl-text-editor {
  max-height: 100%;
  overflow: auto;
  word-break: break-all;
  &:focus {
    outline: none;
  }
  // placeholder
  &.is-empty:before {
    content: attr(data-placeholder);
    color: #bfbfbf;
    top: 0;
    pointer-events: none;
    position: absolute;
    user-select: none;
    display: block;
  }
}
</style>
