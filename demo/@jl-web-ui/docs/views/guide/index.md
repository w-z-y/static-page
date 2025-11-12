# 快速开始

## 安装

```bash
npm install @jl/web-ui
```

## 全局引入

暂不支持

## 按需引入

使用 [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) 自动按需引入。

1. 安装 `unplugin-vue-components` (<span style="color: red;">\* 注意版本号</span>)

   ```js
   npm i unplugin-vue-components@^0.27.5
   ```

2. 添加插件配置

   在 `vue.config.js` 中

   ```js
   const JLWebUIResolver = require('@jl/web-ui/src/resolver.js');

   module.exports = {
     configureWebpack: {
       plugins: [
         require('unplugin-vue-components/webpack').default({
           dirs: [],
           dts: path.join(__dirname, 'components.d.ts'),
           resolvers: [JlWebUIResolver({ isDebugger: false })],
         }),
       ],
     },
   };
   ```

3. 引入样式

   在 `main.js` 中

   ```js
   import '@jl/web-ui/lib/css/shortcuts.css';
   import '@jl/web-ui/lib/css/variables.css';
   ```

4. 注册全局方法 `this.$jlConfirm`

   在 `components.js` 中

   ```js
   import JlMessageBox from '@jl/web-ui/lib/MessageBox';
   import '@jl/web-ui/lib/css/MessageBox.css';
   Vue.use(JlMessageBox);
   ```

5. 注册全局指令 `v-has` 和对应的方法 `this.$has`

   在 `components.js` 中

   ```js
   import store from '@/store';
   import JlDirective from '@jl/web-ui/src/directive';
   Vue.use(JlDirective, {
     permission: {
       data() {
         return store.getters.permissionList;
       },
       // 配置权限类型，默认第一项为默认值，即 `v-has` 指的是 `button` 的，如需使用 `aiButton`，使用 `v-has:aiButton`
       type: ['button', 'form', 'column', 'aiButton'],
     },
   });
   ```

6. 用于调试(可选)

   在 `package.json` 中添加脚本

   ```json
   {
     "scripts": {
       "dev:link": "set LINK=true && vue-cli-service serve"
     }
   }
   ```

   同时在 `vue.config.js` 中

   修改 `JlWebUIResolver` 的配置属性 `isDebugger` 为 `process.env.LINK`, 方便后续调试时通过 `npm run dev:link` 启动项目

   ```js
   resolvers: [JlWebUIResolver({ isDebugger: process.env.LINK })];
   ```

7. 配置 `.gitignore`

   运行完项目后，项目中会生成 `components.d.ts` 文件，请将其添加到 `.gitignore` 中，避免提交到仓库中

::: warning 开发新组件注意事项

1. 组件库中的别名，请使用 `@jl/web-ui/`，如 `@jl/web-ui/src/util`

2. 组件一级目录名大写(驼峰拼接)，二级小写(横线拼接)

3. 导出配置文件`components.js`中的组件名首字母要大写(驼峰)

:::

## 开发调试

1. 通过 `yalc publish` 将包发布到本地的全局 (`@jl/web-ui`项目中)

2. 如果要调试 `.vue` 源文件，而不是默认 `lib/` 下的打包文件，则修改上面的插件配置中的 `isDebugger` 为 `true` (自己项目中，部分项目中`package.json`配置了`npm run dev:link`, 可直接执行脚本，不需要修改代码)

3. 同时需要安装一些开发依赖

  ```shell
  npm i highlight.js@11.11.1 -D
  ```

4. 使用 `yalc add @jl/web-ui` 进行关联 (自己项目中)

5. 删除`node_modules`中的 `.cache` 文件 (自己项目中)，进行清除缓存

6. 运行项目启动指令（自己项目中），`npm run dev`（根据实际情况选择）

7. 修改组件代码 (`@jl/web-ui`项目中)，重复步骤 `1`, `3`或直接`yalc push`
