<template>
  <component v-if="icon" :is="iconComponent" class="jl-icon" :class="icon" :style="{ color, fontSize }" aria-hidden="true" @click="handleClick">
    <template v-if="!isCustomIcon">
      <use :xlink:href="symbolId" />
    </template>
  </component>
  <i v-else class="svg-icon">
    <slot class="jl-icon"></slot>
  </i>
</template>

<script>
import COM_PREFIX from '@jl/web-ui/src/config';
import { handlePxValue } from '@jl/web-ui/src/util';

// iconfont
import '@jl/web-ui/src/assets/fonts/iconfont/iconfont.css';
// 仅在客户端引入会访问 window 的 iconfont.js，避免 SSR 报错
if (typeof window !== 'undefined') {
  require('@jl/web-ui/src/assets/fonts/iconfont/iconfont');
}

// 自定义图标前缀列表
const CUSTOM_ICON_PREFIXES = ['el-icon-', 'icon-ym-', 'ym-custom', 'ym-custom-'];
export default {
  name: COM_PREFIX + 'Icon',
  props: {
    // 图标名称
    icon: { default: '', type: String },
    // 图标颜色
    color: { type: String, default: '' },
    // 字体大小
    size: { type: [String, Number], default: '1em' },
  },
  computed: {
    // SVG图标ID
    symbolId() {
      return `#icon-${this.icon}`;
    },
    // 判断是否为自定义图标
    isCustomIcon() {
      return CUSTOM_ICON_PREFIXES.some((prefix) => this.icon.includes(prefix));
    },
    // 图标组件类型
    iconComponent() {
      return this.isCustomIcon ? 'i' : 'svg';
    },
    // 图标基础类名
    iconClass() {
      return this.isCustomIcon ? 'custom-icon' : 'icon';
    },
    fontSize() {
      return handlePxValue(this.size);
    },
  },
  methods: {
    handleClick(e) {
      this.$emit('click', e);
    },
  },
};
</script>

<style lang="scss" scoped>
.jl-icon,
.svg-icon svg {
  display: inline-block;
  vertical-align: -0.2em;
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
  font-style: normal;
}
.svg-icon {
  line-height: 0;
}
</style>
