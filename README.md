### 增加node内存
```js
setx NODE_OPTIONS --max_old_space_size=10240
node
v8.getHeapStatistics()
// heap_size_limit
```