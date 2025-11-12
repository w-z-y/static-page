# Translate 翻译

::: warning

- 块级元素: 会将原本的 `行级元素` 变为 `块级元素` ，使用组件后注意调整布局
- 表格相关：如果翻译结果显示在表格中，会导致表格中的单元格高度变高，滚动条计算会有问题，
  - 表格作为第一级子组件，默认会调用`doLayout`方法
  - 表格作为非第一级子组件，需要在`translate-end`事件中调用表格的`doLayout`方法

:::

## 基本使用

- `<jl-business.translate-item>`

  负责对具体文本进行翻译，也可单独使用（不依赖外层 `<jl-business.translate>`），会在初次挂载和初次赋值时自动处理翻译。

<ClientOnly>
::: demo

```vue
<template>
  <jl-business.translate ref="translateRef">
    <jl-business.translate-item v-model="value" :max-height="50">
      {{ value }}
    </jl-business.translate-item>
    <jl-business.translate-item v-model="value">
      {{ value }}
    </jl-business.translate-item>
    <jl-business.translate-item v-model="value2">
      {{ value2 }}
    </jl-business.translate-item>
    <jl-business.translate-item v-model="value3">
      {{ value3 }}
    </jl-business.translate-item>
    <jl-business.translate-item v-model="value4">
      {{ value4 }}
    </jl-business.translate-item>
    <jl-business.translate-item v-model="value5">
      {{ value5 }}
    </jl-business.translate-item>
  </jl-business.translate>
</template>
<script>
export default {
  data() {
    return {
      value:
        '你好！欢迎来到这里,你好！欢迎来到这里,你好！欢迎来到这里,你好！欢迎来到这里,你好！欢迎来到这里,你好！欢迎来到这里你好！欢迎来到这里,你好！欢迎来到这里,你好！欢迎来到这里,你好！欢迎来到这里,你好！欢迎来到这里,你好！欢迎来到这里你好！欢迎来到这里,你好！欢迎来到这里,你好！欢迎来到这里,你好！欢迎来到这里,你好！欢迎来到这里,你好！欢迎来到这里你好！欢迎来到这里,你好！欢迎来到这里,你好！欢迎来到这里,你好！欢迎来到这里,你好！欢迎来到这里,你好！欢迎来到这里',
      value2: '@！#@#￥……#￥……',
      value3: '@！#@#￥……#￥',
      value4: 'Ini adalah sebuah teks uji.',
      value5: '',
    };
  },
  mounted() {
    setTimeout(() => {
      this.value5 = '~~~';
    }, 1000);
  },
};
</script>
```

:::
</ClientOnly>

## 手动触发事件`translate`

<ClientOnly>
::: demo

```vue
<template>
  <jl-business.translate ref="translateRef">
    <jl-card header="手动更新" show-label-mark style="margin-bottom: 10px" padding="40px">
      <jl-business.translate-item v-model="value">
        <el-input v-model="value"></el-input>
      </jl-business.translate-item>
      <jl-business.translate-item v-model="value2">
        <el-input v-model="value2"></el-input>
      </jl-business.translate-item>
    </jl-card>
  </jl-business.translate>
  <jl-button primary @click="handleSave" style="margin-top: 10px">手动更新</jl-button>
</template>
<script>
export default {
  data() {
    return {
      value: '这是一段测试文本',
      value2: '这是一段测试文本',
    };
  },
  methods: {
    handleSave() {
      this.$refs.translateRef.translate();
    },
  },
};
</script>
```

:::
</ClientOnly>

### 方法(`jl-business.translate`)

| 方法名    | 说明         | 回调参数 |
| --------- | ------------ | -------- |
| translate | 调用翻译接口 | -        |

### Events(`jl-business.translate`)

| 事件名        | 说明           | 回调参数 |
| ------------- | -------------- | -------- |
| translate-end | 翻译结果渲染后 | -        |

### Attributes(`jl-business.translate-item`)

| 属性名          | 说明                 | 类型            | 默认值 |
| --------------- | -------------------- | --------------- | ------ |
| v-model / value | 绑定值               | string          | -      |
| max-height      | 翻译结果最大显示高度 | string / number | -      |

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
