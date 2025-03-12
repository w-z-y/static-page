<template>
  <div class="my-grid-container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'MyGrid',
  props: {
    // 间距
    gap: {
      type: [Number, String, Array],
      default: () => [10, 20],
    },
    /* 
    
    
      响应式
    
    
    */
    // <768px
    xs: {
      type: Number,
      default: 1,
    },
    // ≥768px
    sm: {
      type: Number,
      default: 2,
    },
    // ≥992px
    md: {
      type: Number,
      default: 4,
    },
    // ≥1200px
    lg: {
      type: Number,
      default: 5,
    },
    // ≥1920px
    xl: {
      type: Number,
      default: 6,
    },
  },
  computed: {
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
.my-grid-container {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(v-bind(xs), 1fr);
  gap: v-bind('formattedGap');
}

@media screen and (min-width: 768px) {
  .my-grid-container {
    grid-template-columns: repeat(v-bind(sm), 1fr);
  }
}

@media screen and (min-width: 992px) {
  .my-grid-container {
    grid-template-columns: repeat(v-bind(md), 1fr);
  }
}

@media screen and (min-width: 1200px) {
  .my-grid-container {
    grid-template-columns: repeat(v-bind(lg), 1fr);
  }
}

@media screen and (min-width: 1920px) {
  .my-grid-container {
    grid-template-columns: repeat(v-bind(xl), 1fr);
  }
}
</style>
