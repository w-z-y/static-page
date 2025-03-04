<template>
  <div class="full-screen">
    <el-tooltip :content="isFullscreen ? '退出全屏' : '全屏'">
      <i :class="['el-icon', isFullscreen ? 'el-icon-close' : 'el-icon-full-screen']" @click="toggleFullScreen"></i>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: 'MyFullScreen',
  props: {
    reference: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      isFullscreen: false,
    };
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
.full-screen {
  display: inline-block;
  cursor: pointer;
  i {
    font-size: 20px;
    &:hover {
      color: #409eff;
    }
  }
}
</style>
