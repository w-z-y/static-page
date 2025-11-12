<template>
  <div class="jl-markdown-editor">
    <!-- <jl-skeleton :items="[]"></jl-skeleton> -->

    <el-skeleton animated :loading="loading">
      <template #template>
        <el-skeleton-item style="height: 24px; width: 42%"></el-skeleton-item>
        <el-skeleton-item style="height: 24px; width: 100%; margin-top: 16px"></el-skeleton-item>
        <el-skeleton-item style="height: 24px; width: 32%; margin-top: 16px"></el-skeleton-item>
      </template>
      <template>
        <div v-show="!readonly" class="jl-markdown-editor__inner" :id="editorId"></div>
        <div v-show="readonly" class="jl-markdown-editor__inner read-only windows"></div>
      </template>
    </el-skeleton>
  </div>
</template>

<script>
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import { v4 as uuid } from 'uuid';
import createVue from '@jl/web-ui/src/createVue';
import JlSkeleton from '@jl/web-ui/packages/base/Skeleton';

const TOOL_BAR = ['undo', 'redo', 'headings', 'bold', 'italic', 'strike', '|', 'list', 'ordered-list', 'check', '|', 'quote', 'line'];

export default createVue({
  name: 'MarkdownEditor',
  model: true,
  components: {
    JlSkeleton,
  },
  props: {
    loading: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
  },
  computed: {
    editorId() {
      return `jl-vditor-${this.currentUuid}`;
    },
  },
  data() {
    return {
      isInputing: false,
      skeletonItems: [{ width: '42%', height: '24px' }],
      currentUuid: '',
      markdownEditor: null,
    };
  },
  watch: {
    internalValue: {
      async handler(newVal) {
        if (this.loading) return;
        // 正在输入时, 不更新当前输入框
        if (this.isInputing) {
          this.renderPreview();
          return;
        }
        await this.$nextTick();
        if (newVal) {
          this.renderPreview();
          this.renderEditor();
        }
      },
      immediate: true,
    },
  },
  methods: {
    renderPreview() {
      Vditor.preview(this.$el.querySelector('.jl-markdown-editor__inner.read-only.windows'), this.internalValue, {});
    },
    async renderEditor() {
      this.currentUuid = uuid();
      await this.$nextTick();
      this.markdownEditor = new Vditor(this.editorId, {
        value: this.internalValue,
        mode: 'wysiwyg', // wysiwyg / ir / sv
        toolbar: TOOL_BAR,
        toolbarConfig: {
          pin: true,
        },
        cache: {
          enable: false, // 是否使用 localStorage 进行缓存
        },
        undoDelay: 200,

        // hint: {
        //   extend: [
        //     {
        //       key: '@',
        //       hint: (key) => {
        //         if ('vanessa'.indexOf(key.toLocaleLowerCase()) > -1) {
        //           return [
        //             {
        //               value: '`@V111anessa`',
        //               html: '<img src="https://avatars0.githubusercontent.com/u/970828?s=60&v=4"/> Vanes22sa',
        //             },
        //           ];
        //         }
        //         return [];
        //       },
        //     },
        //   ],
        // },
        /* 
        
        
          事件

        
        */
        // 异步渲染完成后的回调方法
        after: () => {
          // this.markdownEditor.setValue(this.internalValue);
        },
        customWysiwygToolbar: () => {},
        // 输入后触发
        input: async (value) => {
          this.isInputing = true;
          this.internalValue = value;
          await this.$nextTick();
          this.isInputing = false;
        },
        blur: (value) => {
          // this.internalValue = value;
        },
      });
    },
  },
});
</script>

<style scoped lang="scss">
.jl-markdown-editor {
  .jl-markdown-editor__inner {
    border: 0 !important;
    border-radius: 0 !important;
    ::v-deep {
      .vditor-toolbar {
        background: #fff !important;
        border-bottom: 0 !important;
        padding: 0 !important;
        z-index: 2;
        .vditor-toolbar__item {
          & > button {
            border-radius: 4px;
            padding: 0;
            width: 28px !important;
            height: 28px !important;
            &:hover {
              background-color: rgba(25, 31, 37, 0.08);
            }
          }
        }
        .vditor-toolbar__divider {
          margin: 4px 8px;
        }
      }

      .vditor-content {
        // wysiwyg 模式
        .vditor-wysiwyg {
          .vditor-reset {
            color: #333;
            padding: 0 !important;
            background: transparent !important;
          }
          .vditor-panel {
            display: none !important;
          }
        }
      }
    }
  }
}
</style>
