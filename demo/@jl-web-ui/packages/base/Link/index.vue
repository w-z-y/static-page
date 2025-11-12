<template>
  <el-link v-on="$listeners" v-bind="$attrs">
    <slot>{{ value }}</slot>
  </el-link>
</template>

<script>
import COM_PREFIX from '@jl/web-ui/src/config';
export default {
  name: COM_PREFIX + 'Link',
  props: {
    value: {},
  },
};
</script>

<style scoped lang="scss"></style>
