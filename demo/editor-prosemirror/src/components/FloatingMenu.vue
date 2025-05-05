<template>
  <div>
    <button
      v-for="(menuItem, idx) in menuOptions"
      :key="idx"
      @click="handleClickMenu(menuItem.command)"
    >
      {{ menuItem.text }}
    </button>
  </div>
</template>
<script>
import { toggleMark } from "prosemirror-commands";
export default {
  props: {
    editorView: {
      type: Object,
    },
  },
  components: {},
  data() {
    return {
      menuOptions: [
        {
          command: "strong",
          text: "B",
        },
        {
          command: "em",
          text: "I",
        },
        {
          command: "underline",
          text: "U",
        },
      ],
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    handleClickMenu(command) {
      toggleMark(this.editorView.state.schema.marks[command])(
        this.editorView.state,
        this.editorView.dispatch,
        this.editorView
      );
      this.editorView.focus();
    },
  },
};
</script>
<style lang="scss" scoped></style>
