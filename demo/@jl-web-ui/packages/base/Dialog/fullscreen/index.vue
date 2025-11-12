<template>
  <transition name="el-zoom-in-center" appear @after-appear="handleAfterEnter" @after-enter="handleAfterEnter" @after-leave="handleAfterLeave">
    <div v-show="visible" class="jl-dialog-fullscreen">
      <div class="dialog-fullscreen-header">
        <el-page-header @back="handleCancel"> </el-page-header>
        <slot name="title">{{ title }}</slot>
        <div class="options">
          <slot name="options"></slot>
          <jl-button v-if="showConfirmButton" primary @click="handleConfirm()" :loading="loading" :disabled="disabled">
            {{ confirmButtonText }}
          </jl-button>
          <jl-button v-if="showCancelButton" @click="handleCancel()">
            {{ cancelButtonText }}
          </jl-button>
        </div>
      </div>
      <main :style="{ padding: internalPadding }">
        <slot></slot>
      </main>
    </div>
  </transition>
</template>

<script>
import COM_PREFIX from '@jl/web-ui/src/config';
import { handlePxValue } from '@jl/web-ui/src/util';
import JlButton from '../../Button';
export default {
  name: COM_PREFIX + 'Dialog.Fullscreen',
  inheritAttrs: false,
  components: { JlButton },
  props: {
    title: { type: String, default: '' },
    visible: { type: Boolean, default: false },
    loading: { type: Boolean, default: false }, // 针对确认按钮的
    disabled: { type: Boolean, default: false }, // 针对确认按钮的
    showConfirmButton: { type: Boolean, default: true },
    showCancelButton: { type: Boolean, default: true },
    padding: { type: [Number, String, Array], default: '10px' },

    confirmButtonText: { type: String, default: '确认' },
    cancelButtonText: { type: String, default: '取消' },
  },
  data() {
    return {
      btnLoading: false,
      showContent: false,
    };
  },
  computed: {
    internalPadding() {
      return handlePxValue(this.padding);
    },
  },
  watch: {},
  methods: {
    handleAfterEnter() {
      this.$emit('opened');
    },
    handleAfterLeave() {
      this.$emit('closed');
    },
    handleCancel() {
      this.$emit('update:visible', false);
      this.$emit('close');
    },
    handleConfirm() {
      this.$emit('ok', this.handleCancel);
    },
  },
};
</script>
<style lang="scss" scoped>
.jl-dialog-fullscreen {
  position: absolute;
  background-color: #fff;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 100;
  overflow: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  .dialog-fullscreen-header {
    padding: 14px 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid var(--jl-border-color);
    .options {
      flex-shrink: 0;
      margin-left: auto;
    }
  }
  main {
    flex: 1;
    overflow: auto;
  }
}
</style>
