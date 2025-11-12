# 持久化

符合项目`vuex`的持久化

## 基本使用

- 添加插件

```js
import VuexPersistPlugin from '@jl/web-ui/plugins/vuex/persist';

export default new Vuex.Store({
  ...
  ...
  plugins: [VuexPersistPlugin],
});
```

- 在对应的模块下配置`persist: true`

示例:

```js
export default {
  namespaced: true,
  state: {},
  mutations: {},
  // 开启缓存
  persist: true,
};
```
