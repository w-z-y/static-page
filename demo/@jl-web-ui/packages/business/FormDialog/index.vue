<!-- 快速表单弹窗 -->

<template>
  <jl-dialog :visible.sync="internalVisible" :title="title" :width="width" :loading="confirmLoading" @ok="handleConfirm" @closed="handleClosed">
    <jl-form ref="formRef" :options="formList" :label-width="formLabelWidth" v-model="internalFormData"></jl-form>
  </jl-dialog>
</template>

<script>
export default {
  name: 'FormDialog',
  props: {
    title: {
      type: String,
      default: '创建',
    },
    width: {
      type: String,
      default: '500px',
    },
    visible: {
      type: Boolean,
      default: false,
    },
    formLabelWidth: {
      type: String,
      default: '140px',
    },
    formData: {
      type: Object,
      default: () => null,
    },
    formList: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    async visible(newVal) {
      if (newVal) {
        await this.$nextTick();
        this.internalFormData = { ...this.formData };
      }
    },
    internalFormData: {
      deep: true,
      handler(newVal) {
        this.$emit('update:formData', newVal);
      },
    },
  },
  computed: {
    internalVisible: {
      get() {
        return this.visible;
      },
      set(value) {
        this.$emit('update:visible', value);
      },
    },
  },
  data() {
    return {
      confirmLoading: false,
      internalFormData: {},
    };
  },
  created() {
    this.internalFormData = { ...this.formData };
  },
  methods: {
    // 点击确认
    handleConfirm() {
      this.$refs.formRef.validate(async (valid) => {
        if (valid) {
          this.confirmLoading = true;
          try {
            await new Promise((resolve, reject) => {
              this.$emit('ok', resolve, reject);
            });
            this.internalVisible = this.confirmLoading = false;
          } catch (e) {
            this.confirmLoading = false;
          }
        }
      });
    },
    // 点击取消
    handleClosed() {
      this.$refs.formRef?.resetFields?.();
    },
  },
};
</script>

<style scoped lang="scss"></style>
