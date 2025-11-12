<template>
  <div class="json-editor-container">
    <div ref="editorContainer" class="json-editor" :class="{ 'is-mounted': isMounted }"></div>
    <slot></slot>
  </div>
</template>

<script>
import COM_PREFIX from '@jl/web-ui/src/config';
import JSONEditor from 'jsoneditor/dist/jsoneditor.min';
import 'jsoneditor/dist/jsoneditor.min.css';
import modelMixin from '@jl/web-ui/src/mixin/model';

export default {
  name: COM_PREFIX + 'JsonEditor',
  mixins: [modelMixin],
  props: {
    value: {
      required: true,
    },
    // 一些功能块的显隐
    statusBar: { type: Boolean, default: false },
    mainMenuBar: { type: Boolean, default: false },
    navigationBar: { type: Boolean, default: true },
    showErrorTable: { type: Boolean, default: true },
    // 操作相关
    disabled: { type: Boolean, default: false },
    searchable: { type: Boolean, default: false },
    // 基本配置
    mode: {
      type: String,
      default: 'code', // 'tree', 'view', 'form', 'code', 'text'
      validator: (value) => ['tree', 'view', 'form', 'code', 'text'].includes(value),
    },
    modes: {
      type: Array,
      default: () => ['text', 'code', 'tree', 'form', 'view', 'preview'],
    },
    // 也可通过options配置
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      editor: null,
      isMounted: false, // 优化交互体验， border初始不过滤
    };
  },
  watch: {
    value: {
      handler() {
        this.updateEditor();
      },
      deep: true,
    },
    mode(newMode) {
      if (this.editor) {
        this.editor.setMode(newMode);
      }
    },
  },
  mounted() {
    this.initEditor();
  },
  beforeDestroy() {
    this.destroyEditor();
  },
  methods: {
    initEditor() {
      const container = this.$refs.editorContainer;
      const defaultOptions = {
        mode: this.mode,
        modes: this.modes,
        search: this.searchable,
        statusBar: this.statusBar,
        mainMenuBar: this.mainMenuBar,
        navigationBar: this.navigationBar,
        showErrorTable: this.showErrorTable,

        onChange: this.handleChange,
        onError: this.handleError,
        onEditable: () => !this.disabled,
      };

      const options = Object.assign({}, defaultOptions, this.options);

      this.editor = new JSONEditor(container, options);
      this.editor.set(this.internalValue);

      this.isMounted = true;
    },
    updateEditor() {
      if (this.editor) {
        try {
          this.editor.update(this.internalValue);
        } catch (error) {
          console.error('JSONEditor update error:', error);
        }
      }
    },
    destroyEditor() {
      if (this.editor) {
        this.editor.destroy();
        this.editor = null;
      }
    },
    handleChange() {
      if (this.editor) {
        try {
          const json = this.editor.get();
          this.internalValue = json;
          this.$emit('change', json);
        } catch (error) {
          console.error('JSONEditor get error:', error);
        }
      }
    },
    handleError(error) {
      this.$emit('error', error);
    },
    getEditor() {
      return this.editor;
    },
    setMode(mode) {
      if (this.editor) {
        this.editor.setMode(mode);
      }
    },
    expandAll() {
      if (this.editor && this.editor.expandAll) {
        this.editor.expandAll();
      }
    },
    collapseAll() {
      if (this.editor && this.editor.collapseAll) {
        this.editor.collapseAll();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.json-editor-container {
  position: relative;
  width: 100%;
  height: 100%;
  .json-editor {
    width: 100%;
    height: 100%;
    &.is-mounted {
      ::v-deep .jsoneditor {
        .ace-jsoneditor,
        textarea.jsoneditor-text {
          transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
        }
      }
    }
    ::v-deep .jsoneditor {
      // border-color: var(--jl-border-color);
      // border-radius: var(--jl-border-radius);
      // overflow: hidden;
      border: none;

      .ace-jsoneditor,
      textarea.jsoneditor-text {
        min-height: 20px;
        box-sizing: border-box;
        border: thin solid var(--jl-border-color);
        border-radius: var(--jl-border-radius);

        // hover focus
        &:hover,
        &.ace_focus {
          border-color: var(--jl-primary);
        }
        &.ace_focus {
          .ace_gutter {
            .ace_gutter-layer {
              .ace_gutter-cell {
                &.ace_gutter-active-line {
                  background-color: #e7e8ec;
                }
              }
            }
          }
          .ace_marker-layer {
            // 当选聚焦高亮行
            .ace_active-line {
              background-color: #e7e8ec;
            }
            // 选中块
            .ace_selection {
              background-color: #add6ff;
            }
          }
        }

        .ace_gutter {
          color: #67676c;
          background-color: #f6f6f7;
          .ace_gutter-layer {
            // text-align: center; // 会导致展开收起按钮点击热区部分失效
            .ace_gutter-cell {
              padding-inline: 16px;
              &.ace_gutter-active-line {
                background-color: unset;
                // background-color: #e7e8ec;
              }
            }
          }
        }
        .ace_marker-layer {
          .ace_active-line {
            background-color: unset;
            // background-color: #e7e8ec;
          }
        }
      }
    }
  }
}
</style>
