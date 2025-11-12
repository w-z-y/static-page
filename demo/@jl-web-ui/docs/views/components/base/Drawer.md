# Drawer 抽屉

抽屉组件用于从屏幕边缘滑入的面板，常用于表单编辑、详情展示、设置面板等场景。支持多种尺寸、位置、自定义内容等功能。

## 基本用法

::: demo

```vue
<template>
  <div>
    <jl-button primary @click="drawerVisible = true">打开抽屉</jl-button>
    <jl-drawer title="抽屉标题" :visible.sync="drawerVisible" size="30%">
      <div style="padding: 20px">
        <p>这是一个基础的抽屉内容</p>
        <p>抽屉从右侧滑入，可以包含任何内容</p>
      </div>
    </jl-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawerVisible: false,
    };
  },
};
</script>
```

:::

## 可调节大小抽屉

::: demo

```vue
<template>
  <div>
    <jl-form.switch v-model="modal" active-text="是否需要遮罩层"></jl-form.switch>
    <br />
    <br />
    <jl-button success @click="drawerVisible = true">打开抽屉</jl-button>
    <jl-drawer.split :modal="modal" :default-percent="60" :min-percent="20" :visible.sync="drawerVisible">
      <div style="padding: 20px">
        <p>这是一个基础的抽屉内容</p>
        <p>抽屉从右侧滑入，可以包含任何内容</p>
      </div>
    </jl-drawer.split>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modal: false,
      drawerVisible: false,
    };
  },
};
</script>
```

:::

### Attributes

#### Drawer

| 参数            | 说明                 | 类型                | 可选值       | 默认值 |
| --------------- | -------------------- | ------------------- | ------------ | ------ |
| visible         | 是否显示抽屉         | boolean             | true / false | false  |
| title           | 抽屉标题             | string              | —            | —      |
| size            | 抽屉大小             | string/number       | —            | '30%'  |
| showHeader      | 是否显示头部         | boolean             | true / false | true   |
| footer          | 是否显示底部按钮     | boolean             | true / false | false  |
| loading         | 加载状态             | boolean             | true / false | false  |
| padding         | 内容区域的内边距     | string/number/array | —            | '10px' |
| wrapperClosable | 是否可以通过遮罩关闭 | boolean             | true / false | false  |
| modal           | 是否需要遮罩层       | boolean             | true / false | true   |

#### Drawer.Split

| 参数            | 说明           | 类型           | 可选值       | 默认值 |
| --------------- | -------------- | -------------- | ------------ | ------ |
| default-percent | 默认百分比(%)  | number         | —            | 50     |
| min-percent     | 最小百分比(%)  | number / array | —            | 20     |
| modal           | 是否需要遮罩层 | boolean        | true / false | false  |

### Events

| 事件名 | 说明               | 回调参数                     |
| ------ | ------------------ | ---------------------------- |
| ok     | 点击确认按钮时触发 | callback: 关闭抽屉的回调函数 |
| cancel | 点击取消按钮时触发 | —                            |

### Slot

| 插槽名  | 说明     |
| ------- | -------- |
| default | 抽屉内容 |
