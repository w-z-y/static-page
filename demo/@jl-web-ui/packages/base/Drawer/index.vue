<template>
  <el-drawer
    :z-index="2000"
    :class="{ 'show-header': showHeader }"
    :visible.sync="showDrawer"
    :wrapper-closable="wrapperClosable"
    :size="size"
    class="jl-drawer"
    append-to-body
    v-bind="$attrs"
    v-on="$listeners">
    <template #title>
      <div class="flex items-center justify-between">
        <div class="flex-1">
          <slot name="title">
            {{ title }}
          </slot>
        </div>
        <jl-icon.hover icon="close" @click="handleCancel" />
      </div>
    </template>

    <div class="flex-col h-full" :style="{ padding: internalPadding }">
      <div class="flex-1 overflow-auto">
        <slot />
      </div>
      <div v-if="footer" class="drawer-footer flex justify-end">
        <jl-button icon="el-icon-circle-close" @click="handleCancel"> 取消 </jl-button>
        <jl-button icon="el-icon-circle-check" :loading="loading" primary @click="handleConfirm"> 确认 </jl-button>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import COM_PREFIX from '@jl/web-ui/src/config';
import { handlePxValue } from '@jl/web-ui/src/util';

import JlButton from '../Button';
import JlIconHover from '../Icon/hover';

export default {
  name: COM_PREFIX + 'Drawer',
  inheritAttrs: false,
  components: { JlButton, 'JlIcon.hover': JlIconHover },
  props: {
    showHeader: { type: Boolean, default: true },
    title: { type: String, default: '' },
    size: { type: [Number, String], default: '50%' },
    padding: { type: [Number, String, Array], default: '10px' },
    visible: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    footer: { type: Boolean, default: false },
    wrapperClosable: { type: Boolean, default: false },
  },
  computed: {
    internalPadding() {
      return handlePxValue(this.padding);
    },
    showDrawer: {
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
      this.showDrawer = false;
    },
    handleConfirm() {
      this.$emit('ok', this.handleCancel);
    },
  },
};
</script>

<style lang="scss" scoped>
.jl-drawer {
  ::v-deep .el-drawer__container {
    .el-drawer__header {
      display: none;
      padding: 0 20px;
      height: 56px;
      line-height: 56px;
      border-bottom: 1px solid var(--jl-border-color);
      margin: 0;
      .el-drawer__close-btn {
        display: none;
        opacity: 0;
      }
    }
  }
  &.show-header {
    ::v-deep .el-drawer__container {
      .el-drawer__header {
        display: flex;
      }
    }
  }
  .drawer-footer {
    padding: 10px;
  }
}
</style>
