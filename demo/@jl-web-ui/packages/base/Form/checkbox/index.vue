<template>
  <el-checkbox
    class="jl-checkbox"
    :is="type === 'button' ? 'el-checkbox-button' : 'el-checkbox'"
    :class="{
      'is-no-label': !label,
      ['el-checkbox-button--' + size]: type === 'button' && size,
      'is-round': round,
    }"
    :label="label"
    :size="size"
    v-bind="$attrs"
    v-on="$listeners">
    <slot></slot>
  </el-checkbox>
</template>

<script>
import COM_PREFIX from '@jl/web-ui/src/config';
export default {
  name: COM_PREFIX + 'Form.Checkbox',
  props: {
    type: { type: String, default: 'default', validator: (value) => ['default', 'button'].includes(value) },
    label: { type: [String, Number], default: '' },
    size: { type: String, default: 'small' },
    round: { type: Boolean, default: false },
  },
};
</script>

<style scoped lang="scss">
@use './index.scss';
</style>
