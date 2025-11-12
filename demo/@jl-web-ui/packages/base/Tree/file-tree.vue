<template>
  <div class="jl-file-tree h-full flex-col overflow-hidden" style="gap: 10px">
    <div style="padding: 10px 10px 0">
      <jl-form.input v-model="searchText" clearable suffix-icon="el-icon-search" :placeholder="placeholder"></jl-form.input>
    </div>
    <div v-loading="loading" class="w-full flex-1 overflow-hidden">
      <jl-dropdown
        :disabled="disabled"
        class="w-full h-full overflow-auto"
        :options="dropdownOptions"
        @contextmenu="handleContextMenu"
        @command="handleCommand"
        ref="myDropdownRef"
        trigger="contextmenu">
        <jl-tree
          ref="fileTreeRef"
          :props="defaultProps"
          :default-expand-all="defaultExpandAll"
          class="h-full"
          check-strictly
          v-bind="$attrs"
          v-on="$listeners"
          @node-click="handleNodeClick"
          @node-contextmenu="handleContextMenu">
          <template #node-left="{ node, data }">
            <jl-icon v-if="data.icon" :icon="data.icon"></jl-icon>
            <jl-icon v-else>
              <jl-icon :icon="iconComponent(node, data)"></jl-icon>
            </jl-icon>
          </template>
        </jl-tree>
      </jl-dropdown>
    </div>
  </div>
</template>
<script>
import COM_PREFIX from '@jl/web-ui/src/config';
import propsMixin from '@jl/web-ui/src/mixin/props';

import JlIcon from '../Icon';
import JlTree from './index.vue';
import JlDropdown from '../Dropdown';
import JlFormInput from '../Form/input';
export default {
  name: COM_PREFIX + 'Tree.FileTree',
  mixins: [propsMixin],
  components: { JlTree, JlIcon, JlDropdown, 'JlForm.input': JlFormInput },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    options: {
      type: [Array, Function],
      default: () => [],
    },
    defaultExpandAll: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '检索',
    },
    isFile: {
      type: Function,
      default: null,
    },
  },
  computed: {
    dropdownOptions() {
      if (Array.isArray(this.options)) {
        return this.options;
      } else if (typeof this.options === 'function') {
        return this.options(this.activeDropdownItem);
      }
      return [];
    },
    iconComponent() {
      return (node, data) => {
        const { expanded } = node;
        if (this.isFile && this.isFile(data)) {
          return 'file';
        }
        return expanded ? 'folder-open' : 'folder';
      };
    },
  },
  data() {
    return {
      searchText: '',
      activeDropdownItem: null,
    };
  },
  watch: {
    searchText(value) {
      this.$refs.fileTreeRef.getTreeRef().filter(value);
    },
  },
  methods: {
    hideDropdown() {
      this.$refs.myDropdownRef.hide();
    },
    handleNodeClick(...args) {
      this.hideDropdown();
      this.$emit('node-click', ...args);
    },
    clear() {
      this.searchText = '';
    },
    handleCommand(command, option) {
      this.$emit('command', command, this.activeDropdownItem, option);
    },
    handleContextMenu(e, data, node) {
      this.activeDropdownItem = node;
      if (data) {
        this.$refs.myDropdownRef.handleContextMenu(e, false);
      }
    },
    getTreeRef() {
      return this.$refs.fileTreeRef.getTreeRef();
    },
    setCheckedKeys(...args) {
      return this.getTreeRef().setCheckedKeys(...args);
    },
    getCurrentKey() {
      return this.getTreeRef().getCurrentKey();
    },
    setCurrentKey(...args) {
      return this.getTreeRef().setCurrentKey(...args);
    },
  },
};
</script>
