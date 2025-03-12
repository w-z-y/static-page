import Components from 'unplugin-vue-components/webpack';
import MyComponentsResolver from './src/components/_resolver/index.js';
export default {
  publicPath: './', // 打包相对路径
  transpileDependencies: true,

  configureWebpack: {
    plugins: [
      Components({
        // （默认值会把src/components目录下的所有组件都导入,如使用原生table，就会引用里面的MyTable组件）
        dirs: [], // 指定要自动导入组件的目录
        // 其他配置选项
        resolvers: [MyComponentsResolver()],
      }),
    ],
  },
};
