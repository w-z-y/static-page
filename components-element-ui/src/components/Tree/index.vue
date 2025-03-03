<template>
  <el-tree ref="myTree" v-bind="$attrs" v-on="$listeners" :node-key="nodeKey || defaultProps.value" :props="defaultProps">
    <template slot="default" slot-scope="{ data }">
      <div class="flex flex-1 flex-align-center flex-justify-between">
        <span class="flex flex-align-center">
          <slot name="node-left"></slot>
          <MyTooltip>
            <slot v-bind="data">{{ data[defaultProps.label] }}</slot>
          </MyTooltip>
        </span>
        <span>
          <slot name="node-right"></slot>
        </span>
      </div>
    </template>
  </el-tree>
</template>

<script>
import MyTooltip from '../Tooltip';
import propsMixin from '@/mixins/props';

export default {
  name: 'MyTree',
  mixins: [propsMixin],
  components: { MyTooltip },
  props: {
    nodeKey: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
.el-tree {
  font-weight: normal; // 节点高亮色

  ::v-deep .el-tree-node {
    &[aria-disabled='true'] {
      & > .el-tree-node__content {
        color: #ccc;
        cursor: not-allowed;
      }
    }

    &.is-checked {
      & > .el-tree-node__content {
        color: #1890ff;
      }
    }
  }
}
</style>
