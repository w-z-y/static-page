<template>
  <div class="jl-resizer" v-on="$listeners">
    <slot></slot>
  </div>
</template>

<script>
import createVue from '@jl/web-ui/src/createVue';
import resizeObserver from '@jl/web-ui/src/mixin/resizeObserver';
export default createVue({
  name: 'Resizer',
  mixins: [resizeObserver],
  data() {
    return {};
  },
  methods: {
    elResize(rect) {
      this.$emit('resize', rect);
    },
  },
  mounted() {
    this.$eventBus.$on('el-resize', this.elResize);
  },
  beforeDestroy() {
    this.$eventBus.$off('el-resize', this.elResize);
  },
});
</script>

<style scoped lang="scss"></style>
