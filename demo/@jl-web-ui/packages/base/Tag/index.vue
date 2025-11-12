<!-- 废弃原有的 effect 属性 -->
<template>
  <el-tag
    :class="{ 'is-plain': plain, 'is-border': border, 'jl-tag-custom-color': color, 'is-text-background': textBackground }"
    :style="{ fontSize, ...colorVarStyle }"
    :effect="plain ? 'light' : 'dark'"
    size="mini"
    class="jl-tag"
    v-bind="$attrs"
    v-on="$listeners">
    <slot></slot>
  </el-tag>
</template>

<script>
import COM_PREFIX from '@jl/web-ui/src/config';
import { handlePxValue } from '@jl/web-ui/src/util';
import mix from 'mix-css-color';

export default {
  name: COM_PREFIX + 'Tag',
  props: {
    // 字体大小
    size: { type: [String, Number], default: '12px' },
    // 朴素
    plain: { type: Boolean, default: false },
    // 边框
    border: { type: Boolean, default: true },
    // 自定义颜色
    color: { type: String },
    // 文本类标签-是否需要背景色
    textBackground: { type: Boolean, default: false },
  },
  computed: {
    fontSize() {
      return handlePxValue(this.size);
    },
    colorVarStyle() {
      return {
        '--custom-color': this.color,
        '--custom-border-color': this.color && this.mixBgColor(),
        '--custom-bg-color': this.color && this.mixBgColor(10),
      };
    },
  },
  methods: {
    mixBgColor(weight = 50) {
      const { hex } = mix(this.color, '#fff', weight);
      return hex;
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../../src/style/components/tag.scss';

.jl-tag {
  position: relative;
  height: auto;
  padding-block: 2px;
  line-height: 1.5;

  @include jl-tag-base;

  &.jl-tag-custom-color {
    color: #fff;
    background-color: var(--custom-color);
    border-color: var(--custom-color);
    &.is-plain {
      background-color: var(--custom-bg-color);
      color: var(--custom-color);
      border-color: var(--custom-color);
    }
    &.el-tag[text] {
      color: var(--custom-color);
      border-color: transparent;
      background-color: transparent;
      &.is-text-background,
      &:hover {
        background-color: var(--custom-bg-color);
      }

      ::v-deep .el-tag__close {
        color: #fff;
        background-color: var(--custom-color);
      }
    }
    ::v-deep .el-tag__close {
      color: #fff;
      &:hover {
        color: var(--custom-color);
        background-color: #fff;
      }
    }
    &:not(.el-tag--dark) {
      // close图标
      ::v-deep .el-tag__close {
        color: var(--custom-color);
        &:hover {
          color: #fff;
          background-color: var(--custom-color);
        }
      }
    }
  }
}
</style>
