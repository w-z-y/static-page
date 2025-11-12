# SplitPane 分割面板

分割面板组件用于创建可调整大小的分割布局，支持水平分割、垂直分割、最小/最大尺寸限制等功能。常用于代码编辑器、文件管理器、数据分析工具等需要灵活布局的场景。

## 基本用法

通过`direction`属性可以设置分割方向。

::: demo

```vue
<template>
  <jl-card padding="0" style="height: 400px;">
    <jl-split-pane>
      <template #A>
        <jl-split-pane direction="vertical" style="height: 400px;" hover-color="blue" hover-width="4px">
          <template #A>
            <div class="area">左上</div>
          </template>
          <template #B>
            <div class="area">左下</div>
          </template>
        </jl-split-pane>
      </template>
      <template #B>
        <jl-split-pane direction="vertical" style="height: 400px;" hover-color="green" hover-width="4px">
          <template #A>
            <div class="area">右上</div>
          </template>
          <template #B>
            <div class="area">右下</div>
          </template>
        </jl-split-pane>
      </template>
    </jl-split-pane>
  </jl-card>
</template>
<style>
.area {
  padding: 10px;
}
</style>
```

:::

## 间距

通过`gap`属性可以设置间距。

::: demo

```vue
<template>
  <jl-card padding="0" style="height: 400px;background: #eee;padding: 10px">
    <jl-split-pane :gap="20">
      <template #A>
        <jl-split-pane :gap="20" direction="vertical" style="height: 400px;" hover-color="blue" hover-width="4px">
          <template #A>
            <jl-card class="w-full h-full">左上</jl-card>
          </template>
          <template #B>
            <jl-card class="w-full h-full">左下</jl-card>
          </template>
        </jl-split-pane>
      </template>
      <template #B>
        <jl-split-pane :gap="20" direction="vertical" style="height: 400px;" hover-color="green" hover-width="4px">
          <template #A>
            <jl-card class="w-full h-full">右上</jl-card>
          </template>
          <template #B>
            <jl-card class="w-full h-full">右下</jl-card>
          </template>
        </jl-split-pane>
      </template>
    </jl-split-pane>
  </jl-card>
</template>
<style>
.area {
  padding: 10px;
}
</style>
```

:::

## 自定义拖拽按钮和禁用

:::tip

- 通过 `hover` 控制悬浮时才显示分割线

- 通过 `resizer`和`resizer-bar` 两个插槽来实现自定义拖拽 bar

- 通过 `disabled` 控制拖拽禁用, 直接不显示
  :::

::: demo

```vue
<template>
  <jl-card padding="0" style="height: 400px;">
    <jl-split-pane>
      <template #A>
        <jl-split-pane hover direction="vertical" style="height: 400px;">
          <template #A>
            <div class="area">左上</div>
          </template>
          <template #resizer-bar>
            <div style="background: #eee;width: 150px; border-radius: 10px; text-align: center">
              <div>自定义</div>
              <div style="font-size: 12px; color: #888">【resizer-bar】跟随bar，hover显示</div>
            </div>
          </template>
          <template #B>
            <jl-split-pane disabled>
              <template #A>
                <div style="padding: 20px">禁用一</div>
              </template>
              <template #B>
                <div style="padding: 20px">禁用二</div>
              </template>
            </jl-split-pane>
          </template>
        </jl-split-pane>
      </template>
      <template #B>
        <jl-split-pane hover direction="vertical" style="height: 400px;">
          <template #A>
            <div class="area">右上</div>
          </template>
          <template #resizer>
            <div style="background: #eee;width: 100px; border-radius: 10px; text-align: center">
              <div>自定义</div>
              <div style="font-size: 12px; color: #888">【resizer】 常显示</div>
            </div>
          </template>
          <template #B>
            <div class="area">右下</div>
          </template>
        </jl-split-pane>
      </template>
    </jl-split-pane>
  </jl-card>
</template>
<style>
.area {
  padding: 10px;
}
</style>
```

:::

## 设置初始尺寸

通过 `default-size`，`default-percent` 属性可以设置面板的初始尺寸。

::: tip 两种模式
`default-size` 单位 px

`default-percent` 单位%
:::

::: warning
`px` 模式只有传入了 `defaultSize` 才会开启
:::

::: demo

```vue
<template>
  <jl-card padding="0" style="height: 400px;">
    <jl-split-pane :default-size="100">
      <template #A>
        <div class="area">左(初始宽100px)</div>
      </template>
      <template #B>
        <jl-split-pane direction="vertical" :default-percent="80">
          <template #A>
            <div class="area">右上(初始高80%)</div>
          </template>
          <template #B>
            <div class="area">右下</div>
          </template>
        </jl-split-pane>
      </template>
    </jl-split-pane>
  </jl-card>
</template>
<style>
.area {
  padding: 10px;
}
</style>
```

:::

## 最小/最大尺寸限制 (默认 20%或 200px)

::: tip
通过`default-size`设置默认固定尺寸

通过`min-size`和`min-percent`属性可以限制面板的尺寸范围。

通过`reverse`属性可以控制默认是左/上侧还是右/下侧尺寸。
:::

### 设置左侧默认尺寸

::: demo

```vue
<template>
  <jl-card padding="0" style="height: 400px;">
    <jl-split-pane :default-size="200" :min-size="[100, 300]">
      <template #A>
        <div class="area">左(宽最小100px, 最大300px)</div>
      </template>
      <template #B>
        <jl-split-pane direction="vertical" :min-percent="30">
          <template #A>
            <div class="area">右上(高最小30%)</div>
          </template>
          <template #B>
            <div class="area">右下(高最小30%)</div>
          </template>
        </jl-split-pane>
      </template>
    </jl-split-pane>
  </jl-card>
</template>
<style>
.area {
  padding: 10px;
}
</style>
```

:::

### 设置右侧默认尺寸

::: demo

```vue
<template>
  <jl-card padding="0" style="height: 400px;">
    <jl-split-pane reverse :default-size="200" :min-size="[100, 300]">
      <template #A>
        <jl-split-pane direction="vertical" :min-percent="30">
          <template #A>
            <div class="area">左上(高最小30%)</div>
          </template>
          <template #B>
            <div class="area">左下(高最小30%)</div>
          </template>
        </jl-split-pane>
      </template>
      <template #B>
        <div class="area">右(宽最小100px, 最大300px)</div>
      </template>
    </jl-split-pane>
  </jl-card>
</template>
<style>
.area {
  padding: 10px;
}
</style>
```

:::

## 事件处理

可以监听分割面板的尺寸变化事件。
::: demo

```vue
<template>
  <jl-card padding="0" style="height: 400px;">
    <jl-split-pane :default-size="defaultSize" :min-size="[100, 300]" @resize="handleSize" @resize-end="handleSizeEnd">
      <template #A>
        <div class="area">{{ `${defaultSize}px` }} —— {{ resizeStatus }}</div>
      </template>
      <template #B>
        <jl-split-pane direction="vertical" style="height: 400px;" :min-percent="30" @resize="handleSize2">
          <template #A>
            <div class="area">{{ `${defaultPercent}%` }}</div>
          </template>
          <template #B>
            <div class="area">{{ `${100 - defaultPercent}%` }}</div>
          </template>
        </jl-split-pane>
      </template>
    </jl-split-pane>
  </jl-card>
</template>
<script>
const defaultSize = 200;
const defaultPercent = 30;
export default {
  data() {
    return {
      // 默认尺寸
      defaultSize,
      // 当前尺寸
      defaultPercent,
      // 状态
      resizeStatus: 'end',
    };
  },
  methods: {
    handleSize(size) {
      this.defaultSize = parseInt(size);
      this.resizeStatus = 'move';
    },
    handleSize2(size) {
      this.defaultPercent = parseInt(size);
    },
    handleSizeEnd(size) {
      console.log(size);
      this.resizeStatus = 'end';
    },
  },
};
</script>
<style>
.area {
  /* padding: 10px */
}
</style>
```

:::

## 过渡效果

可以监听分割面板的尺寸变化事件。
::: demo

```vue
<template>
  <jl-button @click="isTransition = !isTransition">{{ isTransition ? '关闭' : '开启' }}过渡</jl-button>
  <br />
  <br />
  <jl-card padding="0" style="height: 400px;">
    <jl-split-pane
      :transition="isTransition"
      :default-percent="defaultPercent"
      @transition-start="handleTransitionStart"
      @transition-end="handleTransitionEnd">
      <template #A> </template>
      <template #B> </template>
    </jl-split-pane>
  </jl-card>
</template>
<script>
export default {
  data() {
    return {
      defaultPercent: 20,
      isTransition: true,
    };
  },
  methods: {
    handleTransitionStart() {
      console.log('transition-start');
    },
    handleTransitionEnd() {
      console.log('transition-end');
    },
  },
  mounted() {
    setInterval(() => {
      if (this.defaultPercent === 80) {
        this.defaultPercent = 0;
      }
      this.defaultPercent += 10;
    }, 1000);
  },
};
</script>
<style>
.area {
  /* padding: 10px */
}
</style>
```

:::

### Attributes

| 参数            | 说明                 | 类型           | 可选值                | 默认值     |
| --------------- | -------------------- | -------------- | --------------------- | ---------- |
| direction       | 分割方向             | string         | "vertical"/"vertical" | "vertical" |
| default-size    | 默认尺寸(px)         | number         | —                     | null       |
| default-percent | 默认百分比(%)        | number         | —                     | 50         |
| min-size        | 最小尺寸(px)         | number / array | —                     | 200        |
| min-percent     | 最小百分比(%)        | number / array | —                     | 20         |
| disabled        | 禁用拖拽             | boolean        | —                     | false      |
| hover           | 交互方式————悬浮显示 | boolean        | —                     | false      |
| transition      | 过渡效果             | boolean        | —                     | false      |
| hoverColor      | 悬浮时，线的颜色     | string         | —                     | -          |

### Events

| 事件名称         | 说明                      | 回调参数           |
| ---------------- | ------------------------- | ------------------ |
| resize           | 面板尺寸变化时触发        | size: 当前面板尺寸 |
| resize-end       | 鼠标松开触发              | size: 当前面板尺寸 |
| transition-start | 继承`jl-transition`的事件 |                    |
| transition-end   | 继承`jl-transition`的事件 |                    |

### Slot

| name        | 说明                                                               |
| ----------- | ------------------------------------------------------------------ |
| A           | 左/上 (`direction="vertical"`对应左，`direction="vertical"`对应上) |
| B           | 右/下 (`direction="vertical"`对应右，`direction="vertical"`对应下) |
| resizer     | 拖拽按钮插槽————跟随线的显隐                                       |
| resizer-bar | 拖拽按钮插槽————常显                                               |
