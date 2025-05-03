<template>
  <div>
    <button @click="handleClick">click</button>
    <div ref="editor" class="prosemirror-editor"></div>
  </div>
</template>

<script>
import { DOMParser } from "prosemirror-model";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { Plugin, TextSelection } from "prosemirror-state";
// 基础schema
import { schema } from "./schema";
// 历史记录
import { undo, redo, history } from "prosemirror-history";
// 键盘
import { keymap } from "prosemirror-keymap";
import { baseKeymap, toggleMark, setBlockType } from "prosemirror-commands";
/* 


*/
import { mentionRule } from "./schema/mention";
import placeholderPlugin from "./plugins/placeholder";
import selectionSizePlugin from "./plugins/tooltip";
export default {
  name: "MyProseMirror",
  props: {
    msg: String,
    value: {
      type: String,
      default: "<p></p>",
    },
    // 添加光标位置属性
    cursorPosition: {
      type: Number,
      default: 0,
    },
  },
  mounted() {
    this.initEditor(this.$refs.editor);
  },
  methods: {
    initEditor(el) {
      if (!el) return;
      // 使用DOMParser解析初始内容
      const contentElement = document.createElement("div");
      contentElement.innerHTML = this.value;

      const doc = DOMParser.fromSchema(schema).parse(contentElement);

      const state = EditorState.create({
        doc,
        schema,
        plugins: [
          history(),
          keymap({ "Mod-z": undo, "Mod-y": redo }),
          keymap(baseKeymap),

          mentionRule(schema),
          placeholderPlugin("请输入内容..."),
          selectionSizePlugin(),
        ],
        // 设置初始光标位置
        selection: TextSelection.create(doc, this.cursorPosition),
      });

      console.log(state, schema);
      this.view = new EditorView(el, {
        state,
        // 监听编辑器状态变化（事务）
        dispatchTransaction: (transaction) => {
          console.log(
            "Document size went from",
            transaction.before.content.size,
            "to",
            transaction.doc.content.size
          );
          // 应用事务（没有这一步，将无法输入）
          const newState = this.view.state.apply(transaction);
          // 更新编辑器状态
          this.view.updateState(newState);
          // 触发内容更新事件
          // this.$emit("input", this.view.dom.innerHTML);
        },
      });

      // 自动聚焦
      this.$nextTick(() => {
        this.view.focus();
      });
    },
    handleClick() {
      /*
        addMark(schema.marks.color, { color })(
            this.view.state,
            this.view.dispatch,
            this.view
        )
        removeMark(schema.marks.color)(
            this.view.state,
            this.view.dispatch,
            this.view
        );
        isActiveMark(
            this.view.state,
            schema.marks.underline
        )
        setBlockType(schema.nodes.paragraph, { align })(
            this.view.state,
            this.view.dispatch,
            this.view
          )
         */
      toggleMark(schema.marks.strong)(
        this.view.state,
        this.view.dispatch,
        this.view
      );
      this.view.focus();
    },
    // 添加设置光标位置的方法
    // setCursor(pos) {
    //     const { doc, tr } = this.view.state;
    //     const selection = TextSelection.create(doc, pos);
    //     this.view.dispatch(tr.setSelection(selection));
    //     this.view.focus();
    // },
  },
};
</script>

<style scoped lang="scss">
.prosemirror-editor {
  position: relative;
  border: 1px solid #ccc;
  ::v-deep .ProseMirror {
    outline: none;
    min-height: 100px;
    padding: 10px;
    &[data-placeholder]::before {
      color: #ccc;
      position: absolute;
      content: attr(data-placeholder);
      pointer-events: none;
    }
    p {
      margin: 0;
    }
  }
  ::v-deep .tooltip {
    position: absolute;
    z-index: 20;
    background: white;
    border: 1px solid silver;
    border-radius: 2px;
    padding: 2px 10px;
    margin-bottom: 7px;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    &::before {
      content: "";
      height: 0;
      width: 0;
      position: absolute;
      left: 50%;
      margin-left: -5px;
      bottom: -6px;
      border: 5px solid transparent;
      border-bottom-width: 0;
      border-top-color: silver;
    }
    &::after {
      content: "";
      height: 0;
      width: 0;
      position: absolute;
      left: 50%;
      margin-left: -5px;
      bottom: -4.5px;
      border: 5px solid transparent;
      border-bottom-width: 0;
      border-top-color: white;
    }
  }
}
</style>
