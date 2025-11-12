<template>
  <el-switch class="jl-switch" v-bind="$attrs" v-on="$listeners"> </el-switch>
</template>

<script>
import COM_PREFIX from '@jl/web-ui/src/config';
export default {
  inheritAttrs: false,
  name: COM_PREFIX + 'Form.Switch',
};
</script>

<style lang="scss" scoped>
.jl-switch.el-switch {
  transform-origin: left;
  &.is-checked {
    ::v-deep .el-switch__core {
      background-color: var(--jl-primary);
      border-color: var(--jl-primary);
    }
  }
  ::v-deep .el-switch__label.is-active {
    color: var(--jl-primary);
  }
}
</style>
