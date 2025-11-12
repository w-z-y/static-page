<template>
  <el-select
    class="jl-select"
    popper-class="jl-select-popper"
    ref="mySelectRef"
    v-bind="$attrs"
    :multiple="multiple"
    v-model="internalValue"
    @change="handleChangeValue"
    @visible-change="handleVisibleChange"
    @clear="handleClear"
    filterable
    :filter-method="isTree ? handleFilterMethod : null">
    <slot>
      <template v-if="type === 'tree'">
        <el-option value="" v-show="false" />
        <template v-if="selectedNode && selectedNode.length">
          <template v-for="selectedNodeItem in selectedNode">
            <el-option
              v-if="selectedNodeItem"
              v-show="false"
              :label="selectedNodeItem[defaultProps.label]"
              :value="selectedNodeItem[defaultProps.value]">
            </el-option>
          </template>
        </template>
        <jl-tree
          style="font-size: 14px; line-height: 34px"
          ref="selectTreeRef"
          @change="handleNodeClick"
          :expand-on-click-node="expandOnClickNode"
          check-strictly
          :selectable="selectable"
          :node-key="defaultProps.value"
          :props="defaultProps"
          default-expand-all
          :data="options">
        </jl-tree>
      </template>
      <template v-else>
        <el-option v-for="option in options" :key="option[defaultProps.value]" :label="getOptionLabel(option)" :value="option[defaultProps.value]">
          <jl-tooltip :rows="1" :enterable="false" placement="right">
            <slot name="option" v-bind="option">{{ getOptionLabel(option) }}</slot>
          </jl-tooltip>
        </el-option>
      </template>
    </slot>
  </el-select>
</template>

<script>
import COM_PREFIX from '@jl/web-ui/src/config';
import JlTree from '../../Tree';

import propsMixin from '@jl/web-ui/src/mixin/props';
import modelMixin from '@jl/web-ui/src/mixin/model';

import JlTooltip from '../../Tooltip';

export default {
  name: COM_PREFIX + 'Form.Select',
  mixins: [propsMixin, modelMixin],
  components: { JlTree, JlTooltip },
  props: {
    options: { type: Array, default: () => [] },
    type: {
      type: String,
      default: '',
      validator: (value) => {
        return ['', 'tree'].includes(value);
      },
    },
    formatter: {
      type: Function,
      default: null,
    },
    multiple: { type: Boolean, default: false },
    // 点击节点是否展开
    expandOnClickNode: { type: Boolean, default: false },
    // 是否可选择
    selectable: { type: [Boolean, Function], default: true },
  },
  watch: {
    value: {
      handler(newVal) {
        if (this.isTree && newVal) {
          this.matchSelectedNode();
        }
      },
      immediate: true,
    },
    options: {
      handler() {
        if (this.isTree) {
          this.matchSelectedNode();
        }
      },
    },
  },
  computed: {
    isTree() {
      return this.type === 'tree';
    },
  },
  data() {
    return {
      selectedNode: [],
    };
  },
  methods: {
    async matchSelectedNode() {
      await this.$nextTick();
      const selectTreeRef = this.$refs.selectTreeRef?.getTreeRef();
      if (this.multiple) {
        this.selectedNode = this.value.map((v) => {
          return selectTreeRef?.getNode(v)?.data;
        });
        selectTreeRef?.setCheckedKeys(this.value);
      } else {
        this.selectedNode = [selectTreeRef?.getNode(this.value)?.data];
        selectTreeRef?.setCheckedKeys([this.value]);
      }
    },
    // 获取选项标签
    getOptionLabel(option) {
      return this.formatter ? this.formatter(option) : option[this.defaultProps.label];
    },
    handleChangeValue(value) {
      this.$emit('change', value);
    },
    handleNodeClick(data, node) {
      // 禁用
      if (!this.isTree) return;
      if (node.disabled) return;
      this.selectedNode = [data];

      if (this.multiple) {
        const value = data[this.defaultProps.value];
        const index = this.internalValue.indexOf(value);
        if (index === -1) {
          this.internalValue.push(value);
        } else {
          this.internalValue.splice(index, 1);
        }
      } else {
        this.internalValue = data[this.defaultProps.value];
        this.$refs.mySelectRef.visible = false;
      }
    },
    handleVisibleChange(visible) {
      if (visible) {
        // 设置 el-select-dropdown、el-popper、jl-select-popper 的宽度与 select 一致
        this.$nextTick(() => {
          const mySelectRef = this.$refs.mySelectRef;
          if (!mySelectRef) return;
          const selectWidth = mySelectRef.$el.offsetWidth;
          const dropdown = mySelectRef.$refs.popper?.$el;
          if (dropdown) {
            dropdown.style.width = `${selectWidth}px`;
          }
        });
      }

      if (this.isTree) {
        if (visible) {
          // 滚动到选中项
          setTimeout(() => {
            this.scrollToOption();
          }, 0);
        } else {
          setTimeout(() => {
            this.handleFilterMethod('');
          }, 100); // 大概在关闭动画之后
        }
      }
    },
    // 滚动到选中项
    scrollToOption() {
      const selectTreeRef = this.$refs.selectTreeRef?.getTreeRef();
      if (!selectTreeRef) return;
      const selectDom = selectTreeRef.$el.querySelector('.el-tree-node.is-checked');
      this.$refs.mySelectRef.scrollToOption({ $el: selectDom });
    },
    handleClear() {
      if (this.isTree) {
        const selectTreeRef = this.$refs.selectTreeRef?.getTreeRef();
        selectTreeRef?.setCheckedKeys([]);
      }
      this.$emit('clear');
    },
    handleFilterMethod(value) {
      const selectTreeRef = this.$refs.selectTreeRef?.getTreeRef();
      selectTreeRef.filter(value);
    },
  },
  mounted() {
    const mySelectRef = this.$refs.mySelectRef;
    const popperElm = mySelectRef.$refs.popper.$el;
    popperElm.style.width = `${mySelectRef.$el.offsetWidth}px`;
  },
};
</script>

<style lang="scss" scoped>
.el-select {
  .el-tree {
    padding-right: 10px;
  }
  ::v-deep .el-input {
    .el-input__inner:focus {
      border-color: var(--jl-primary);
    }
  }
}
</style>

<style lang="scss">
.jl-select-popper.el-select-dropdown {
  min-width: 120px !important;
  .el-select-dropdown__item {
    display: flex;
    align-items: center;
    &.selected {
      color: var(--jl-primary);
    }
  }
}
</style>
