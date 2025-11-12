<template>
  <div :class="classes" @mousedown.stop @mouseup.stop :style="{ '--line-hover-color': hoverColor, '--line-hover-width': internalHoverWidth }">
    <!-- 线 -->
    <div class="splitter-pane-resizer-line">
      <div class="splitter-pane-resizer-bar">
        <!-- 线上的按钮，线隐藏，这里的按钮也隐藏 -->
        <slot name="resizer-bar">
          <div class="default-bar"></div>
        </slot>
      </div>
    </div>
    <!-- 按钮-常显的 -->
    <div class="splitter-pane-resizer-bar">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import COM_PREFIX from '@jl/web-ui/src/config/index.js';
import { handlePxValue } from '@jl/web-ui/src/util';
export default {
  name: COM_PREFIX + 'SplitPane.Resizer',
  props: {
    direction: {
      validator(value) {
        return ['vertical', 'horizontal'].indexOf(value) >= 0;
      },
      required: true,
    },
    disabled: { type: Boolean, default: false },
    active: { type: Boolean, default: false },
    className: String,
    hoverColor: { type: String, default: '' },
    hoverWidth: { type: String, default: '1px' },
  },
  computed: {
    classes() {
      const classes = ['splitter-pane-resizer', this.direction, this.className, { 'is-active': this.active }, { 'is-disabled': this.disabled }];
      return classes;
    },
    internalHoverWidth() {
      return handlePxValue(this.hoverWidth);
    },
  },
};
</script>

<style scoped lang="scss">
.splitter-pane-resizer {
  --line-color: rgba(0, 0, 0, 0.2);
  z-index: 2;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: absolute;
  -moz-background-clip: padding;
  -webkit-background-clip: padding;
  background-clip: padding-box;
  &.is-disabled {
    cursor: default !important;
    .splitter-pane-resizer-line {
      display: none;
    }
  }
  .splitter-pane-resizer-line {
    transition: opacity 200ms, background-color 200ms;
    background: var(--line-color);
  }
  .splitter-pane-resizer-bar {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .default-bar {
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      background: #fff;
      border-radius: 3px;
      border: 1px solid var(--line-color);
    }
  }
  &.is-active,
  &:hover {
    .splitter-pane-resizer-line {
      opacity: 1 !important;
      background: var(--line-hover-color, var(--line-color));
    }
  }
}

.splitter-pane-resizer.vertical {
  height: 11px;
  margin: -5px 0;
  border-top: 5px solid rgba(255, 255, 255, 0);
  border-bottom: 5px solid rgba(255, 255, 255, 0);
  cursor: row-resize;
  width: 100%;
  .splitter-pane-resizer-line {
    width: 100%;
    height: 1px;
    transform: translateY(-50%);
    .splitter-pane-resizer-bar .default-bar {
      height: 6px;
      width: 20px;
    }
  }
  &.is-active,
  &:hover {
    .splitter-pane-resizer-line {
      height: var(--line-hover-width) !important;
    }
  }
}

.splitter-pane-resizer.horizontal {
  width: 11px;
  height: 100%;
  margin: 0 -5px;
  border-left: 5px solid rgba(255, 255, 255, 0);
  border-right: 5px solid rgba(255, 255, 255, 0);
  cursor: col-resize;
  .splitter-pane-resizer-line {
    height: 100%;
    width: 1px;
    transform: translateX(-50%);
    .splitter-pane-resizer-bar .default-bar {
      height: 20px;
      width: 6px;
    }
  }
  &.is-active,
  &:hover {
    .splitter-pane-resizer-line {
      width: var(--line-hover-width) !important;
    }
  }
}
</style>
