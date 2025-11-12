<!-- 支持点击预览 preview -->
<template>
  <el-image
    class="jl-image"
    :style="imgSize"
    :title="title"
    v-bind="$attrs"
    v-on="$listeners"
    :src="src"
    :preview-src-list="isPreview ? internalPreviewList : []">
    <template #placeholder>
      <div class="image-slot placeholder-animation" :title="src"></div>
    </template>
    <template #error>
      <div class="image-slot error" :title="src">
        <slot name="error">
          <i class="el-icon-picture-outline"></i>
        </slot>
      </div>
    </template>
  </el-image>
</template>

<script>
import createVue from '@jl/web-ui/src/createVue';
import { handlePxValue } from '@jl/web-ui/src/util/index';

export default createVue({
  name: 'Image',
  props: {
    src: { type: String, required: true },
    width: { type: [String, Number], default: 100 },
    height: { type: [String, Number], default: 'auto' },
    preview: { type: Boolean, default: false },
    previewSrcList: { type: Array, default: () => [] },
  },
  computed: {
    isPreview() {
      return this.preview || this.previewSrcList.length;
    },
    title() {
      return this.isPreview ? '点击预览' : '';
    },
    internalPreviewList() {
      return this.previewSrcList.length ? this.previewSrcList : [this.src];
    },
    imgSize() {
      return { width: handlePxValue(this.width), height: handlePxValue(this.height) };
    },
  },
});
</script>

<style scoped lang="scss">
.jl-image {
  font-size: 0;
  line-height: 0;
  vertical-align: text-bottom;

  ::v-deep {
    .image-slot {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 200px;
      background: #f5f7fa;
      color: #909399;
      &.placeholder-animation {
        animation: skeleton-loading 2s infinite linear;
        background: linear-gradient(90deg, #f5f7fa 25%, #e6e8eb 50%, #f5f7fa 75%);
        background-size: 200% 100%;
        height: auto;
        aspect-ratio: 1 / 1;

        @keyframes skeleton-loading {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      }
    }
  }
}
</style>
