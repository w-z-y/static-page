# Tabs 标签页

标签页用于将内容分组到可访问的选项卡中，支持多种标签页类型、自定义标签内容、响应式布局等功能。

内置：

1. 标签文字超出提示
2. `editable`配置后，内部支持关闭标签逻辑

## 基本用法

::: demo

```vue
<template>
  <jl-tabs :options="tabOptions" v-model="activeTab">
    <template #content="{ option }">
      <template v-if="['tab1', 'tab2'].includes(option.value)"> {{ option.value }}-使用组件A </template>
      <template v-else> {{ option.value }}-使用组件B </template>
    </template>
  </jl-tabs>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 'tab1',
      tabOptions: [
        { label: '标签页1(文字超出提示|文字超出提示|文字超出提示)', value: 'tab1' },
        { label: '标签页2(文字超出提示|文字超出提示|文字超出提示)', value: 'tab2' },
        { label: '标签页3', value: 'tab3' },
      ],
    };
  },
};
</script>
```

:::

## 嵌套 tabs

::: demo

```vue
<template>
  <jl-form.switch v-model="isCard" active-text="卡片" inactive-text=""></jl-form.switch>
  <hr />
  <jl-tabs :type="isCard ? 'card' : ''" :options="tabOptions" v-model="activeTab">
    <template #content="{ option }">
      <template v-if="option.value === 'tab1'">
        <h3>标签页1的内容</h3>
        <p>这是第一个标签页的详细内容...</p>
      </template>
      <template v-else-if="option.value === 'tab2'">
        <h3>标签页2的内容</h3>
        <p>这是第二个标签页的详细内容...</p>
        <jl-card header="嵌套tabs">
          <jl-tabs tab-position="left" type="border-card" :options="tabOptions" v-model="activeTab2">
            <template #content>
              <jl-tabs :options="tabOptions" v-model="activeTab3">
                <template #content>
                  <div>嵌套tabs</div>
                </template>
              </jl-tabs>
            </template>
          </jl-tabs>
        </jl-card>
      </template>
      <template v-else-if="option.value === 'tab3'">
        <h3>标签页3的内容</h3>
        <p>这是第三个标签页的详细内容...</p>
      </template>
    </template>
  </jl-tabs>
</template>

<script>
export default {
  data() {
    return {
      isCard: false,
      activeTab: 'tab1',
      activeTab2: 'tab1',
      activeTab3: 'tab1',
      tabOptions: [
        { label: '标签页1', value: 'tab1' },
        { label: '标签页2', value: 'tab2' },
        { label: '标签页3', value: 'tab3' },
      ],
    };
  },
};
</script>
```

:::

## 自定义标签内容

::: tip 插槽

- `label-prefix` (标签前缀)
- `label` (标签, 默认已做内容超出省略优化)
- `label-suffix` (标签后缀)
- `content` (标签下的内容)
- `operation` (操作区域, 暂只支持 tab-position="top"时使用)
  :::

::: demo

```vue
<template>
  <jl-form.switch v-model="isCard" active-text="卡片" inactive-text=""></jl-form.switch>
  <hr />
  <jl-tabs :type="isCard ? 'card' : ''" :options="tabOptions" v-model="activeTab">
    <!-- 标签名前缀 -->
    <template #label-prefix="{ option }">
      <jl-icon :icon="option.icon"></jl-icon>
    </template>
    <!-- 标签名后缀 -->
    <template #label-suffix="{ option }">
      <el-badge v-if="option.badge" :value="option.badge"></el-badge>
    </template>
    <!-- 详细内容 -->
    <template #content="{ option }">
      <div class="tab-content">
        <h3>{{ option.label }}</h3>
        <p>{{ option.content }}</p>
      </div>
    </template>

    <template #operation>
      <jl-button>operation</jl-button>
    </template>
  </jl-tabs>
</template>

<script>
export default {
  data() {
    return {
      isCard: false,
      activeTab: 'tab1',
      tabOptions: [
        {
          label: '消息(文字超出提示|文字超出提示|文字超出提示)',
          value: 'tab1',
          icon: 'el-icon-message',
          badge: 5,
          content: '您有5条未读消息',
        },
        {
          label: '通知',
          value: 'tab2',
          icon: 'el-icon-bell',
          badge: 2,
          content: '您有2条未读通知',
        },
        {
          label: '设置',
          value: 'tab3',
          icon: 'el-icon-setting',
          content: '系统设置选项',
        },
      ],
    };
  },
};
</script>
```

:::

## 位置

::: demo

```vue
<template>
  <div class="flex items-center" style="gap: 10px">
    <jl-form.radio-group v-model="position" type="button" :options="radioOptions"> </jl-form.radio-group>
    <jl-form.switch v-model="isCard" active-text="卡片" inactive-text=""> </jl-form.switch>
  </div>
  <hr />
  <jl-tabs
    style="height: 200px"
    :type="isCard ? 'card' : ''"
    :tab-position="position"
    :options="tabOptions"
    v-model="activeTab"
    :operation-size="100">
    <!-- 标签名前缀 -->
    <template #label-prefix="{ option }">
      <jl-icon :icon="option.icon"></jl-icon>
    </template>
    <!-- 标签名后缀 -->
    <template #label-suffix="{ option }">
      <el-badge v-if="option.badge" :value="option.badge"></el-badge>
    </template>
    <!-- 详细内容 -->
    <template #content="{ option }">
      <div class="tab-content">
        <h3>{{ option.label }}</h3>
        <p>{{ option.content }}</p>
      </div>
    </template>

    <template #operation>
      <jl-button>operation</jl-button>
    </template>
  </jl-tabs>
</template>

<script>
export default {
  data() {
    return {
      isCard: false,
      position: 'left',
      radioOptions: [
        { label: 'top', value: 'top' },
        { label: 'right', value: 'right' },
        { label: 'bottom', value: 'bottom' },
        { label: 'left', value: 'left' },
      ],
      activeTab: 'tab1',
      tabOptions: [
        {
          label: '消息(文字超出提示|文字超出提示|文字超出提示)',
          value: 'tab1',
          icon: 'el-icon-message',
          badge: 5,
          content: '您有5条未读消息',
        },
        {
          label: '通知',
          value: 'tab2',
          icon: 'el-icon-bell',
          badge: 2,
          content: '您有2条未读通知',
        },
        {
          label: '设置',
          value: 'tab3',
          icon: 'el-icon-setting',
          content: '系统设置选项',
        },
      ],
    };
  },
};
</script>
```

:::

## 可删除

可以通过`label-prefix`和`label-suffix`插槽为标签添加前缀和后缀内容。

::: demo

```vue
<template>
  <div class="flex items-center" style="gap: 10px">
    <jl-button primary @click="handleAddTab">添加Tab</jl-button>
    <jl-form.switch v-model="isCard" active-text="卡片" inactive-text=""></jl-form.switch>
  </div>
  <hr />
  <jl-tabs ref="tabRef" :type="isCard ? 'card' : ''" :options="tabOptions" v-model="activeTab" closable :operation-size="80">
    <template #operation>
      <jl-button primary @click="handleAddTab">添加</jl-button>
    </template>
  </jl-tabs>
  <hr />
</template>

<script>
export default {
  data() {
    return {
      isCard: true,
      activeTab: 'tab1',
      tabOptions: [
        {
          label: '首页',
          value: 'tab1',
          icon: 'el-icon-house',
          content: '欢迎来到首页',
        },
        {
          label: '用户管理',
          value: 'tab2',
          icon: 'el-icon-user',
          closable: true,
          content: '用户管理功能',
        },
        {
          label: '系统设置',
          value: 'tab3',
          icon: 'el-icon-setting',
          closable: true,
          content: '系统设置功能',
        },
      ],
    };
  },
  methods: {
    handleAddTab() {
      this.$refs.tabRef.add({
        label: 'New Tab',
        value: 'newTab' + new Date().getTime(),
        content: 'New Content',
      });
    },
  },
};
</script>
```

:::

### Attributes

| 参数          | 说明                     | 类型                                  | 可选值           | 默认值 |
| ------------- | ------------------------ | ------------------------------------- | ---------------- | ------ |
| options       | 标签页选项配置           | <DocOption type="tabs"></DocOption>[] | —                | []     |
| value         | 当前激活的标签页         | string                                | —                | —      |
| type          | 标签页类型               | string                                | card/border-card | —      |
| closable      | 标签是否可关闭           | boolean                               | true / false     | false  |
| addable       | 标签是否可增加           | boolean                               | true / false     | false  |
| editable      | 标签是否同时可增加和关闭 | boolean                               | true / false     | false  |
| stretch       | 标签的宽度是否自撑开     | boolean                               | true / false     | false  |
| operationSize | 操作区域尺寸             | Number                                | -                | -      |

### 标签页选项配置 (options)

详见[Option 配置项](/views/config/Tabs)。

### Events

| 事件名     | 说明                     | 回调参数                              |
| ---------- | ------------------------ | ------------------------------------- |
| tab-click  | 标签页被点击时触发       | tab: 被点击的标签页对象               |
| tab-remove | 标签页被删除时触发       | targetName: 被删除的标签页名称        |
| tab-add    | 标签页被增加时触发       | —                                     |
| edit       | 点击标签页编辑按钮时触发 | targetName, action: 'remove' 或 'add' |

### Slot

| 插槽名       | 说明           | 参数       |
| ------------ | -------------- | ---------- |
| label        | 自定义标签内容 | { option } |
| label-prefix | 标签前缀内容   | { option } |
| label-suffix | 标签后缀内容   | { option } |
| content      | 标签页内容     | { option } |
| operation    | 操作区域       | -          |
