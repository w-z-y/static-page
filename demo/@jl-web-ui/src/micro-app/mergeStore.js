// 将store1合并到store2中 (副作用函数，会直接修改store2)
export default function mergeStore(store1, store2) {
  const storeModuleMap = store1.state;

  const currentStoreModuleMap = store2.state;
  for (let moduleName in storeModuleMap) {
    if (!currentStoreModuleMap.hasOwnProperty(moduleName)) {
      mergeModule(store1, store2, moduleName);
    } else {
      mergeDataAndMethods(store1, store2);
    }
  }
}

// 用于合并两个store的基本属性
function mergeDataAndMethods(store1, store2) {
  // 合并通用对象属性，仅新增不覆盖
  function mergeUniqueProps(from, to, keys) {
    keys.forEach((key) => {
      if (from && to && key in from && key in to) {
        Object.keys(from[key]).forEach((subKey) => {
          if (!(subKey in to[key])) {
            to[key][subKey] = from[key][subKey];
          }
        });
      }
    });
  }

  // 合并 state
  Object.keys(store1.state).forEach((key) => {
    if (!(key in store2.state)) store2.state[key] = store1.state[key];
  });

  // 合并 mutations、actions、getters
  mergeUniqueProps(store1, store2, ['_mutations', '_actions', 'getters']);
}

// 用于新增store模块
function mergeModule(store1, store2, moduleName) {
  const localModule = store1._modules.root._children[moduleName]._rawModule;
  store2.registerModule(moduleName, {
    namespace: true,
    ...localModule,
  });
}
