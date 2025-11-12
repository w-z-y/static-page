<template>
  <el-popconfirm popper-class="jl-popconfirm-popper" :disabled="disabled" :placement="placement" :title="title" v-bind="$attrs" v-on="$listeners">
    <template #reference>
      <slot name="reference"></slot>
    </template>
  </el-popconfirm>
</template>

<script>
export default {
  name: 'MyComponent',
  props: {
    title: {
      type: String,
      default: '确定删除吗？',
    },
    placement: {
      type: String,
      default: 'top',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
@import '../../../src/style/components/button.scss';
.jl-popconfirm-popper {
  .el-button {
    &.el-button--text {
      @include btn-type('primary');
    }
    &.el-button--primary {
      @include btn-type('primary');
    }
  }
}
</style>
<style scoped lang="scss"></style>
