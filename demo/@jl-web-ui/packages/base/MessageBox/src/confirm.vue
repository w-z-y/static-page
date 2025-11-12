<template>
  <jl-dialog
    class="jl-confirm-dialog"
    ref="jlDialogRef"
    @ok="handleOk"
    @closed="handleClosed"
    :show-delete-button="showDeleteButton"
    :show-confirm-button="showConfirmButton"
    :loading="isConfirmLoading"
    :visible.sync="visible"
    :delete-button-text="deleteButtonText"
    :confirm-button-text="confirmButtonText"
    :cancel-button-text="cancelButtonText"
    :title="title"
    width="420px">
    <div>{{ content }}</div>
  </jl-dialog>
</template>

<script>
import COM_PREFIX from '@jl/web-ui/src/config';
import JlDialog from '../../Dialog/index.vue';
export default {
  name: COM_PREFIX + 'MessageBox.Confirm',
  inheritAttrs: false,
  components: { JlDialog },
  props: {
    title: { type: String, default: '提示' },
    content: { type: String, default: '此操作将永久删除, 是否继续?' },
    beforeClose: { type: Function, default: () => {} },
    // 默认值，跟dialog相反
    showDeleteButton: { type: Boolean, default: true },
    showConfirmButton: { type: Boolean, default: false },

    deleteButtonText: { type: String, default: '删除' },
    confirmButtonText: { type: String, default: '确认' },
    cancelButtonText: { type: String, default: '取消' },
  },
  data() {
    return {
      visible: false,
      dialogVisible: false,
      isConfirmLoading: false,
    };
  },
  async mounted() {
    await this.$nextTick();
    this.visible = true;
  },
  watch: {
    async visible(val) {
      if (val) {
        await this.$nextTick();
        const confirmBtnRef = this.$refs.jlDialogRef.$refs.confirmBtnRef;
        confirmBtnRef && confirmBtnRef.focus();
      }
    },
  },
  methods: {
    done() {
      this.visible = false;
    },
    async handleOk() {
      try {
        this.isConfirmLoading = true;
        await this.beforeClose();
        this.done();
      } catch (e) {
        this.isConfirmLoading = false;
        Promise.reject(e);
      }
    },
    handleClosed() {
      this.$emit('closed');
    },
  },
};
</script>

<style lang="scss" scoped>
.jl-confirm-dialog {
  ::v-deep .el-dialog {
    .el-dialog__body {
      padding-top: 10px;
      padding-bottom: 30px;
    }
  }
}
</style>
