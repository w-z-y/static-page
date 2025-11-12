## AI 助手组件通信

### 注册方法

```js
import ai from '@jl/web-ui/src/micro-app/ai';
Vue.use(ai);
```

::: tip 使用方式

- 项目中使用 `this.$openAiDrawer({})` 调用
- `F12` 控制台可以通过 `openAiDrawer({})` 直接调用

:::

### 参数字段解释

```js
this.$openAiDrawer({
  // 发送的消息内容
  content: '',
  // 技能相关的参数
  skillParameter: {
    // 技能类型
    type: '',
    // 技能相关的参数
    settings: {
      // 业务id列表（如：查询报表-报表id、查询知识库的-知识库id
      ids: ['659670092845442501'],
      // 查询参数
      filters: {},
    },
  },
});
```

### 示例

1. 测试报表分析

```js
this.$openAiDrawer({
  content: '分析月度完成情况',
  skillParameter: {
    type: 'REPORT_ANALYSIS',
    settings: {
      ids: ['659670092845442501'],
    },
  },
});
```
