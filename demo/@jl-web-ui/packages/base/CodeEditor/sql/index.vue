<template>
  <JlCodeEditor v-bind="$attrs" v-on="$listeners" lang="sql" :suggestions="suggestions"></JlCodeEditor>
</template>

<script>
import COM_PREFIX from '@jl/web-ui/src/config';
import JlCodeEditor from '../index.vue';
import 'monaco-editor/esm/vs/basic-languages/sql/sql.contribution';
import { language } from 'monaco-editor/esm/vs/basic-languages/sql/sql.js';
const { keywords } = language;

export default {
  name: COM_PREFIX + 'CodeEditor.Sql',
  components: { JlCodeEditor },
  data() {
    return {
      suggestions: keywords,
    };
  },
  methods: {},
};
</script>

<style scoped lang="scss"></style>
