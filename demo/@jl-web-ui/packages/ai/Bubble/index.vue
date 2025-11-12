<!-- 
avatar 头像的外层容器
header 头部的容器
content 聊天内容的容器
footer 底部的容器
-->
<template>
  <div
    class="my-bubble"
    :class="{
      'my-bubble-start': placement === 'start',
      'my-bubble-end': placement === 'end',
      'is-block': block,
    }">
    <div class="my-bubble-content-wrapper">
      <div v-if="$slots.header" class="my-bubble-header">
        <slot name="header">
          <!-- header -->
        </slot>
      </div>

      <div class="my-bubble-content">
        <slot name="content">{{ content }}</slot>
      </div>

      <div v-if="$slots.footer" class="my-bubble-footer">
        <slot name="footer"> </slot>
      </div>
    </div>
  </div>
</template>
<script>
import COM_PREFIX from '@jl/web-ui/src/config';
export default {
  name: COM_PREFIX + 'Ai.Bubble',
  props: {
    placement: {
      type: String,
      default: 'start',
    },
    block: {
      type: Boolean,
      default: false,
    },
    content: {
      type: String,
      default: '',
    },
  },
};
</script>
<style lang="scss" scoped>
.my-bubble {
  display: flex;
  gap: 12px;

  // 非第一个 .my-bubble 元素 margin-bottom: 10px
  & + .my-bubble {
    margin-top: 10px;
  }

  &.is-block {
    .my-bubble-content-wrapper {
      .my-bubble-content {
        width: auto;
      }
    }
  }

  .my-bubble-content-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;
    color: var(--jl-global-color);

    .my-bubble-header {
    }

    .my-bubble-content {
      line-height: 1.5;
      border-radius: 8px;
      padding: 8px 20px;
      width: fit-content;
      word-break: break-word;
    }
    .my-bubble-footer {
      color: var(--jl-global-color);
    }
  }

  &.my-bubble-start {
    .my-bubble-content-wrapper {
      .my-bubble-content {
        background-color: var(--jl-bubble-background-color);
        padding: 15px;
      }
    }
  }
  &.my-bubble-end {
    justify-content: flex-end;
    .my-bubble-content-wrapper {
      align-items: flex-end;
      .my-bubble-content {
        color: #fff;
        background-color: var(--jl-primary);
      }
    }
  }
}
</style>
