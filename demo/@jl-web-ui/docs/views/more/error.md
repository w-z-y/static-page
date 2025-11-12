<!-- 隐藏sidebar的一种写法(sidebar是数组时生效) -->
<!-- ---
sidebar: false
--- -->

<!-- ### Badge <Badge text="beta" type="error"/> -->
<!-- [[toc]] -->

::: danger 报错信息

Uncaught (in promise) TypeError: this.$jlConfirm is not a function

:::

项目文件 `src/components.js` 添加如下代码：

```js
import JlWebUiMessageBox from '@jl/web-ui/lib/MessageBox';
import '@jl/web-ui/lib/css/MessageBox.css';
Vue.use(JlWebUiMessageBox);
```
