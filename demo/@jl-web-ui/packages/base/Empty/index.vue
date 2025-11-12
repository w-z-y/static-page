<template>
  <el-empty class="jl-empty" ref="jlEmptyRef" v-bind="$attrs" :image-size="internalImageSize">
    <slot></slot>
  </el-empty>
</template>
<script>
import COM_PREFIX from '@jl/web-ui/src/config';
export default {
  name: COM_PREFIX + 'Empty',
  props: {
    imageSize: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      internalImageSize: 0,
    };
  },
  mounted() {
    const jlEmptyRef = this.$refs.jlEmptyRef;
    if (jlEmptyRef) {
      this.internalImageSize = this.imageSize || Math.min(jlEmptyRef.$el.offsetWidth / 2, jlEmptyRef.$el.offsetHeight / 2, 160) || 80;
    }
  },
};
</script>
<style lang="scss" scoped>
.el-empty {
  height: 100%;
  padding: 0;
  justify-content: center;

  ::v-deep {
    .el-empty__description {
      margin-top: 8px;
    }
  }
}
</style>
