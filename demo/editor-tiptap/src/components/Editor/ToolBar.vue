<template>
    <div class="control-group">
        <div class="button-group" v-if="editor">
            <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
                :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
                H1
            </button>
            <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
                :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
                H2
            </button>
            <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
                :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
                H3
            </button>
            <button @click="editor.chain().focus().setParagraph().run()"
                :class="{ 'is-active': editor.isActive('paragraph') }">
                Paragraph
            </button>
            <button @click="editor.chain().focus().toggleBold().run()"
                :class="{ 'is-active': editor.isActive('bold') }">
                Bold
            </button>
            <button @click="editor.chain().focus().toggleItalic().run()"
                :class="{ 'is-active': editor.isActive('italic') }">
                Italic
            </button>
            <button @click="editor.chain().focus().toggleStrike().run()"
                :class="{ 'is-active': editor.isActive('strike') }">
                Strike
            </button>
            <button @click="editor.chain().focus().toggleHighlight().run()"
                :class="{ 'is-active': editor.isActive('highlight') }">
                Highlight
            </button>
            <button @click="editor.chain().focus().setTextAlign('left').run()"
                :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }">
                Left
            </button>
            <button @click="editor.chain().focus().setTextAlign('center').run()"
                :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }">
                Center
            </button>
            <button @click="editor.chain().focus().setTextAlign('right').run()"
                :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }">
                Right
            </button>
            <button @click="editor.chain().focus().setTextAlign('justify').run()"
                :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }">
                Justify
            </button>

            <br>
            <br>

            <button @click="editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()">
                Insert table
            </button>
            <button
                @click="editor.chain().focus().insertContent(tableHTML, { parseOptions: { preserveWhitespace: false } }).run()">
                Insert HTML table
            </button>
            <button @click="editor.chain().focus().addColumnBefore().run()" :disabled="!editor.can().addColumnBefore()">
                Add column before
            </button>
            <button @click="editor.chain().focus().addColumnAfter().run()" :disabled="!editor.can().addColumnAfter()">
                Add column after
            </button>
            <button @click="editor.chain().focus().deleteColumn().run()" :disabled="!editor.can().deleteColumn()">
                Delete column
            </button>
            <button @click="editor.chain().focus().addRowBefore().run()" :disabled="!editor.can().addRowBefore()">
                Add row before
            </button>
            <button @click="editor.chain().focus().addRowAfter().run()" :disabled="!editor.can().addRowAfter()">
                Add row after
            </button>
            <button @click="editor.chain().focus().deleteRow().run()" :disabled="!editor.can().deleteRow()">
                Delete row
            </button>
            <button @click="editor.chain().focus().deleteTable().run()" :disabled="!editor.can().deleteTable()">
                Delete table
            </button>
            <button @click="editor.chain().focus().mergeCells().run()" :disabled="!editor.can().mergeCells()">
                Merge cells
            </button>
            <button @click="editor.chain().focus().splitCell().run()" :disabled="!editor.can().splitCell()">
                Split cell
            </button>
            <button @click="editor.chain().focus().toggleHeaderColumn().run()"
                :disabled="!editor.can().toggleHeaderColumn()">
                Toggle header column
            </button>
            <button @click="editor.chain().focus().toggleHeaderRow().run()" :disabled="!editor.can().toggleHeaderRow()">
                Toggle header row
            </button>
            <button @click="editor.chain().focus().toggleHeaderCell().run()"
                :disabled="!editor.can().toggleHeaderCell()">
                Toggle header cell
            </button>
            <button @click="editor.chain().focus().mergeOrSplit().run()" :disabled="!editor.can().mergeOrSplit()">
                Merge or split
            </button>
            <button @click="editor.chain().focus().setCellAttribute('backgroundColor', '#FAF594').run()"
                :disabled="!editor.can().setCellAttribute('backgroundColor', '#FAF594')">
                Set cell attribute
            </button>
            <button @click="editor.chain().focus().fixTables().run()" :disabled="!editor.can().fixTables()">
                Fix tables
            </button>
            <button @click="editor.chain().focus().goToNextCell().run()" :disabled="!editor.can().goToNextCell()">
                Go to next cell
            </button>
            <button @click="editor.chain().focus().goToPreviousCell().run()"
                :disabled="!editor.can().goToPreviousCell()">
                Go to previous cell
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ToolBar',
    props: {
        editor: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            tableHTML: `
                <table style="width:100%">
                <tr>
                    <th>Firstname2</th>
                    <th>Lastname</th>
                    <th>Age</th>
                </tr>
                <tr>
                    <td>Jill</td>
                    <td>Smith</td>
                    <td>50</td>
                </tr>
                <tr>
                    <td>Eve</td>
                    <td>Jackson</td>
                    <td>94</td>
                </tr>
                <tr>
                    <td>John</td>
                    <td>Doe</td>
                    <td>80</td>
                </tr>
                </table>
            `,
        };
    },
    methods: {

    }
};
</script>

<style scoped lang="scss"></style>