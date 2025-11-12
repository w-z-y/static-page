<template>
  <jl-drawer
    :visible.sync="showDrawer"
    class="jl-drawer-split"
    :modal="modal"
    :show-header="false"
    size="100%"
    padding="0"
    v-on="$listeners"
    v-bind="$attrs">
    <div class="flex flex-col overflow-hidden h-full" @mousedown="handleMousedownDrawerOutside" @mouseup="handleMouseupDrawerOutside">
      <div v-if="isSingleSpa" style="height: 54px"></div>
      <jl-split-pane @resize-end="handleResize" hover :default-percent="defaultPercent" :minPercent="minPercent" class="flex-1 overflow-hidden">
        <template #A>
          <div class="opacity-area h-full w-full"></div>
        </template>
        <template #B>
          <div ref="mainRef" class="jl-drawer-split-content h-full">
            <slot></slot>
          </div>
        </template>
      </jl-split-pane>
    </div>
  </jl-drawer>
</template>

<script>
import COM_PREFIX from '@jl/web-ui/src/config';
import JlSplitPane from '../SplitPane';
import JlDrawer from './index.vue';

export default {
  name: COM_PREFIX + 'Drawer.Split',
  components: { JlSplitPane, JlDrawer },
  props: {
    visible: { type: Boolean, default: false },
    defaultPercent: { type: Number, default: 50 },
    minPercent: { type: [Number, Array], default: 20 },
    modal: { type: Boolean, default: false },
  },
  computed: {
    showDrawer: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit('update:visible', val);
      },
    },
    isSingleSpa() {
      return typeof window !== 'undefined' && window.__SINGLE_SPA__;
    },
  },
  data() {
    return {
      isClickWrapperDown: false,
      isClickWrapperUp: false,
    };
  },
  methods: {
    // 鼠标按下
    async handleMousedownDrawerOutside(e) {
      this.isClickWrapperDown = !this.$refs.mainRef.contains(e.target);
    },
    // 鼠标按下和放开的元素都不在范围内时，抽屉消失
    async handleMouseupDrawerOutside(e) {
      this.isClickWrapperUp = !this.$refs.mainRef.contains(e.target);
      if (this.isClickWrapperDown && this.isClickWrapperUp) {
        this.showDrawer = this.isClickWrapperDown = false;
      }
    },
    handleResize(percent) {
      this.$emit('resize-end', percent);
    },
  },
};
</script>

<style scoped lang="scss">
.jl-drawer-split {
  ::v-deep .el-drawer {
    background-color: #0000;
    box-shadow: none;
  }
  .opacity-area {
    box-shadow: inset -10px 0 10px -10px rgba(0, 0, 0, 0.1);
  }
  .jl-drawer-split-content {
    background-color: #fff;
    box-shadow: 0 0 10px #ccc;
    overflow: hidden;
  }
}
</style>
