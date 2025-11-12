# CycleSelect 周期选择组件

## 基本用法

::: demo

```vue
<template>
  <jl-form.cycle-select v-model="value"></jl-form.cycle-select>
</template>
<script>
export default {
  data() {
    return {
      value: {
        cycle: 'NO_REPEAT', // NO_REPEAT | DAILY | WEEKLY | MONTHLY | YEARLY

        month: '',
        date: '',
        week: '',
        day: '',
        time: '',
      },
    };
  },
};
</script>
```

:::
