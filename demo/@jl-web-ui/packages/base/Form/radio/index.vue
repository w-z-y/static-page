<template>
  <component class="jl-radio" :is="type === 'button' ? 'el-radio-button' : 'el-radio'" :size="size" v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </component>
</template>

<script>
import COM_PREFIX from '@jl/web-ui/src/config';
export default {
  name: COM_PREFIX + 'Form.Radio',
  props: {
    type: { type: String, default: 'default', validator: (value) => ['default', 'button'].includes(value) },
    size: { type: String, default: 'small' },
  },
};
</script>

<style lang="scss" scoped>
@use './index.scss';

</style>
