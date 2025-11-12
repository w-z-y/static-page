<template>
  <div
    :style="{ cursor, userSelect }"
    class="jl-split-pane clearfix"
    :class="[direction, { 'is-transition': transition && isTransition, 'is-hover': hover }]">
    <!-- 左/上 Pane，增加右/下 padding -->
    <pane v-on="$listeners" class="splitter-pane splitter-paneL" :direction="direction" :style="[reverse ? paneBStyle : paneAStyle, paneAExtraStyle]">
      <slot name="A"></slot>
    </pane>
    <resizer
      v-bind="$attrs"
      :disabled="disabled"
      :style="resizerStyle"
      :active="active"
      :direction="direction"
      @mousedown.native="onMouseDown"
      @click.native="onClick">
      <template #resizer-bar>
        <slot name="resizer-bar"></slot>
      </template>
      <slot name="resizer"></slot>
    </resizer>
    <!-- 右/下 Pane，增加左/上 padding -->
    <pane v-on="$listeners" class="splitter-pane splitter-paneR" :direction="direction" :style="[reverse ? paneAStyle : paneBStyle, paneBExtraStyle]">
      <slot name="B"></slot>
    </pane>
    <div class="jl-split-pane-mask" v-if="active"></div>
  </div>
</template>

<script>
import COM_PREFIX from '@jl/web-ui/src/config/index.js';
import { handlePxValue } from '@jl/web-ui/src/util';
import Resizer from './resizer.vue';
import Pane from './pane.vue';

const getPxMode = (val) => val !== null && val !== undefined && val !== '' && (typeof val === 'number' || (typeof val === 'string' && val !== ''));
const isBetween0And100 = (val) => typeof val === 'number' && val >= 0 && val <= 100;

export default {
  name: COM_PREFIX + 'SplitPane',
  components: { Resizer, Pane },
  props: {
    minSize: { type: [Array, String, Number], default: 200 },
    minPercent: {
      type: [Array, Number],
      default: 20,
      validator(val) {
        if (Array.isArray(val)) {
          return val.every(isBetween0And100);
        }
        return isBetween0And100(val);
      },
    },
    defaultSize: { type: [String, Number], default: null },
    defaultPercent: {
      type: Number,
      default: 50,
      validator(val) {
        return isBetween0And100(val);
      },
    },
    // 方向
    direction: {
      validator: (v) => ['vertical', 'horizontal'].includes(v),
      default: 'horizontal',
    },
    // 反向
    reverse: {
      type: Boolean,
      default: false,
    },
    disabled: { type: Boolean, default: false },
    hover: { type: Boolean, default: false },
    transition: { type: Boolean, default: false },
    gap: { type: Number, default: 0 },
  },
  computed: {
    internalGap() {
      return handlePxValue(this.gap);
    },
    paneAStyle() {
      const key = this.type;
      return { [key]: this.isPxMode ? this.currentPx : `${this.percent}%` };
    },
    paneBStyle() {
      return { flex: 1 };
    },
    // 根据方向和reverse，分别给左右/上下Pane设置额外的padding
    paneAExtraStyle() {
      if (!this.internalGap) return {};
      // 水平分割线 ┃
      if (this.direction === 'horizontal') {
        // reverse: true时，paneA是右边panel，否则左边；要求左边右padding/right内边距，右边左padding/left内边距
        return this.reverse ? { paddingLeft: this.internalGap } : { paddingRight: this.internalGap };
      } else {
        // 垂直分割线 ━
        // reverse: true时，paneA是下边panel，否则上边；要求上面下padding/bottom内边距，下面上padding/top内边距
        return this.reverse ? { paddingTop: this.internalGap } : { paddingBottom: this.internalGap };
      }
    },
    paneBExtraStyle() {
      if (!this.internalGap) return {};
      if (this.direction === 'horizontal') {
        // reverse: true时，paneB是左边panel，否则右边；要求左边右padding/right内边距，右边左padding/left内边距
        return this.reverse ? { paddingRight: this.internalGap } : { paddingLeft: this.internalGap };
      } else {
        return this.reverse ? { paddingBottom: this.internalGap } : { paddingTop: this.internalGap };
      }
    },
    resizerStyle() {
      const key = this.resizeType;
      return { [key]: this.isPxMode ? this.currentPx : this.percent + '%' };
    },
    userSelect() {
      return this.active ? 'none' : '';
    },
    cursor() {
      return this.active ? (this.direction === 'horizontal' ? 'col-resize' : 'row-resize') : '';
    },
    isPxMode() {
      return getPxMode(this.defaultSize);
    },
    defaultSizePx() {
      return this.isPxMode ? handlePxValue(this.defaultSize) : null;
    },
  },
  watch: {
    defaultPercent(val) {
      if (!this.isPxMode) this.percent = val;
    },
    defaultSize(val) {
      if (this.isPxMode) {
        this.currentPx = handlePxValue(val);
      }
    },
  },
  created() {
    this.internalDefaultSize = this.defaultSize;
    this.internalDefaultPercent = this.defaultPercent;
  },
  data() {
    const isHorizontal = this.direction === 'horizontal';
    return {
      isTransition: true,
      active: false,
      hasMoved: false,
      percent: this.defaultPercent,
      currentPx: handlePxValue(this.defaultSize || 0),
      type: isHorizontal ? 'width' : 'height',
      resizeType: isHorizontal ? (this.reverse ? 'right' : 'left') : this.reverse ? 'bottom' : 'top',
      rafId: null,
      lastEvent: null,

      internalDefaultSize: null,
      internalDefaultPercent: null,

      internalSizeRange: null,
      internalPercentRange: null,
    };
  },
  methods: {
    async initMin() {
      if (this.isPxMode) {
        // 固定尺寸的
        if (Array.isArray(this.minSize)) {
          const min = Math.min(parseFloat(this.minSize[0]), this.internalDefaultSize);
          const max = parseFloat(this.minSize[1]);
          this.internalSizeRange = { min, max };
        } else {
          const min = Math.min(parseFloat(this.minSize), this.internalDefaultSize || 0);
          const { size } = this.getContainerMetrics();
          const max = size - min;
          this.internalSizeRange = { min, max };
        }
      } else {
        // 百分比的
        if (Array.isArray(this.minPercent)) {
          const min = Math.min(Number(this.minPercent[0]) || 0, this.internalDefaultPercent);
          const max = Number(this.minPercent[1]) || 100 - min;
          this.internalPercentRange = { min, max };
        } else {
          const min = Math.min(Number(this.minPercent) || 0, this.internalDefaultPercent);
          const max = 100 - min;
          this.internalPercentRange = { min, max };
        }
      }
    },
    // 比较大小，取范围内的有效值
    clamp(value, min, max) {
      if (value < min) return min;
      if (value > max) return max;
      return value;
    },
    // 保留两位小数
    roundTo2(num) {
      return Math.round(num * 100) / 100;
    },
    // Compute start position and size of the container in page coordinates
    getContainerMetrics() {
      const rect = this.$el.getBoundingClientRect();
      const isHorizontal = this.direction === 'horizontal';
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || 0;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
      const start = isHorizontal ? rect.left + scrollLeft : rect.top + scrollTop;
      const size = isHorizontal ? rect.width : rect.height;
      return { start, size };
    },
    onClick() {
      if (!this.hasMoved && !this.isPxMode) {
        this.$emit('resize', this.percent);
      }
    },
    onMouseDown() {
      if (this.disabled) return;
      this.initMin();

      this.active = true;
      this.isTransition = false;
      this.hasMoved = false;
      window.addEventListener('mousemove', this.onMouseMoveRAF, true);
      window.addEventListener('mouseup', this.onMouseUp, true);
    },
    onMouseUp() {
      if (!this.active) return;
      this.active = false;
      this.isTransition = true;
      this.$emit('resize-end', this.isPxMode ? this.currentPx : this.percent);

      window.removeEventListener('mousemove', this.onMouseMoveRAF, true);
      window.removeEventListener('mouseup', this.onMouseUp, true);
      if (this.rafId) cancelAnimationFrame(this.rafId);
      this.rafId = null;
      this.lastEvent = null;
    },
    onMouseMoveRAF(e) {
      this.lastEvent = e;
      if (!this.rafId) this.rafId = requestAnimationFrame(this.handleRAFMove);
    },
    handleRAFMove() {
      if (!this.active || !this.lastEvent) {
        this.rafId = null;
        return;
      }
      const e = this.lastEvent;
      const isHorizontal = this.direction === 'horizontal';
      const { start, size } = this.getContainerMetrics();
      let pointer = isHorizontal ? e.pageX : e.pageY;

      let pos;
      if (this.reverse) {
        pos = start + size - pointer;
      } else {
        pos = pointer - start;
      }
      const isPx = this.isPxMode;
      const rangeObj = isPx ? this.internalSizeRange : this.internalPercentRange;

      if (isPx) {
        const clampedPx = this.clamp(pos, rangeObj.min, rangeObj.max);
        this.currentPx = handlePxValue(clampedPx);
        this.$emit('resize', this.currentPx);
      } else {
        let percent = this.clamp((pos / size) * 100, rangeObj.min, rangeObj.max);
        percent = this.roundTo2(percent);
        if (percent >= rangeObj.min && percent <= rangeObj.max) this.percent = percent;
        this.$emit('resize', this.percent);
      }
      this.hasMoved = true;
      this.rafId = null;
    },
  },
  beforeDestroy() {
    window.removeEventListener('mousemove', this.onMouseMoveRAF, true);
    window.removeEventListener('mouseup', this.onMouseUp, true);
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.rafId = null;
  },
};
</script>

<style scoped lang="scss">
.jl-split-pane {
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;

  &.clearfix:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: ' ';
    clear: both;
    height: 0;
  }

  &.vertical {
    flex-direction: column;
  }
  &.is-transition {
    .splitter-pane-resizer {
      transition: left 0.2s, top 0.2s;
    }
    .splitter-pane {
      transition: width 0.2s;
    }
  }
  &.is-hover {
    & > ::v-deep .splitter-pane-resizer {
      .splitter-pane-resizer-line {
        opacity: 0;
      }
    }
  }
}
.jl-split-pane-mask {
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
}
</style>
