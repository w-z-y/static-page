<template>
  <div>
    <div>
      当前用户 <input type="text" v-model="currentUser">
    </div>
    <Menus :editor="editor" />
    <ToolBar :editor="editor" />
    <editor-content class="editor-content" :editor="editor" />
  </div>
</template>

<script>
// 基本
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
// 附加
import Mention from '@tiptap/extension-mention'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import StarterKit from '@tiptap/starter-kit'
import { mergeAttributes } from '@tiptap/core'
// import TableCell from '@tiptap/extension-table-cell'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import TextAlign from '@tiptap/extension-text-align'
// 内置
import { Editor, EditorContent } from '@tiptap/vue-2'
// 人员提示
import suggestion from './suggestion.js'
// 工具栏组件
import ToolBar from './ToolBar.vue'
import Menus from './Menus.vue'



const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      // extend the existing attributes …
      ...this.parent?.(),

      // and add a new one …
      backgroundColor: {
        default: null,
        parseHTML: element => element.getAttribute('data-background-color'),
        renderHTML: attributes => {
          return {
            'data-background-color': attributes.backgroundColor,
            style: `background-color: ${attributes.backgroundColor}`,
          }
        },
      },
    }
  },
})
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  components: {
    // 自定义组件
    EditorContent,
    ToolBar,
    Menus,
  },

  watch: {
    currentUser(val) {
      localStorage.setItem('userInfo', val)
    }
  },
  data() {
    return {
      editor: null,
      limit: 280,

      currentUser: localStorage.getItem('userInfo') || 'wzy'
    }
  },

  mounted() {
    this.editor = new Editor({
      extensions: [
        Document,
        Paragraph,
        Text,


        CustomTableCell,
        Highlight,
        Image.configure({
          inline: true,
          allowBase64: true,
        }),
        StarterKit,
        Table.configure({
          resizable: true,
        }),
        TableRow,
        TableHeader,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),

        Mention.configure({
          HTMLAttributes: {
            class: `mention`,
          },
          renderHTML: ({ options, node }) => {
            return [
              'span',
              mergeAttributes({ class: this.currentUser === node.attrs.id ? 'is-self' : '' }, options.HTMLAttributes),
              `${node.attrs.label ?? node.attrs.id}`,
            ]
          },
          suggestion,
        }),
      ],
      // 内容
      content: this.value,
      // 触发更新
      onUpdate: () => {
        // HTML
        this.$emit('input', this.editor.getHTML())

        // JSON
        // this.$emit('input', this.editor.getJSON())
      },
    })
  },


  beforeUnmount() {
    this.editor.destroy()
  },
}
</script>

<style lang="scss">
.ProseMirror-selectednode {
  outline: 2px solid #4d6bfe;
}

.editor-content {
  border: 2px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
}

/* Basic editor styles */
.tiptap {
  outline: none;

  :first-child {
    margin-top: 0;
  }

  .mention {
    background-color: var(--purple-light);
    border-radius: 0.4rem;
    box-decoration-break: clone;
    color: #4d6bfe;
    padding: 0.1rem 0.3rem;
    margin-inline: 4px;

    &.is-self {
      background-color: #4d6bfe;
      color: #fff;
    }
  }
}

/* Character count */
.character-count {
  align-items: center;
  color: var(--gray-5);
  display: flex;
  font-size: 0.75rem;
  gap: .5rem;
  margin: 1.5rem;

  svg {
    color: var(--purple);
  }

  &--warning,
  &--warning svg {
    color: var(--red);
  }
}
</style>