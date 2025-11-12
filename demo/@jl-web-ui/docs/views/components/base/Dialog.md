# Dialog 对话框

对话框用于在页面中弹出一个模态框，常用于表单提交、信息确认、内容展示等场景。支持拖拽、自定义按钮、加载状态等功能。

## 基本用法

::: demo

```vue
<template>
  <jl-button primary @click="handleOpen">打开弹窗</jl-button>
  <jl-button danger @click="handleOpen2">删除</jl-button>

  <jl-dialog title="弹窗标题" :visible.sync="isVisibleDialog" width="500px" @ok="handleOk" @closed="handleClosed"> 这是一段信息 </jl-dialog>

  <jl-dialog
    title="提示"
    :visible.sync="isVisibleDialog2"
    width="500px"
    show-delete-button
    :show-confirm-button="false"
    @ok="handleOk"
    @closed="handleClosed">
    确定删除吗？
  </jl-dialog>
</template>
<script>
export default {
  data() {
    return {
      isVisibleDialog: false,
      isVisibleDialog2: false,
    };
  },
  methods: {
    handleOpen() {
      this.isVisibleDialog = true;
    },
    handleOpen2() {
      this.isVisibleDialog2 = true;
    },
    handleOk() {
      // 确认
      console.log('确认');
    },
    handleClosed() {
      // 一般在这里清空表单校验
      console.log('关闭动画结束');
    },
  },
};
</script>
```

:::

::: demo

```vue
<template>
  <jl-button success @click="handleOpen">打开全屏弹窗</jl-button>
  <jl-dialog.fullscreen title="弹窗标题" :visible.sync="isVisibleDialog" width="500px" @ok="handleOk"> 这是一段信息 </jl-dialog.fullscreen>
</template>
<script>
export default {
  data() {
    return {
      isVisibleDialog: false,
    };
  },
  methods: {
    handleOpen() {
      this.isVisibleDialog = true;
    },
    handleOk() {
      // 确认
      console.log('全局弹窗确认');
    },
  },
};
</script>
```

:::

## 更便捷的删除确认用法

::: tip 使用 $jlConfirm 方法，需要全局注册这个指令，如下：

<br/>

```js
// 全局注册
import JlWebUiMessageBox from '@jl/web-ui/lib/MessageBox';
import '@jl/web-ui/lib/css/MessageBox.css';
Vue.use(JlWebUiMessageBox);
```

:::

::: demo

```vue
<template>
  <jl-button danger @click="handleDelete">删除</jl-button>
  <jl-button primary @click="handleConfirm">是否确认</jl-button>
</template>
<script>
export default {
  methods: {
    handleDelete() {
      this.$jlConfirm({
        title: '提示标题', // 默认内容： 提示
        content: '提示内容', // 默认内容： 此操作将永久删除
        deleteButtonText: '取消删除!!!!!', // 删除按钮文本
        cancelButtonText: '关闭弹窗!!!!!', // 取消按钮文本
        beforeClose: async () => {
          await new Promise((resolve) => {
            setTimeout(resolve, 1000);
          });
        },
      });
    },
    handleConfirm() {
      this.$jlConfirm({
        title: '提示标题', // 默认内容： 提示
        content: '提示内容', // 默认内容： 此操作将永久删除
        showDeleteButton: false, // 隐藏默认删除按钮
        showConfirmButton: true, // 隐藏默认确认按钮
        confirmButtonText: '点击确认~~~', // 确认按钮文本
        cancelButtonText: '关闭弹窗~~~', // 取消按钮文本
        beforeClose: async () => {
          await new Promise((resolve) => {
            setTimeout(resolve, 1000);
          });
        },
      });
    },
  },
};
</script>
```

:::

### Attributes

| 参数                | 说明                 | 类型    | 可选值       | 默认值 |
| ------------------- | -------------------- | ------- | ------------ | ------ |
| visible             | 是否显示对话框       | boolean | true / false | false  |
| title               | 对话框标题           | string  | —            | —      |
| width               | 对话框宽度           | string  | —            | —      |
| loading             | 是否显示加载状态     | boolean | true / false | false  |
| footer              | 是否显示底部按钮区域 | boolean | true / false | true   |
| show-delete-button  | 是否显示删除按钮     | boolean | true / false | false  |
| show-confirm-button | 是否显示确认按钮     | boolean | true / false | true   |
| delete-button-text  | 删除按钮文本         | string  | —            | 删除   |
| confirm-button-text | 确认按钮文本         | string  | —            | 确认   |
| cancel-button-text  | 取消按钮文本         | string  | —            | 取消   |

### Events

| 事件名 | 说明               | 回调参数                       |
| ------ | ------------------ | ------------------------------ |
| ok     | 点击确认按钮时触发 | callback: 关闭对话框的回调函数 |
| cancel | 点击取消按钮时触发 | —                              |

### Dialog.Slot

| 插槽名  | 说明           |
| ------- | -------------- |
| default | 对话框内容     |
| tip     | 副标题         |
| footer  | 自定义底部按钮 |

### DialogFullscreen.Slot

| 插槽名  | 说明                 |
| ------- | -------------------- |
| default | 对话框内容           |
| title   | 自 定义标题内容      |
| options | 右上角额外的操作按钮 |
