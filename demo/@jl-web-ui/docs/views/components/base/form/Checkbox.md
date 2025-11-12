## Checkbox 多选

### 基本用法

::: demo

```vue
<template>
  <jl-form.checkbox-group v-model="value" :options="options"></jl-form.checkbox-group>
</template>
<script>
export default {
  data() {
    return {
      value: ['option1'],
      options: [
        { label: '选项一', value: 'option1' },
        { label: '选项二', value: 'option2' },
        { label: '选项三', value: 'option3' },
      ],
    };
  },
};
</script>
```

:::

### 全选功能

::: demo

```vue
<template>
  <jl-form.checkbox-group v-model="value" show-check-all check-all-text="全选（这是一个全选文字）" :gap="[10, 40]" :options="options"></jl-form.checkbox-group>
</template>
<script>
export default {
  data() {
    return {
      value: ['option1'],
      options: [
        { label: '选项一', value: 'option1' },
        { label: '选项二', value: 'option2' },
        { label: '选项三', value: 'option3' },
      ],
    };
  },
};
</script>
```

:::

### 按钮样式

::: demo

```vue
<template>
  <jl-form.checkbox-group type="button" v-model="value" :options="options"></jl-form.checkbox-group>
  <br />
  <jl-form.checkbox-group type="button" v-model="value" :options="options" :gap="10"></jl-form.checkbox-group>
  <br />
  <!-- round 必须在配置了 gap 才生效 -->
  <jl-form.checkbox-group type="button" v-model="value" round :options="options" :gap="10"></jl-form.checkbox-group>
</template>
<script>
export default {
  data() {
    return {
      value: ['option1'],
      options: [
        { label: '选项一', value: 'option1' },
        { label: '选项二', value: 'option2' },
        { label: '选项三', value: 'option3' },
      ],
    };
  },
};
</script>
```

:::

### Attributes 属性

| 属性名  | 说明                 | 类型                    | 可选值                | 默认值  |
| ------- | -------------------- | ----------------------- | --------------------- | ------- |
| v-model | 绑定值               | array                   | —                     | —       |
| options | 选项数据             | array                   | —                     | []      |
| type    | 按钮类型             | string                  | default / button      | default |
| size    | 尺寸                 | string                  | medium / small / mini | small   |
| round   | 是否为圆角（仅按钮） | boolean                 | true / false          | false   |
| gap     | 按钮模式下的间距     | number / string / array | —                     | null    |
| label   | 单条复选时的显示文本 | string                  | —                     | ''      |

> `round` 需配合设置 `gap` 才生效。`options` 为空时，使用 label 属性呈现单条复选。
