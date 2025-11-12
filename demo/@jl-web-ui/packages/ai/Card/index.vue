<template>
  <jl-resizer @resize="handleResize">
    <div
      class="jl-ai-card"
      :class="{
        'is-active': active,
        'is-small-size': isSmallSize,
        'is-show-img': isShowImg,
      }"
      @click="handleClick">
      <div class="card-content">
        <jl-icon icon="book" color="var(--jl-primary)"></jl-icon>
        <div class="card-content-text">
          <jl-tooltip :rows="1" class="title">{{ title }}</jl-tooltip>
          <jl-tooltip :rows="1" class="description">{{ description }}</jl-tooltip>
        </div>
      </div>
      <div v-if="isShowImg" class="code-card-img">
        <slot name="img"></slot>
      </div>
    </div>
  </jl-resizer>
</template>

<script>
import CreateVue from '@jl/web-ui/src/createVue';
import JlTooltip from '../../base/Tooltip';
import JlIcon from '../../base/Icon';
import JlResizer from '../../base/Resizer';

export default CreateVue({
  name: 'Ai.Card',
  props: {
    active: { type: Boolean, default: false },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
  },
  components: {
    JlTooltip,
    JlIcon,
    JlResizer,
  },
  data() {
    return {
      isSmallSize: false,
    };
  },
  computed: {
    isShowImg() {
      return !this.isSmallSize && this.$slots.img;
    },
  },
  methods: {
    handleResize({ width }) {
      if (width < 300) {
        this.isSmallSize = true;
      } else {
        this.isSmallSize = false;
      }
    },
    handleClick() {
      this.$emit('click');
    },
  },
});
</script>

<style scoped lang="scss">
.jl-ai-card {
  cursor: pointer;
  width: 100%;
  max-width: 380px;
  height: 120px;
  box-sizing: border-box;
  padding: 20px;
  overflow: hidden;
  position: relative;
  border: 2px solid #ddd;
  border-radius: var(--jl-dialog-border-radius);
  background: linear-gradient(100deg, #fff 45%, var(--jl-bubble-background-color) 100%);
  transition: border-color 100ms;

  &.is-small-size {
    padding: 14px;
    max-width: 340px;
    height: 70px;
    .card-content {
      align-items: center;
      flex-direction: row;
      margin-right: 0;
    }
  }
  &.is-show-img {
    .card-content {
      margin-right: 128px;
    }
  }

  &:hover,
  &.is-active {
    border-color: var(--jl-primary);
  }

  .card-content {
    display: flex;
    flex-direction: column;
    gap: 12px;
    .card-content-text {
      flex: 1;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      gap: 4px;
      .title {
        font-size: 14px;
      }
      .description {
        font-size: 12px;
        color: var(--jl-text-quaternary);
      }
    }
  }
  .code-card-img {
    height: 140px;
    position: absolute;
    right: -5px;
    top: 24px;
    transition: transform 0.2s ease-in-out;
    border-radius: var(--jl-dialog-border-radius);
    overflow: hidden;
    box-shadow: var(--jl-shadow-level1);
    width: 136px;
  }
  &:hover {
    .code-card-img {
      transform: rotate(-5deg);
    }
  }
}
</style>
