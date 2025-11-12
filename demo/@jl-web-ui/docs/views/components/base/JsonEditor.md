# JsonEditor JSON 编辑器

## 基本用法

<ClientOnly>
::: demo

```vue
<template>
  <jl-json-editor v-model="json" style="height: 100px"></jl-json-editor>
  <jl-button @click="updateJson" style="margin-top: 10px" success>异步更新</jl-button>
</template>
<script>
export default {
  data() {
    return {
      json: {
        properties: {},
        required: [],
      },
    };
  },
  methods: {
    updateJson() {
      this.json = { newValue: '' };
    },
  },
};
</script>
```

:::
</ClientOnly>

### Attributes

| 参数    | 说明         | 类型   | 可选值 | 默认值 |
| ------- | ------------ | ------ | ------ | ------ |
| v-model | 多选绑定的值 | object | —      | —      |
