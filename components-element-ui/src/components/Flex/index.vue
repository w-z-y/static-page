<template>
  <div class="my-flex-container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'MyFlex',
  props: {
    // 间距
    gap: {
      type: [Number, String, Array],
      default: () => [10, 20],
    },
    // 是否垂直排列
    vertical: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    flexDirection() {
      return this.vertical ? 'column' : 'row';
    },
    formattedGap() {
      const gap = this.gap;
      if (Array.isArray(gap)) {
        return gap.map((item) => (typeof item === 'number' ? `${item}px` : item)).join(' ');
      }
      return typeof gap === 'number' ? `${gap}px` : gap;
    },
  },
};
</script>

<style scoped lang="scss">
.my-flex-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: v-bind('formattedGap');
  flex-direction: v-bind('flexDirection');
}

</style>
