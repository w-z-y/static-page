<template>
  <el-skeleton v-bind="skeletonProps" v-on="$listeners">
    <template v-if="$slots.default" #default>
      <slot />
    </template>
    <template v-if="$slots.template" #template>
      <slot name="template">
        <el-skeleton-item v-for="item in items" style="height: 24px; width: 42%"></el-skeleton-item>
      </slot>
    </template>
  </el-skeleton>
</template>

<script>
import createVue from '@jl/web-ui/src/createVue';
export default createVue({
  name: 'Skeleton',
  props: {
    animated: { type: Boolean, default: true },
    rows: { type: Number, default: 3 },
    loading: { type: Boolean, default: true },
  },
  computed: {
    skeletonProps() {
      // 采集props和attrs，确保自定义props和外部额外属性都透传
      return {
        animated: this.animated,
        rows: this.rows,
        loading: this.loading,
        ...this.$attrs,
      };
    },
  },
});
</script>
