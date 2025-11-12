<template>
  <el-slider ref="jlSliderRef" v-bind="$attrs" v-on="$listeners"></el-slider>
</template>

<script>
import createVue from '@jl/web-ui/src/createVue';
export default createVue({
  name: 'Slider',
  data() {
    return {
      unWatchSliderButtonEvent: null,
    };
  },
  methods: {
    watchSliderButtonEvent() {
      const slider = this.$refs.jlSliderRef;
      const button = slider.$refs.button1 || slider.$refs.button2;

      this.unWatchSliderButtonEvent = this.$watch(
        () => [button.dragging, button.isClick],
        ([dragging, isClick]) => {
          if (dragging && isClick) {
            this.$emit('drag-start');
          } else if (dragging && !isClick) {
            this.$emit('drag');
          } else {
            this.$emit('drag-end');
          }
        }
      );
    },
  },
  mounted() {
    this.watchSliderButtonEvent();
  },
  beforeDestroy() {
    this.unWatchSliderButtonEvent();
    this.unWatchSliderButtonEvent = null;
  },
});
</script>

<style scoped lang="scss"></style>
