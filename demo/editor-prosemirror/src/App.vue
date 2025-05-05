<template>
  <div class="dark">
    <button @click="handleClick">click</button>
    <div ref="editor" class="ProseMirror"></div>
  </div>
</template>

<script>
import { DOMParser } from "prosemirror-model";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { TextSelection } from "prosemirror-state";
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

import mentionPlugin from "./plugins/mention-plugin";
// import menuPlugin from "./plugins/menu";
import placeholderPlugin from "./plugins/placeholder-plugin";
// import tooltipPlugin from "./plugins/tooltip";
import selectionTooltipPlugin from "./plugins/floating-menu-plugin";

function icon(text, name) {
  let span = document.createElement("span");
  span.className = "menuicon " + name;
  span.title = name;
  span.textContent = text;
  return span;
}

// Create an icon for a heading at the given level
function heading(level) {
  return {
    command: setBlockType(schema.nodes.heading, { level }),
    dom: icon("H" + level, "heading"),
  };
}
export default {
  name: "MyProseMirror",
  props: {
    theme: {
      type: String,
      default: "light", // dark
    },
    value: {
      type: String,
      default:
        "<p>wwwwwwwwwwwwwwww</p><p>zzzzz</p><p>yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy</p>",
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

          // mentionRule(schema),
          mentionPlugin(),
          placeholderPlugin("请输入内容..."),
          // tooltipPlugin(this.theme, []),
          // menuPlugin([
          //   {
          //     command: toggleMark(schema.marks.strong),
          //     dom: icon("B", "strong"),
          //   },
          //   { command: toggleMark(schema.marks.em), dom: icon("i", "em") },
          //   {
          //     command: setBlockType(schema.nodes.paragraph),
          //     dom: icon("p", "paragraph"),
          //   },
          //   heading(1),
          //   heading(2),
          //   heading(3),
          //   {
          //     command: wrapIn(schema.nodes.blockquote),
          //     dom: icon(">", "blockquote"),
          //   },
          // ]),
          selectionTooltipPlugin({
            element: this.$refs.editor,
          }),
        ],
        // 设置初始光标位置
        selection: TextSelection.create(doc, this.cursorPosition),
      });
      this.view = new EditorView(el, {
        state,
        dispatchTransaction: (transaction) => {
          const newState = this.view.state.apply(transaction);
          this.view.updateState(newState);
        },
      });
      window.view = this.view;

      this.$emit("editor-ready", {
        getContent: this.getContent,
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

<style scoped lang="scss"></style>
