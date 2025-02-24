<template>
  <div class="space" :style="containerStyle">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "MySpace"
}
</script>

<script setup>
import { computed, useSlots } from "vue";

const slots = useSlots();
const props = defineProps({
  // 间距大小
  size: {
    type: [Number, String],
    default: "small",
  },
  // 排列方向
  direction: {
    type: String,
    default: "horizontal",
    validator: (val) => ["horizontal", "vertical"].includes(val),
  },
  // 对齐方式
  alignment: {
    type: String,
    default: "center",
    validator: (val) => ["start", "end", "center", "baseline"].includes(val),
  },
  // 是否自动换行
  wrap: {
    type: Boolean,
    default: false,
  },
});

// 计算间距大小
const gap = computed(() => {
  const sizes = {
    small: "8px",
    medium: "16px",
    large: "24px",
  };
  return typeof props.size === "number"
    ? `${props.size}px`
    : sizes[props.size] || sizes.small;
});

// 容器样式
const containerStyle = computed(() => ({
  display: "flex",
  flexDirection: props.direction === "vertical" ? "column" : "row",
  flexWrap: props.wrap ? "wrap" : "nowrap",
  alignItems: props.alignment,
  gap: gap.value,
}));

// 子项样式
const itemStyle = computed(() => ({
  flex: "0 0 auto",
}));

// 获取子项数量
const items = computed(() => {
  return Object.keys(slots).length || 1;
});
</script>
