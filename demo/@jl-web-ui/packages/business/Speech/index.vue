<template>
  <jl-tooltip v-if="audioSwitch" class="jl-business-audio" :content="loading ? '停止录音' : '语音输入'" v-bind="$attrs">
    <slot>
      <jl-button key="speech-stop" v-if="loading" plain circle size="medium" @click="stop">
        <template #icon>
          <SpeechLoadingSvg />
        </template>
      </jl-button>
      <jl-button key="speech-start" v-else icon="speech" plain circle size="medium" @click="start"></jl-button>
    </slot>
  </jl-tooltip>
</template>

<script>
import ReconnectingWebsocket from 'reconnecting-websocket';
import createVue from '@jl/web-ui/src/createVue';
import { storageGet } from '@jl/web-ui/src/util';
import { mapGetters } from 'vuex';
// component
import SpeechLoadingSvg from '@jl/web-ui/src/assets/svg/speech-loading.svg';
import JlTooltip from '@jl/web-ui/packages/base/Tooltip';
import JlButton from '@jl/web-ui/packages/base/Button';
// constant
const token = storageGet('token');
const socketUrl = `wss://${location.host}/ws/speech?token=${token}&clientType=web&businessType=audio`;

const CODE = {
  SUCCESS: 20000000,
};

export default createVue({
  name: 'Business.Audio',
  model: true,
  components: {
    SpeechLoadingSvg,
    JlTooltip,
    JlButton,
  },
  data() {
    return {
      tempStr: '',
      websocket: null,
      audioContext: null,
      audioInput: null,
      scriptProcessor: null,
      // audioChunks: [], // 用于下载

      loading: false, // 语音loading
    };
  },
  computed: {
    ...mapGetters(['moduleInfo']),
    audioSwitch() {
      return this.moduleInfo.audioEnabled === '1';
    },
  },
  methods: {
    // 语音
    async start() {
      try {
        // 获取音频输入设备
        this.audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)({
          sampleRate: 16000, // 采样率
        });
        this.loading = true;

        this.audioInput = this.audioContext.createMediaStreamSource(this.audioStream);
        // 设置缓冲区大小为2048的脚本处理器
        this.scriptProcessor = this.audioContext.createScriptProcessor(2048, 1, 1);

        // this.audioChunks = [];
        this.scriptProcessor.onaudioprocess = (event) => {
          const inputData = event.inputBuffer.getChannelData(0);
          const inputData16 = new Int16Array(inputData.length);
          for (let i = 0; i < inputData.length; ++i) {
            inputData16[i] = Math.max(-1, Math.min(1, inputData[i])) * 0x7fff; // PCM 16-bit
          }
          if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
            // this.audioChunks.push(inputData16.buffer);
            this.websocket.send(inputData16.buffer);
          }
        };
        this.audioInput.connect(this.scriptProcessor);
        this.scriptProcessor.connect(this.audioContext.destination);
        /*


          ws


        */
        this.websocket = new WebSocket(socketUrl);
        this.websocket.onopen = function () {
          console.log('ws open');
        };
        this.websocket.onmessage = async (event) => {
          const res = JSON.parse(event.data);
          console.log('ws onmessage', res);
          if (res.code === CODE.SUCCESS) {
            this.internalValue = this.internalValue.substring(0, this.internalValue.length - this.tempStr.length) + res.data;
            if (res.event === 'onTranscriptionResultChange') {
              this.tempStr = res.data;
            } else if (res.event === 'onSentenceEnd') {
              this.tempStr = '';
            }
            this.$emit('change');
          }
        };
        this.websocket.onerror = (event) => {
          console.log('ws onerror', event);
          this.stop();
          this.$message.error('连接异常');
        };
        this.websocket.onclose = (event) => {
          console.log('ws onclose', event);
          this.stop();
        };
      } catch (e) {
        this.stop();
        this.$message.error('录音失败: ' + e);
      }
    },
    stop() {
      this.tempStr = '';
      this.loading = false;
      if (this.scriptProcessor) {
        this.scriptProcessor.disconnect();
        this.scriptProcessor = null;
      }
      if (this.audioInput) {
        this.audioInput.disconnect();
        this.audioInput = null;
      }
      if (this.audioStream) {
        this.audioStream.getTracks().forEach((track) => track.stop());
        this.audioStream = null;
      }
      if (this.audioContext) {
        this.audioContext.close();
        this.audioContext = null;
      }
      if (this.websocket) {
        this.websocket.close();
        this.websocket = null;
      }
      // 合并所有的PCM数据
      // let totalLength = 0;
      // for (let i = 0; i < audioChunks.length; i++) {
      //   totalLength += audioChunks[i].byteLength / 2;
      // }
      // const samples = new Int16Array(totalLength);
      // let offset = 0;
      // for (let i = 0; i < audioChunks.length; i++) {
      //   const chunk = new Int16Array(audioChunks[i]);
      //   samples.set(chunk, offset);
      //   offset += chunk.length;
      // }

      // 采样率与录音时设置的sampleRate一致
      // const wavBlob = encodeWAV(samples, 16000);

      // const audioUrl = URL.createObjectURL(wavBlob);
      // 下载 audioUrl
      // download(audioUrl);
      // console.log('samples', samples, audioChunks, wavBlob, audioUrl);
    },
  },
});
</script>
