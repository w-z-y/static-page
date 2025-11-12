<template>
  <el-dialog
    :visible.sync="showDialog"
    :title="title"
    :close-on-click-modal="closeOnClickModal"
    :class="{ 'no-footer': !footer }"
    :style="{ '--max-width': width, '--body-padding': padding }"
    class="jl-dialog"
    append-to-body
    v-draggable="{ containment: true }"
    v-bind="$attrs"
    v-on="$listeners">
    <template #title>
      <div class="flex items-center justify-between h-full">
        <div class="flex overflow-hidden">
          <jl-tooltip :rows="1" disabled class="flex-1">{{ title }}</jl-tooltip>
          <div class="jl-dialog-title-tip" v-if="$slots.tip || tip">
            （<slot name="tip"> {{ tip }} </slot>）
          </div>
        </div>
        <jl-icon.hover icon="el-icon-close" @click="handleCancel" @mousedown.native.stop style="transform: translateX(10px)" />
      </div>
    </template>
    <slot />
    <template #footer>
      <slot name="footer">
        <jl-button @click="handleCancel"> {{ cancelButtonText }} </jl-button>
        <jl-button v-if="showDeleteButton" ref="confirmBtnRef" :loading="loading" danger @click="handleConfirm">{{ deleteButtonText }} </jl-button>
        <jl-button v-if="showConfirmButton" ref="confirmBtnRef" :loading="loading" primary @click="handleConfirm">{{ confirmButtonText }} </jl-button>
      </slot>
    </template>
  </el-dialog>
</template>

<script>
import COM_PREFIX from '@jl/web-ui/src/config';
import draggable from './drag';

import JlButton from '../Button';
import JlTooltip from '../Tooltip';
import JlIconHover from '../Icon/hover';

export default {
  name: COM_PREFIX + 'Dialog',
  inheritAttrs: false,
  components: { JlButton, JlTooltip, 'JlIcon.hover': JlIconHover },
  props: {
    title: { type: String, default: '' },
    visible: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    footer: { type: Boolean, default: true },
    width: { type: String, default: '' },
    padding: { type: String, default: '16px 24px' },
    closeOnClickModal: { type: Boolean, default: false },

    showDeleteButton: { type: Boolean, default: false },
    showConfirmButton: { type: Boolean, default: true },

    deleteButtonText: { type: String, default: '删除' },
    confirmButtonText: { type: String, default: '确认' },
    cancelButtonText: { type: String, default: '取消' },
    // 标题附加内容
    tip: { type: String, default: '' },
  },
  directives: {
    draggable,
  },
  computed: {
    showDialog: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit('update:visible', val);
      },
    },
  },
  methods: {
    handleCancel() {
      this.showDialog = false;
      this.$emit('cancel');
    },
    handleConfirm() {
      this.$emit('ok', this.handleCancel);
    },
  },
};
</script>

<style lang="scss" scoped>
.jl-dialog {
  .jl-dialog-title-tip {
    font-size: 12px;
    color: #888;
    white-space: nowrap;
  }
  &.no-footer {
    ::v-deep .el-dialog__footer {
      display: none;
    }
  }
  ::v-deep .el-dialog {
    display: flex;
    width: 100%;
    max-width: var(--max-width);
    flex-direction: column;
    overflow: hidden;
    border-radius: var(--jl-dialog-border-radius);

    .el-dialog__header {
      padding: 0 20px;
      height: 56px;
      line-height: 56px;
      border-bottom: 1px solid var(--jl-border-color);
      height: 52px;
      line-height: 52px;
      border-bottom: none;
      .el-dialog__headerbtn {
        display: none;
      }
    }
    .el-dialog__body {
      padding: var(--body-padding);
      flex: 1;
      overflow: auto;
    }
    .el-dialog__footer {
      padding: 0 24px 16px;
    }
  }
}
</style>
