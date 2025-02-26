<template>
  <div class="space" :style="containerStyle">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "MySpace",
  props: {
    // 间距大小
    size: {
      type: [Number, String],
      default: "small",
    },
    // 排列方向
    direction: {
      type: String,
      default: "horizontal",
      validator: function (val) {
        return ["horizontal", "vertical"].indexOf(val) !== -1;
      },
    },
    // 对齐方式
    alignment: {
      type: String,
      default: "start",
      validator: function (val) {
        return ["start", "end", "center", "baseline"].indexOf(val) !== -1;
      },
    },
    // 是否自动换行
    wrap: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    // 计算间距大小
    gap() {
      const sizes = {
        small: "8px",
        medium: "16px",
        large: "24px",
      };
      return typeof this.size === "number"
        ? `${this.size}px`
        : sizes[this.size] || sizes.small;
    },
    // 容器样式
    containerStyle() {
      return {
        display: "flex",
        flexDirection: this.direction === "vertical" ? "column" : "row",
        flexWrap: this.wrap ? "wrap" : "nowrap",
        alignItems: this.alignment,
        gap: this.gap,
      };
    },
    // 子项样式
    itemStyle() {
      return {
        flex: "0 0 auto",
      };
    },
    // 获取子项数量
    items() {
      return Object.keys(this.$slots).length || 1;
    },
  },
};
</script>
