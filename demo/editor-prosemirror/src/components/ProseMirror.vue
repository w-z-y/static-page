<template>
    <div>
        <div ref="editor" class="prosemirror-editor"></div>
    </div>
</template>

<script>
import { DOMParser } from "prosemirror-model";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";

// 基础schema
import { schema } from "prosemirror-schema-basic";
// 历史记录
import { undo, redo, history } from "prosemirror-history";
// 键盘
import { keymap } from "prosemirror-keymap";
import { baseKeymap } from "prosemirror-commands";

export default {
    name: "MyProseMirror",
    props: {
        msg: String,
    },
    mounted() {
        this.initEditor();
    },
    methods: {
        initEditor() {
            this.view = new EditorView(this.$refs.editor, {
                state: EditorState.create({
                    schema,
                    plugins: [history(), keymap({ "Mod-z": undo, "Mod-y": redo, ...baseKeymap })],
                }),
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
                },
            });
            console.log(this.view);
        },
    },
};
</script>

<style scoped lang="scss">
.prosemirror-editor {
    border: 1px solid #ccc;
    ::v-deep .ProseMirror {
        outline: none;
    }
}
</style>
