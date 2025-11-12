[在线文档](http://192.168.7.106:6060/)

目前子应用都是以`JS Entry`方式加载的，加载资源逻辑导致组件库拆包出现报错的情况，因此组件库暂采用不拆包方案，保证线上环境稳定运行（若要拆包，需要升级为`HTML Entry`方式，也就是微前端框架更换为`qiankun`，方能拆包加载）。

### 安装依赖

```shell
npm install
```

### 打包组件库

```shell
npm run build
```

### 运行组件库文档

```shell
npm run docs:dev
```

### 打包组件库文档

```shell
npm run docs:build
```
