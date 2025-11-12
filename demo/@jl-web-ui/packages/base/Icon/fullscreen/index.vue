<!-- 点击具体全屏功能 -->
<template>
  <jl-icon.hover
    @click="toggleFullScreen"
    class="jl-icon-full-screen"
    :color="color"
    :content="isFullscreen ? '退出全屏' : '全屏'"
    :enterable="false"
    placement="top">
    <FullscreenShrinkSvg class="fullscreen-icon" v-if="isFullscreen" />
    <FullscreenExpandSvg class="fullscreen-icon" v-else />
  </jl-icon.hover>
</template>

<script>
import JlTooltip from '../../Tooltip/index.vue';
import JlIconHover from '../hover/index.vue';
import COM_PREFIX from '@jl/web-ui/src/config';
import FullscreenExpandSvg from '@jl/web-ui/src/assets/svg/fullscreen-expand.svg';
import FullscreenShrinkSvg from '@jl/web-ui/src/assets/svg/fullscreen-shrink.svg';
export default {
  name: COM_PREFIX + 'Icon.Fullscreen',
  components: { JlTooltip, 'jl-icon.hover': JlIconHover, FullscreenExpandSvg, FullscreenShrinkSvg },
  props: {
    value: {},
    reference: { default: null },
    color: {
      type: String,
      default: 'var(--jl-icon-color)',
    },
  },
  data() {
    return {
      internalIsFullscreen: false,
    };
  },
  computed: {
    isFullscreen: {
      get() {
        if (this.value !== undefined) {
          return this.value;
        } else {
          return this.internalIsFullscreen;
        }
      },
      set(value) {
        if (this.value !== undefined) {
          this.$emit('input', value);
        } else {
          this.internalIsFullscreen = value;
        }
      },
    },
  },
  methods: {
    toggleFullScreen() {
      let element = null;
      if (typeof this.reference === 'string') {
        element = document.querySelector(this.reference);
      } else {
        element = this.reference || this.$parent.$el;
      }
      if (!this.isFullscreen) {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
      this.isFullscreen = !this.isFullscreen;
    },
  },
  mounted() {
    document.addEventListener('fullscreenchange', () => {
      this.isFullscreen = document.fullscreen;
    });
    document.addEventListener('webkitfullscreenchange', () => {
      this.isFullscreen = document.webkitIsFullScreen;
    });
    document.addEventListener('mozfullscreenchange', () => {
      this.isFullscreen = document.mozFullScreen;
    });
    document.addEventListener('MSFullscreenChange', () => {
      this.isFullscreen = document.msFullscreenElement;
    });
  },
  beforeDestroy() {
    document.removeEventListener('fullscreenchange', () => {});
    document.removeEventListener('webkitfullscreenchange', () => {});
    document.removeEventListener('mozfullscreenchange', () => {});
    document.removeEventListener('MSFullscreenChange', () => {});
  },
};
</script>

<style lang="scss" scoped>
.jl-icon-full-screen {
  display: inline-block;
  cursor: pointer;
}
</style>
