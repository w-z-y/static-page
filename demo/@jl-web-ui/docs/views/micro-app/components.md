## 微前端组件注册

```js
import mergeStore from '@jl/web-ui/micro-app/mergeStore';
import VuexPersistPlugin from '@jl/web-ui/plugins/vuex/persist';

const components = {
};

const mixins = () => {
  return {
    beforeCreate() {
      // 将组件使用的store合并到使用组件的项目的store中(重名不会覆盖原有值, 只有新增)
      mergeStore(store, this.$store);
      // 持久化
      VuexPersistPlugin(this.$store);
    },
  };
};

window[`SUB_APP_${require('@/settings.js').projectBase.toUpperCase()}_COMPONENTS`] = {
  mixins,
  components,
};
```
