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
        :key="'slide-' + index"
      >
        <slot :item="item" :index="item && item.index">
          <div class="carousel-item-content">
            {{ item && item.index || item }}
          </div>
        </slot>
      </div>
    </div>
    <Button
      v-if="controls.indexOf('arrows') !== -1"
      type="dark"
      round
      class="carousel-btn prev-btn"
      @click="slidePrev"
    >
      {{ vertical ? "↑" : "←" }}
    </Button>
    <Button
      v-if="controls.indexOf('arrows') !== -1"
      type="dark"
      round
      class="carousel-btn next-btn"
      @click="slideNext"
    >
      {{ vertical ? "↓" : "→" }}
    </Button>
    <div v-if="controls.indexOf('dots') !== -1" class="dots-container">
      <div
        v-for="(_, index) in items"
        :key="'dot-' + index"
        class="dot"
        :class="{ active: displayIndex === index }"
        @click="goToSlide(index)"
      ></div>
    </div>
  </div>
</template>

<script>
import Button from "../Button/index.vue";
import useWheel from "./useWheel";

export default {
  name: "MySwiper",
  props: {
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
  },
  data() {
    return {
      currentIndex: 0,
      isAnimating: false,
      TRANSITION_DURATION: 500,
      autoPlayInterval: null,
    };
  },
  computed: {
    displayItems() {
      if (!this.items.length) return [];
      const last = this.items[this.items.length - 1];
      const first = this.items[0];

      return [last, ...this.items, first].map((item, index) => {
        if (typeof item === "object") {
          if (index === 0) {
            item.index = this.items.length - 1;
          } else if (index === this.items.length - 1) {
            item.index = 0;
          } else {
            item.index = index - 1;
          }
        }
        return item;
      });
    },
    displayIndex() {
      if (this.currentIndex === -1) return this.items.length - 1;
      if (this.currentIndex === this.items.length) return 0;
      return this.currentIndex;
    },
    wrapperStyle() {
      return {
        transform: this.vertical
          ? `translateY(-${100 * (this.currentIndex + 1)}%)`
          : `translateX(-${100 * (this.currentIndex + 1)}%)`,
        transition: this.isAnimating
          ? `transform ${this.TRANSITION_DURATION}ms ease`
          : "none",
      };
    },
  },
  methods: {
    handleSlideEnd(resetIndex = null) {
      setTimeout(() => {
        this.isAnimating = false;
        if (resetIndex !== null) {
          this.currentIndex = resetIndex;
        }
      }, this.TRANSITION_DURATION);
    },
    goToSlide(index) {
      if (this.isAnimating || index === this.currentIndex) return;
      this.isAnimating = true;
      this.currentIndex = index;
      this.handleSlideEnd();
    },
    slideNext() {
      if (this.isAnimating) return;
      this.isAnimating = true;
      this.currentIndex++;
      this.handleSlideEnd(this.currentIndex === this.items.length ? 0 : null);
    },
    slidePrev() {
      if (this.isAnimating) return;
      this.isAnimating = true;
      this.currentIndex--;
      this.handleSlideEnd(this.currentIndex === -1 ? this.items.length - 1 : null);
    },
    startAutoPlay() {
      this.stopAutoPlay();
      if (this.autoPlay && this.items.length > 1) {
        this.autoPlayInterval = setInterval(this.slideNext, this.autoPlayDelay);
      }
    },
    stopAutoPlay() {
      if (this.autoPlayInterval) {
        clearInterval(this.autoPlayInterval);
        this.autoPlayInterval = null;
      }
    },
  },
  mounted() {
    if (this.autoPlay && this.items.length > 1) {
      this.startAutoPlay();
    }
  },
  beforeDestroy() {
    this.stopAutoPlay();
  },
  created() {
    const { handleWheel, handleTouchStart, handleTouchMove, handleTouchEnd } = useWheel({
      vertical: this.vertical,
      onNext: this.slideNext,
      onPrev: this.slidePrev,
    });
    this.handleWheel = handleWheel;
    this.handleTouchStart = handleTouchStart;
    this.handleTouchMove = handleTouchMove;
    this.handleTouchEnd = handleTouchEnd;
  },
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
