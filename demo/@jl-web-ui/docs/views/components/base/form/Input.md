# Input 输入框

## 基本用法

::: demo

```vue
<template>
  <jl-form.input prefix-icon="el-icon-date" suffix-icon="el-icon-search" v-model="value" placeholder="请输入"> </jl-form.input>
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

## 文本域

::: demo

```vue
<template>
  <jl-form.input type="textarea" v-model="value" placeholder="请输入"></jl-form.input>
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
