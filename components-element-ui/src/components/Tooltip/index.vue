<template>
  <el-tooltip class="my-tooltip" v-bind="$attrs" v-on="$listeners" :content="content || internalContent" :disabled="!isOverflow && !alwaysShow" :placement="placement" popper-class="custom-tooltip" effect="dark" :visible-arrow="false">
    <span
      ref="textRef"
      :style="{
        '-webkit-line-clamp': lines,
        '-webkit-box-orient': 'vertical',
        display: '-webkit-inline-box',
        overflow: 'hidden',
      }"
      @mouseenter="checkOverflow">
      <slot></slot>
    </span>
  </el-tooltip>
</template>

<script>
export default {
  name: 'MyTooltip',
  props: {
    lines: {
      type: Number,
      default: 1,
    },
    alwaysShow: {
      type: Boolean,
      default: false,
    },
    content: {
      type: String,
      default: '',
    },
    placement: {
      type: String,
      default: 'top',
    },
  },
  data() {
    return {
      isOverflow: false,
      internalContent: '',
    };
  },
  methods: {
    checkOverflow() {
      const textEl = this.$refs.textRef;
      this.internalContent = textEl.innerText;
      this.isOverflow = textEl.scrollHeight > textEl.clientHeight;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.checkOverflow();
    });
  },
};
</script>

<style scoped>
.my-tooltip {
  white-space: normal;
  word-break: break-all;
  line-height: normal;
}
</style>
<style>
.custom-tooltip.el-tooltip__popper {
  max-width: 400px;
  max-height: 300px;
  overflow-y: auto;
  margin: 4px 0;
}
</style>
