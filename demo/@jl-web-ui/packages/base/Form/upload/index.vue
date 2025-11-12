<template>
  <el-upload class="jl-upload" v-bind="$attrs" v-on="$listeners" :action="action" :drag="drag" :style="{ '--width': width }">
    <slot>
      <template v-if="drag">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </template>
      <template v-else>
        <jl-button primary>点击上传</jl-button>
      </template>
    </slot>
    <template #tip>
      <div class="el-upload__tip">
        <slot name="tip">
          {{ tip }}
        </slot>
      </div>
    </template>
  </el-upload>
</template>

<script>
import COM_PREFIX from '@jl/web-ui/src/config';
import JlButton from '../../Button';
export default {
  name: COM_PREFIX + 'Form.Upload',
  components: { JlButton },
  props: {
    tip: {
      type: String,
      default: '',
    },
    drag: {
      type: Boolean,
      default: false,
    },
    action: {
      type: String,
      default: '',
    },
    width: {
      type: String,
      default: '360px',
    },
  },
};
</script>

<style scoped lang="scss">
.jl-upload {
  ::v-deep .el-upload {
    width: var(--width);
    .el-upload-dragger {
      width: var(--width);
    }
  }
}
</style>
