const storage = window.localStorage;
const prefix = 'jl';

const getModuleName = (name) => `${prefix}${prefix ? '_' : ''}${name}`;
const setItem = (state, modules, storage) => {
  modules.forEach((moduleName) => {
    if (state.hasOwnProperty(moduleName)) {
      const persistedState = state[moduleName];
      storage.setItem(getModuleName(moduleName), JSON.stringify(persistedState));
    }
  });
};

export default function VuexPersistPlugin(store) {
  // 找出所有带 persist: true 的模块名
  const persistModules = Object.keys(store.state).filter((moduleName) => {
    const module = store._modulesNamespaceMap[`${moduleName}/`];
    return module && module._rawModule && module._rawModule.persist === true;
  });

  // 初始化时恢复持久化的模块状态
  persistModules.forEach((moduleName) => {
    const savedState = storage.getItem(getModuleName(moduleName));
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      const mergedState = { ...store.state };
      mergedState[moduleName] = parsedState;
      store.replaceState(mergedState);
    }
  });

  // 订阅状态变化，持久化需要持久化的模块
  store.subscribe((mutation, state) => {
    setItem(state, persistModules, storage);
  });
}
