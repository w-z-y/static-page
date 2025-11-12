<template>
  <div class="jl-ai-message-container">
    <div ref="bubbleListRef" class="bubble-list-inner scroll-hover h-full relative">
      <slot></slot>
    </div>
    <div v-if="isShowToBottomButton" @click="scrollTopTo()" class="scroll-to-bottom-button-wrapper" :class="{ 'is-loading': loading }">
      <slot name="button">
        <jl-button class="scroll-to-bottom-button" size="large" circle icon="angle-down">
          <template #icon>
            <AngleDownSvg />
          </template>
        </jl-button>
      </slot>
    </div>
    <div class="footer">
      <slot name="footer" :hasScrollbar="hasScrollbar"></slot>
    </div>
  </div>
</template>

<script>
import COM_PREFIX from '@jl/web-ui/src/config';
import createJlComponent from '@jl/web-ui/src/util/createJlComponent';

import { throttle } from '@jl/web-ui/src/util';
import JlButton from '../../base/Button/index.vue';
import AngleDownSvg from '@jl/web-ui/src/assets/svg/angle-down.svg';

const scrollThreshold = 50;
export default createJlComponent({
  name: COM_PREFIX + 'AI.BubbleList',
  components: { JlButton, AngleDownSvg },
  props: {
    // loading状态
    loading: { type: Boolean, default: false },
  },
  computed: {
    // 是否有滚动条
    hasScrollbar() {
      return this.targetParams.scrollHeight > this.targetParams.clientHeight;
    },
    // 距底部剩余滚动高度
    remainScrollHeight() {
      return this.targetParams.scrollHeight - this.targetParams.scrollTop - this.targetParams.clientHeight;
    },
    // 是否显示置底按钮
    isShowToBottomButton() {
      return this.remainScrollHeight >= scrollThreshold;
    },
  },
  data() {
    return {
      isUserrScrolled: false, // 记录用户是否操作了滚轮

      target: null,
      targetParams: {
        scrollHeight: 0,
        scrollTop: 0,
        clientHeight: 0,
      },

      _stopObserve: null,
      _resizeObserver: null,
    };
  },
  methods: {
    async init() {
      await this.$nextTick();
      this.target = this.$refs.bubbleListRef;
      if (!this.target) return;
      // 监听文本变化
      this._stopObserve = observeTextChanges(this.target, this.judge);
      this._resizeObserver = observeSizeChanges(this.target, this.judge);
      this.addEventScroll();
    },
    judge() {
      if (!this.target) return;
      // 没有到底部 && 用户没有滚动过
      if (!this.isShowToBottomButton && !this.isUserrScrolled) {
        this.scrollTopTo();
        return;
      }
      // 用户滚动过,滚动到记忆位置
      if (this.isUserrScrolled) {
        this.target.scrollTop = this.targetParams.scrollTop;
      }
    },
    // 滚动判断
    addEventScroll() {
      if (!this.target) return;
      this.target.addEventListener(
        'scroll',
        () => {
          this.isUserrScrolled = true;
          this.targetParams = {
            scrollTop: this.target.scrollTop,
            scrollHeight: this.target.scrollHeight,
            clientHeight: this.target.clientHeight,
          };
          if (this.hasScrollbar && !this.isShowToBottomButton) {
            this.isUserrScrolled = false;
          }
        },
        { passive: true }
      );
    },
    scrollTopTo(top, behavior = 'auto') {
      const newTop = top || this.$refs.bubbleListRef.scrollHeight;
      this.$refs.bubbleListRef.scrollTo({
        top: newTop,
        behavior,
      });
    },
  },
  activated() {
    this.judge();
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this._stopObserve?.();
    this._resizeObserver?.();
  },
});

function observeTextChanges(element, callback) {
  const throttleFn = throttle((mutation) => {
    callback(mutation);
  }, 1);
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      throttleFn(mutation);
    });
  });

  // 开始观察
  observer.observe(element, {
    childList: true, // 观察子节点的添加/删除
    subtree: true, // 观察所有后代节点
    characterData: true, // 观察文本内容变化
  });

  // 返回停止观察的函数
  return () => observer.disconnect();
}
function observeSizeChanges(element, callback) {
  // 封装监听元素尺寸变化的函数
  const throttleFn = throttle(() => {
    callback();
  }, 1);
  const resizeObserver = new ResizeObserver(() => {
    throttleFn();
  });
  resizeObserver.observe(element);

  // 返回停止观察的函数
  return () => resizeObserver.disconnect();
}
</script>

<style lang="scss" scoped>
.jl-ai-message-container {
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  .bubble-list-inner {
    scrollbar-gutter: stable;
  }

  .is-not-scroll-reach-start {
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 5px;
      box-shadow: inset 0 5px 5px -5px rgba(0, 0, 0, 0.05);
    }
  }
  .is-not-scroll-reach-end {
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 5px;
      box-shadow: inset 0 -5px 5px -5px rgba(0, 0, 0, 0.05);
    }
  }
  .scroll-to-bottom-button-wrapper {
    height: fit-content;
    width: fit-content;
    position: absolute;
    transform: translateX(-50%);
    left: 50%;
    bottom: 20px;
    padding: 2px;
    border-radius: 50%;
    .scroll-to-bottom-button {
      &:hover {
        box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.02), 0 10px 16px 0 rgba(47, 53, 64, 0.14);
      }
    }
    &.is-loading {
      &:before {
        content: '';
        z-index: -6;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: conic-gradient(from 0deg, #0000, #0000, var(--jl-primary));
        animation: rotate 1s linear infinite;
      }
    }
  }
  .footer {
    line-height: 0;
    visibility: hidden;
    position: absolute;
    bottom: 20px;
    left: calc(100% - 20px);
    transform: translateX(-100%);
  }
  &:hover {
    & > .footer {
      visibility: visible;
    }
  }
}
</style>
