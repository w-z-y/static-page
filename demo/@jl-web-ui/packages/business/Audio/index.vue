<template>
  <div class="jl-audio-player">
    <audio ref="jlAudioEl" preload :src="src" @canplay="canplay" @pause="pause" @timeupdate="timeupdate" @ratechange="onRateChange"></audio>
    <div class="audio-controls">
      <div class="jl-video-progress-container">
        <div class="jl-video-progress-bar-wrapper">
          <jl-slider
            class="jl-autio-slider"
            v-model="progress"
            :max="duration"
            :format-tooltip="() => currentTime"
            @input="handleInputProgress"
            @drag-start="handleDragStartSlider"
            @drag="handleDragSlider"
            @drag-end="handleDragEndSlider"></jl-slider>

          <div class="jl-video-time-container">
            <span class="time-text">{{ currentTime }}</span>
            <span class="time-text">{{ totalTime }}</span>
          </div>
        </div>
      </div>
      <div class="jl-video-controls-bar">
        <div class="controls-bar__cell"></div>
        <div class="controls-bar__cell">
          <jl-tooltip :content="t('audio.button.fastBackward')" :enterable="false">
            <jl-icon disabled="!jlAudioEl" @click="seekBy(-15)" class="player-control-btn" icon="fast-backward"></jl-icon>
          </jl-tooltip>
        </div>

        <div class="controls-bar__cell" @click="play">
          <jl-tooltip :content="playing ? t('audio.button.pause') : t('audio.button.play')" :enterable="false">
            <div class="audio-play__controls-button">
              <template v-if="jlAudioEl">
                <jl-icon v-if="playing" icon="pause"></jl-icon>
                <jl-icon v-else icon="play"></jl-icon>
              </template>
              <jl-icon.loading v-else class="translate-loading-icon"></jl-icon.loading>
            </div>
          </jl-tooltip>
        </div>

        <div class="controls-bar__cell">
          <jl-tooltip :content="t('audio.button.fastForward')" :enterable="false">
            <jl-icon :disabled="!jlAudioEl" @click="seekBy(15)" class="player-control-btn" icon="fast-forward"></jl-icon>
          </jl-tooltip>
        </div>

        <div class="controls-bar__cell">
          <jl-dropdown class="player-control-btn" trigger="hover" placement="bottom" v-model="rate" :options="audioOptions" @command="changeRate">
            <template #default="{ label }">
              <span class="rate-x">
                <span class="btn-rate"> {{ label }}</span>
                <span class="btn-x">x</span>
              </span>
            </template>
          </jl-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// createVue
import createVue from '@jl/web-ui/src/createVue';
// components
import JlIcon from '../../base/Icon/index.vue';
import JlDropdown from '../../base/Dropdown/index.vue';
import JlSlider from '../../base/Slider/index.vue';
export default createVue({
  lang: true,
  props: {
    src: String,
  },
  components: {
    JlIcon,
    JlDropdown,
    JlSlider,
  },
  data() {
    return {
      audioOptions: Object.freeze([
        { label: '2.0X', value: '2', showLabel: '2' },
        { label: '1.5X', value: '1.5', showLabel: '1.5' },
        { label: '1.25X', value: '1.25', showLabel: '1.25' },
        { label: '1.0X', value: '1', showLabel: '1' },
        { label: '0.5X', value: '0.5', showLabel: '0.5' },
      ]),
      jlAudioEl: null,
      isDragging: false,
      beforeDragPlaying: false,
      playing: false,

      progress: 0, // 当前进度
      duration: 0, // 总时长

      currentTime: '00:00',
      totalTime: '00:00',
      rate: '1', // 当前倍速
    };
  },

  methods: {
    // 播放 + 暂停
    play() {
      if (this.jlAudioEl) {
        // 播放当前录音前先停止当前页面所有 audio 播放
        if (!this.playing) {
          const audios = document.getElementsByTagName('audio');
          Array.from(audios).forEach((audio) => {
            audio.pause();
          });
        }
        this.playing ? this.jlAudioEl.pause() : this.jlAudioEl.play();
        this.playing = !this.playing;
      }
    },
    // 暂停(更新所有的audio的状态)
    pause() {
      this.playing = false;
    },
    async handleInputProgress(val) {
      if (!this.jlAudioEl) return;
      await this.$nextTick();
      this.jlAudioEl.currentTime = val;
    },
    handleDragStartSlider() {
      this.beforeDragPlaying = this.playing;
    },
    handleDragSlider() {
      this.isDragging = true;
      if (this.beforeDragPlaying) {
        this.play();
      }
    },
    handleDragEndSlider() {
      if (this.isDragging && this.beforeDragPlaying) {
        this.play();
      }
      this.isDragging = false;
    },
    canplay() {
      this.jlAudioEl = this.$refs.jlAudioEl;
      if (this.jlAudioEl) {
        this.duration = this.jlAudioEl.duration;
        this.totalTime = this.formatDuration(Math.ceil(this.duration));
        this.jlAudioEl.playbackRate = this.rate;
      }
    },

    // 进度条更新
    timeupdate() {
      if (this.jlAudioEl) {
        this.currentTime = this.formatDuration(Math.ceil(this.jlAudioEl.currentTime));
        this.progress = this.jlAudioEl.currentTime;
      }
    },

    // 快进/快退n秒
    seekBy(seconds) {
      if (!this.jlAudioEl) return;
      let target = (this.jlAudioEl.currentTime || 0) + seconds;
      if (target < 0) target = 0;
      if (target > this.duration) target = this.duration;
      this.jlAudioEl.currentTime = target;
    },

    // 倍速更改
    changeRate(e) {
      if (this.jlAudioEl) {
        this.jlAudioEl.playbackRate = parseFloat(this.rate);
      }
    },

    // 监听rate更改
    onRateChange(e) {
      // 保证UI同步
      if (this.jlAudioEl) {
        this.rate = String(this.jlAudioEl.playbackRate);
      }
    },

    // 格式化分钟
    formatDuration(duration) {
      if (duration > 0) {
        let minute = Math.floor(duration / 60);
        minute = minute < 10 ? '0' + String(minute) : String(minute);
        let second = duration % 60;
        second = second < 10 ? '0' + String(second) : String(second);
        return minute + ':' + second;
      } else {
        return '00:00';
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.jl-audio-player {
  --primary-color: #704af6;
  --primary-hover-color: #5f3ed0;
  --primary-hover-bg-color: #aeb9f4;
  --icon-color: rgba(24, 28, 31, 0.6);

  border-radius: 12px;
  user-select: none;
  background: radial-gradient(64% 64% at 100% 100%, #ffffff 0, #f3f6ff 47%, rgba(248, 242, 254, 0.7337) 61%, rgba(255, 255, 255, 0) 100%),
    rgba(240, 242, 254, 0.5);
  padding: 16px;

  .jl-video-progress-container {
    padding: 0 6px;
    // 进度条
    .jl-video-progress-bar-wrapper {
      position: relative;
    }
    // 时间
    .jl-video-time-container {
      align-items: center;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      gap: 3px;
      height: 18px;
      margin-top: 4px;

      .time-text {
        color: rgba(24, 28, 31, 0.4);
        font-size: 12px;
        font-weight: 400;
        line-height: 18px;
        & + .time-text {
          margin-left: auto;
        }
      }
    }
  }

  // 操控按钮
  .jl-video-controls-bar {
    align-items: center;
    display: flex;
    height: 32px;
    justify-content: center;
    margin: 0 auto;
    max-width: 304px;
    width: 100%;
    .controls-bar__cell {
      align-items: center;
      display: flex;
      height: 100%;
      justify-content: center;
      width: 20%;
      font-size: 20px;
      color: var(--icon-color);

      .audio-play__controls-button {
        align-items: center;
        background: #cbd2f8;
        border-radius: 50%;
        color: var(--primary-color);
        .jl-icon-loading {
          color: var(--primary-color);
        }
        cursor: pointer;
        display: flex;
        flex-shrink: 0;
        font-size: 20px;
        height: 32px;
        justify-content: center;
        transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
        width: 32px;
        &:hover {
          background: var(--primary-hover-bg-color);
          color: var(--primary-hover-color);
        }
      }

      .player-control-btn {
        align-items: center;
        border-radius: 6px;
        cursor: pointer;
        display: flex;
        font-size: 20px;
        height: 28px;
        line-height: 1em;
        padding: 4px;
        transition: color 0.2s ease-in-out;

        .rate-x {
          display: inline-flex;
          align-items: flex-end;
          vertical-align: text-bottom;
        }
        .btn-rate {
        }
        .btn-x {
          font-size: 0.6em;
          line-height: 1em;
          vertical-align: 0;
        }
      }
    }
  }
}

/* slider */
.jl-autio-slider {
  ::v-deep {
    .el-slider__bar {
      background-color: var(--primary-color);
    }
    .el-slider__button {
      background-color: var(--primary-color);
      border-color: var(--primary-color);
    }
  }
}
</style>
