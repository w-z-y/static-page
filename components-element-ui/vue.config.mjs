import Components from 'unplugin-vue-components/webpack'
import MyComponentsResolver from './src/components/_resolver/index.js'
export default {
  publicPath: "./", // 打包相对路径
  transpileDependencies: true,

  configureWebpack: {
    plugins: [
      Components({
        // dirs: ['src/components'], // 指定要自动导入组件的目录
        // 其他配置选项
        resolvers: [
          MyComponentsResolver()
        ],
      }),
    ],
  }
}
