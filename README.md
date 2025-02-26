### 增加node内存
```js
setx NODE_OPTIONS --max_old_space_size=10240
node
v8.getHeapStatistics()
// heap_size_limit
```

vue2 插槽透传
```vue
<template #[slotName]="slotProps" v-for="(slot, slotName) in $slots" >
    <slot :name="slotName" v-bind="slotProps"/>
</template>
```