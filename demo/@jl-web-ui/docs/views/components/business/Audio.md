# Audio 音频预览组件

## 基本用法

<ClientOnly>
::: demo

```vue
<template>
  <div style="padding: 20px">
    <jl-business.audio src="http://10.10.9.133:31033/api/speech/audio/754319024426404613.wav" />
    <jl-business.audio src="/record.mp3" style="margin-top:10px" />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
```

:::
</ClientOnly>

### Attributes

| 参数 | 说明     | 类型   | 可选值 | 默认值 |
| ---- | -------- | ------ | ------ | ------ |
| src  | 音频地址 | string | —      | ''     |

### Methods

| 方法名       | 说明           | 参数   |
| ------------ | -------------- | ------ |
| togglePlay   | 播放/暂停音频  | —      |
| seekBy       | 前进/后退秒数  | number |
| onSeek       | 拖拽进度条事件 | event  |
| onRateChange | 倍速切换事件   | event  |
