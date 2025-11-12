## `model` 混入

### 适用场景

- 用于封装组件时，实现`v-model`双向绑定效果的混入。
- 当你需要自定义组件并希望支持`v-model`语法糖时。
- 让组件内部可以通过`this.currentValue`读写绑定值，触发外部数据更新。

### 组件内部注册

```html
<template>
  <div>
    <div>{{ internalValue }}</div>
    <button @click="handleClick">click</button>
  </div>
</template>

<script>
  import modelMixin from '@jl/web-ui/lib/mixin/model';

  export default {
    // ...
    mixins: [modelMixin],
    // ...
    methods: {
      handleClick() {
        // 直接修改 internalValue
        this.internalValue = 'demo'; // 内部写入自动触发外部更新
      },
    },
  };
</script>
```

### 使用组件

```html
<template>
  <compA v-model="username" />
</template>

<script>
  export default {
    data() {
      return {
        username: '',
      };
    },
  };
</script>
```

### 工作原理

- `modelMixin`会自动在组件中注入`currentValue`的计算属性和赋值逻辑。
- 当你在组件内部通过`this.currentValue = newValue`时，会自动触发`$emit('input', newValue)`或`$emit('update:modelValue', newValue)`。
- 这样就实现了和外部 v-model 的双向联动。

### 默认绑定`value`说明

- 你也可以通过`model: { prop: 'modelValue', event: 'update:modelValue' }`自定义 v-model 绑定的 prop 和事件。

```js
export default {
  mixins: [modelMixin],
  model: {
    prop: 'modelValue',
    event: 'update:modelValue',
  },
  props: {
    modelValue: String,
  },
};
```
