# Speech 语音组件

::: warning 注
需要开启`https`, 这里无法测试此组件
:::

## 基本用法

<ClientOnly>
::: demo

```vue
<template>
  <jl-business.speech v-model="value"></jl-business.speech>
</template>

<script>
export default {
  data() {
    return {
      value: '',
    };
  },
};
</script>
```

:::
</ClientOnly>

### Attributes

| 参数          | 说明     | 类型   | 可选值 | 默认值 |
| ------------- | -------- | ------ | ------ | ------ |
| value/v-model | 绑定文本 | string | —      | ''     |

### Methods

| 方法名 | 说明     | 参数 |
| ------ | -------- | ---- |
| start  | 开始录音 | —    |
| stop   | 停止录音 | —    |

::: tip 设置 token 和 `开关`

```js
localStorage.setItem('jnpf_token', '');

localStorage.setItem(
  'jnpf_moduleInfo',
  JSON.stringify({
    aiEnabled: '1',
    audioEnabled: '1',
    translateEnabled: '1',
  })
);
```

:::
