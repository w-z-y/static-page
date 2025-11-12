## `props` 混入

### 适用场景

- 用于封装组件时，灵活映射属性名的混入。

- 当你开发可复用组件时，常常会遇到这样的问题：外部数据结构的字段名（如 `label` 和 `value`）不固定，而你的组件内部逻辑依赖于这些字段名。通过使用 `props` 混入，可以灵活地将外部 `props` 字段映射为组件内部统一的字段名，提升组件的适配性。例如，数据源有的是 `{ label: '名字', value: '编号' }`，有的是 `{ fullName: '名字', id: '编号' }`，这时只需通过 `props` 属性映射即可适配不同的数据结构，而无需修改组件内部实现。

### 组件内部注册

```html
<template>
  <div>
    <!-- 错误示例 -->
    <!-- <label>{{ data.label }}}}</label> -->
    <!-- <span>{{ data.value }}}}</span> -->

    <!-- 正确写法 -->
    <label>{{ data{{ defaultProps.label }}}}</label>
    <span>{{ data{{ defaultProps.value }}}}</span>
  </div>
</template>

<script>
  import propsMixin from '@jl/web-ui/lib/mixin/props';

  export default {
    props: {
        data: { type: Object, default: () => {} }
    }
    //...
    mixins: [propsMixin],
    // ...
    mounted() {
      /*
      通过 defaultProps 来获取
      默认值: { label: 'label', value: 'value' }

      */
      console.log(this.defaultProps);
    },
  };
</script>
```

### 使用组件

```html
<template>
  <compA :props="propsMap" />
</template>

<script>
  export default {
    data() {
      return {
        propsMap: {
          label: 'fullName',
          value: 'id',
        },
      };
    },
  };
</script>
```
