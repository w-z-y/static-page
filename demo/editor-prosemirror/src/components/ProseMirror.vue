<template>
    <div>
        <div ref="editor" class="prosemirror-editor"></div>
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
import { baseKeymap } from "prosemirror-commands";
import { mentionRule } from "./schema/mention";
import { placeholder } from "./schema/placeholder";
export default {
    name: "MyProseMirror",
    props: {
        msg: String,
        value: {
            type: String,
            default: "<p>请输入内容...</p>",
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
                    placeholder("请输入内容..."),
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
                    this.$emit("input", this.view.dom.innerHTML);
                },
            });

            // 自动聚焦
            this.$nextTick(() => {
                this.view.focus();
            });
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
    border: 1px solid #ccc;
    ::v-deep .ProseMirror {
        outline: none;
        min-height: 100px;
        padding: 10px;
        &[data-placeholder]::before {
            color: red;
            position: absolute;
            content: attr(data-placeholder);
            pointer-events: none;
        }
    }
}
</style>
