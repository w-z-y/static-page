# 全局指令

### `v-has`

---

```js
import store from '@/store';
import JlDirective from '@jl/web-ui/lib/directive';
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

```html
<jl-button v-has="'PERMISSION_CODE'">查询</jl-button>

<jl-button v-has:aiButton="'PERMISSION_CODE'">查询</jl-button>
```

# 全局方法

### `$openAiDrawer` 打开 ai 弹窗、`$openAiDrawerAndLocation` 打开 ai 弹窗并定位

---

`F12` 控制台中可以使用`openAiDrawer`方法

```js
import ai from '@jl/web-ui/src/micro-app/ai';
Vue.use(ai);

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
      ids: [],
      // 查询参数
      filters: {},
    },
  },
});
```

### `$jlConfirm` 删除确认提示

---

```js
import JlWebUiMessageBox from '@jl/web-ui/lib/MessageBox';
import '@jl/web-ui/lib/css/MessageBox.css';
Vue.use(JlWebUiMessageBox);

this.$jlConfirm({
  title: '提示标题', // 默认内容： 提示
  content: '提示内容', // 默认内容： 此操作将永久删除
  beforeClose: async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  },
});
```

### `$has` 权限

---

```js
// 同 `v-has` 一起注册
import store from '@/store';
import JlDirective from '@jl/web-ui/lib/directive';
Vue.use(JlDirective, {
  permission: {
    data() {
      return store.getters.permissionList;
    },
    // 配置权限类型，默认第一项为默认值，即 `v-has` 指的是 `button` 的，如需使用 `aiButton`，使用 `v-has:aiButton`
    type: ['button', 'form', 'column', 'aiButton'],
  },
});

this.$has('PERMISSION_CODE')

this.$has:aiButton('PERMISSION_CODE')
```
