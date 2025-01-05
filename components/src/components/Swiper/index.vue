<template>
  <div
    class="carousel-container"
    @mouseenter="stopAutoPlay"
    @mouseleave="startAutoPlay"
    @wheel="handleWheel"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
    :class="{ vertical: vertical }"
  >
    <div class="carousel-wrapper" :style="wrapperStyle">
      <div
        class="carousel-item"
        v-for="(item, index) in displayItems"
        :key="`slide-${index}`"
      >
        <slot :item="item" :index="item?.index">
          <div class="carousel-item-content">
            {{ item?.index || item }}
          </div>
        </slot>
      </div>
    </div>
    <Button
      v-if="controls.includes('arrows')"
      type="dark"
      round
      class="carousel-btn prev-btn"
      @click="slidePrev"
    >
      {{ vertical ? "↑" : "←" }}
    </Button>
    <Button
      v-if="controls.includes('arrows')"
      type="dark"
      round
      class="carousel-btn next-btn"
      @click="slideNext"
    >
      {{ vertical ? "↓" : "→" }}
    </Button>
    <div v-if="controls.includes('dots')" class="dots-container">
      <div
        v-for="(_, index) in items"
        :key="`dot-${index}`"
        class="dot"
        :class="{ active: displayIndex === index }"
        @click="goToSlide(index)"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import Button from "../Button/index.vue";
import useWheel from "./useWheel";

const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: () => [],
    validator: (value) => value.length > 0,
  },
  autoPlay: {
    type: Boolean,
    default: false,
  },
  autoPlayDelay: {
    type: Number,
    default: 3000,
    validator: (value) => value >= 1000,
  },
  vertical: {
    type: Boolean,
    default: false,
  },
  controls: {
    type: Array,
    default: () => [],
    validator: (value) => {
      return value.every((item) => ["arrows", "dots"].includes(item));
    },
  },
});

const currentIndex = ref(0);
const isAnimating = ref(false);
const TRANSITION_DURATION = 500;
let autoPlayInterval = null;

const displayItems = computed(() => {
  if (!props.items.length) return [];
  const last = props.items[props.items.length - 1];
  const first = props.items[0];

  return [last, ...props.items, first].map((item, index) => {
    if (typeof item === "object") {
      if (index === 0) {
        item.index = props.items.length - 1;
      } else if (index === props.items.length - 1) {
        item.index = 0;
      } else {
        item.index = index - 1;
      }
    }
    return item;
  });
});

const displayIndex = computed(() => {
  if (currentIndex.value === -1) return props.items.length - 1;
  if (currentIndex.value === props.items.length) return 0;
  return currentIndex.value;
});

const wrapperStyle = computed(() => ({
  transform: props.vertical
    ? `translateY(-${100 * (currentIndex.value + 1)}%)`
    : `translateX(-${100 * (currentIndex.value + 1)}%)`,
  transition: isAnimating.value
    ? `transform ${TRANSITION_DURATION}ms ease`
    : "none",
}));

const handleSlideEnd = (resetIndex = null) => {
  setTimeout(() => {
    isAnimating.value = false;
    if (resetIndex !== null) {
      currentIndex.value = resetIndex;
    }
  }, TRANSITION_DURATION);
};

const goToSlide = (index) => {
  if (isAnimating.value || index === currentIndex.value) return;
  isAnimating.value = true;
  currentIndex.value = index;
  handleSlideEnd();
};

const slideNext = () => {
  if (isAnimating.value) return;
  isAnimating.value = true;
  currentIndex.value++;
  handleSlideEnd(currentIndex.value === props.items.length ? 0 : null);
};

const slidePrev = () => {
  if (isAnimating.value) return;
  isAnimating.value = true;
  currentIndex.value--;
  handleSlideEnd(currentIndex.value === -1 ? props.items.length - 1 : null);
};

const startAutoPlay = () => {
  stopAutoPlay();
  if (props.autoPlay && props.items.length > 1) {
    autoPlayInterval = setInterval(slideNext, props.autoPlayDelay);
  }
};

const stopAutoPlay = () => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
    autoPlayInterval = null;
  }
};

const { handleWheel, handleTouchStart, handleTouchMove, handleTouchEnd } = useWheel({
  vertical: props.vertical,
  onNext: slideNext,
  onPrev: slidePrev,
});

onMounted(() => {
  if (props.autoPlay && props.items.length > 1) {
    startAutoPlay();
  }
});

onUnmounted(() => {
  stopAutoPlay();
});
</script>

<style scoped lang="scss">
@use "./index.scss" as *;
</style>
