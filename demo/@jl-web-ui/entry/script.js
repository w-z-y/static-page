module.exports = {
  // 解析入口
  resolver: './src/resolver',
  // 确认弹窗
  MessageBox: './packages/base/MessageBox/index.js',
  // 指令
  directive: './src/directive',
  // vuex插件
  'plugins/vuex/persist': './plugins/vuex/persist.js',
  // micro-app
  'micro-app/mergeStore': './src/micro-app/mergeStore.js',
  'micro-app/ai': './src/micro-app/ai.js',
  'micro-app/setting': './src/micro-app/setting.js',
  // 常量
  'constant/ai': './src/constant/ai.js',
  'constant/setting': './src/constant/setting.js',
  // mixin
  'mixin/model': './src/mixin/model',
  'mixin/props': './src/mixin/props',
  'mixin/resizeObserver': './src/mixin/resizeObserver',
  'mixin/resizeObserverWindow': './src/mixin/resizeObserverWindow',
  // util
  'util/mergeRequest': './src/util/mergeRequest',
  'util/broadcast': './src/util/broadcast',
};
