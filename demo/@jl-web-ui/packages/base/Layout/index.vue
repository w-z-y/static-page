<template>
  <el-row type="flex" class="jl-layout" :gutter="gap" :style="{ 'row-gap': internalGap }">
    <el-col
      v-for="(option, index) in visibleOptions"
      v-show="visibleFunction(option, index)"
      v-bind="option"
      :key="option.value"
      :span="getColSpan(option)"
      :style="getColStyle(option)">
      <slot :option="option" :options="visibleOptions" :$index="index"></slot>
    </el-col>

    <slot name="footer" :options="visibleOptions"></slot>
  </el-row>
</template>

<script>
import createVue from '@jl/web-ui/src/createVue';
import { handlePxValue } from '@jl/web-ui/src/util';

export default createVue({
  name: 'Layout',
  props: {
    gap: { type: Number, default: 16 },
    options: { type: Array, default: () => [] },
    // 控制显隐 display: none
    visibleFunction: { type: Function, default: () => () => true },
  },
  computed: {
    internalGap() {
      return handlePxValue(this.gap);
    },
    // 过滤显示
    visibleOptions() {
      return this.options.filter((option) => option.visible !== false);
    },
  },
  methods: {
    // 获取列宽度
    getColSpan(option) {
      if (option.span) return option.span;
      return 24;
    },
    // 获取列样式
    getColStyle(option) {
      const style = {
        width: handlePxValue(option.width) || '',
        flex: option.flex || 'none',
      };

      // 合并自定义样式
      if (option.style) {
        Object.assign(style, option.style);
      }

      return style;
    },
  },
});
</script>

<style lang="scss" scoped>
.jl-layout {
  display: flex;
  flex-wrap: wrap;
}
</style>
