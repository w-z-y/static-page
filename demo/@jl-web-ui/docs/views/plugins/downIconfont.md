# `iconfont`同步

## 基本使用

1. 在 `/plugins` 目录下添加`downIconfont.js`文件

`downIconfont.js`

```js
const updateIconfont = require('@jl/web-ui/plugins/downIconfont');

updateIconfont(/* iconfont下载链接 */, /* cookie */);
```

2. 在 `package.json`中添加如下

```js

{
  scripts: {
    "iconfont": "node ./plugins/downIconfont.js && git add ./src/assets/fonts/iconfont",
  }
}

```
