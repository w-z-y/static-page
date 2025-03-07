<template>
  <el-image :src="getUrl(src, 'one')" :preview-src-list="getUrl(previewSrcList.length ? previewSrcList : src, 'many')" />
</template>

<script>
import { getUrl } from '@/utils/util';

export default {
  name: 'MyImage',
  props: {
    src: {
      type: String,
      required: true,
    },
    previewSrcList: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    getUrl,
  },
};
</script>
