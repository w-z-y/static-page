<template>
  <el-tree
    ref="jlTreeRef"
    class="jl-tree"
    auto-expand-parent
    v-bind="$attrs"
    v-on="$listeners"
    :default-expanded-keys="internalDefaultExpandedKeys"
    :default-checked-keys="defaultCheckedKeys"
    :expand-on-click-node="false"
    :node-key="computedNodeKey"
    :data="data"
    :props="defaultProps"
    :filter-node-method="filterNode"
    @node-click="handleNodeClick">
    <template #default="{ node, data }">
      <div class="tree-node">
        <div class="tree-node__left">
          <slot name="node-left" v-bind="{ node, data }" />
          <jl-tooltip :rows="1" :enterable="false" placement="right">
            <slot v-bind="{ node, data }">
              {{ data[defaultProps.label] }}
            </slot>
          </jl-tooltip>
        </div>
        <div class="tree-node__right">
          <slot name="node-right" v-bind="{ node, data }" />
        </div>
      </div>
    </template>
  </el-tree>
</template>

<script>
import COM_PREFIX from '@jl/web-ui/src/config';
import propsMixin from '@jl/web-ui/src/mixin/props';
import JlTooltip from '../Tooltip/index.vue';

export default {
  name: COM_PREFIX + 'Tree',
  inheritAttrs: false,

  mixins: [propsMixin],
  components: { JlTooltip },
  props: {
    // 树型数据
    data: { type: Array, default: () => [] },
    // 绑定键(也可以通过 props.value设定)
    nodeKey: { type: String, default: '' },
    // 控制单个节点是否可选择
    selectable: { type: [Boolean, Function], default: true },
    // 控制默认展开
    defaultExpandedKeys: { type: Array, default: () => [] },
    // 控制默认选中
    defaultCheckedKeys: { type: Array, default: () => [] },
  },
  computed: {
    computedNodeKey() {
      return this.nodeKey || this.defaultProps.value;
    },
  },
  watch: {
    defaultExpandedKeys(newVal) {
      this.internalDefaultExpandedKeys = newVal;
      if (newVal.length) {
        newVal.map((i) => this.expand(i));
      }
    },
    defaultCheckedKeys(newVal) {
      this.$refs.jlTreeRef.setCheckedKeys(newVal);
    },
    async data(newVal, oldVal) {
      // 初始化
      if (!oldVal.length) {
        await this.$nextTick();
      }
      this.internalDefaultExpandedKeys = this.getExpandedKeys();
    },
  },
  created() {
    this.internalDefaultExpandedKeys = this.defaultExpandedKeys;
  },
  data() {
    return {
      internalDefaultExpandedKeys: [],
    };
  },
  methods: {
    getTreeRef() {
      return this.$refs.jlTreeRef;
    },
    // data或key
    expand(data) {
      const treeRef = this.getTreeRef();
      const expandNode = treeRef.getNode(data);
      this.expandNode(expandNode);
    },
    expandNode(node) {
      node.expanded = true;
      if (node.parent) {
        this.expandNode(node.parent);
      }
    },
    filterNode(value, data) {
      if (!value) return true;
      return (data[this.defaultProps.label] || '').includes(value);
    },
    handleNodeClick(data, node) {
      node.expanded = true;
      if (this.isSelectable(data) || data.disabled) {
        return;
      }
      this.$refs.jlTreeRef.setCheckedKeys([data[this.computedNodeKey]]);
      this.$emit('change', data, node);
    },
    // 控制节点是否可点击
    isSelectable(data) {
      if (typeof this.selectable === 'boolean') {
        if (!this.selectable) return true;
      } else {
        if (!this.selectable(data)) return true;
      }
      return false;
    },
    // 获取所有展开的节点，递归存到数组里
    getExpandedKeys() {
      const childNodes = this.getTreeRef().$data.root.childNodes;
      const expandedKeys = [];
      const traverse = (nodes = []) => {
        nodes.forEach(({ data, expanded, childNodes }) => {
          if (data && data[this.computedNodeKey] && expanded) {
            expandedKeys.push(data[this.computedNodeKey]);
            traverse(childNodes);
          }
        });
      };
      traverse(childNodes);
      return expandedKeys;
    },
  },
  mounted() {
    window.getExpandedKeys = this.getExpandedKeys;
  },
};
</script>

<style lang="scss" scoped>
.jl-tree {
  color: #606266;
  font-size: 14.5px;
  ::v-deep {
    .el-tree-node {
      line-height: inherit;
      > .el-tree-node__content {
        height: auto;
        .el-tree-node__expand-icon {
          // 叶子节点不显示展开图标，并禁止点击
          &.is-leaf {
            pointer-events: none;
          }
        }
      }
      &[aria-disabled] {
        > .el-tree-node__content {
          color: #ccc;
          cursor: not-allowed;
        }
      }
      &:not([aria-disabled]) {
        &.is-checked {
          & > .el-tree-node__content {
            font-weight: bolder;
          }
        }
        &.is-checked {
          > .el-tree-node__content {
            background-color: #f5f7fa;
            color: var(--jl-primary);
          }
        }
      }
    }
  }
  .tree-node {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;

    &__left {
      flex: 1;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      overflow: hidden;
    }
  }
}
</style>
