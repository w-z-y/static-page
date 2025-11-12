# Image 图片

- 增加了`width`, `height`属性
- 增加了`preview` 用于更方便的让一张图支持预览
- 对图片 `加载中` 和 `加载失败` 状态做了优化
- 修复了图片跟文字的对齐问题

## 尺寸自适应

:::demo

```vue
<jl-image src="https://picsum.photos/200/100"></jl-image>
```

:::

## 设置尺寸

:::demo

```vue
<jl-image :src="src" :width="20" :height="20"></jl-image>
<jl-image :src="src" :width="80" :height="80"></jl-image>
<jl-image :src="src" :width="140" :height="140"></jl-image>

<script>
export default {
  data() {
    return {
      src: 'https://fastly.picsum.photos/id/11/400/200.jpg?hmac=_zeBFBsi-r7h1nsIcEVSVqmGDqFr6eHK5ceAt9GVlwo',
    };
  },
};
</script>
```

:::

## 预览

:::demo

```vue
<template>
  <jl-card header="预览当前图片">
    <jl-image src="https://fastly.picsum.photos/id/1040/200/200.jpg?hmac=l5Cp_plxzlfQobWWyd5uqBPiqjX1CApBpWP3w8DzYK0" preview></jl-image>
  </jl-card>
  <jl-card header="预览列表">
    <jl-image
      src="https://fastly.picsum.photos/id/544/200/200.jpg?hmac=iIsE7MkJ1i0DzyQjD7hXFjiVpz8uukzJTk9XCNuWS8c"
      :preview-src-list="previewSrcList"></jl-image>
  </jl-card>
</template>
<script>
export default {
  data() {
    return {
      previewSrcList: [
        'https://fastly.picsum.photos/id/68/200/200.jpg?hmac=CPg7ZGK1PBwt6DmjjPRApX_t-mOiYxt0pel50VH4Gwk',
        'https://fastly.picsum.photos/id/544/200/200.jpg?hmac=iIsE7MkJ1i0DzyQjD7hXFjiVpz8uukzJTk9XCNuWS8c',
        'https://fastly.picsum.photos/id/770/200/200.jpg?hmac=QFpEnsRd_HVWziMxXltLr7icjRJhyhL7vsBAwyXrotA',
      ],
    };
  },
};
</script>
```

:::
