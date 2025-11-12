<template>
  <el-input ref="InputRef" class="jl-input" :class="{ 'is-suffix-icon': suffixIcon }" :suffix-icon="suffixIcon" v-bind="$attrs" v-on="$listeners">
    <template #[slotName] v-for="(slot, slotName) in $slots">
      <slot :name="slotName" />
    </template>
  </el-input>
</template>

<script>
import COM_PREFIX from '@jl/web-ui/src/config';

export default {
  name: COM_PREFIX + 'Form.Input',
  props: {
    autofocus: {
      type: Boolean,
      default: false,
    },
    suffixIcon: {
      type: String,
    },
    // 自适应宽度
    adaptive: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    if (this.adaptive) {
      this.$nextTick(() => {
        this.$refs.InputRef.$refs.input.setAttribute('size', '1');
      });
    }
    if (this.autofocus) {
      this.$nextTick(() => {
        this.focus();
      });
    }
  },
  methods: {
    focus() {
      this.$refs.InputRef?.focus?.();
    },
  },
};
</script>

<style lang="scss" scoped>
.jl-input {
  ::v-deep {
    &.el-input__inner,
    &.el-textarea__inner {
      &:focus {
        border-color: var(--jl-primary);
      }
    }
  }
  &.is-suffix-icon {
    ::v-deep .el-input__inner {
      padding-right: 60px;
    }
  }
}
</style>
