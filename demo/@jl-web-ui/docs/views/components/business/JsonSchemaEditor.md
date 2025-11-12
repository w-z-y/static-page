# JsonSchemaEditor JsonSchema 编辑器

## 基本用法

<ClientOnly>
::: demo

```vue
<template>
  <jl-business.json-schema-editor v-model="value"></jl-business.json-schema-editor>
</template>

<script>
export default {
  data() {
    return {
      value: '',
    };
  },
};
</script>
```

:::
</ClientOnly>

## 显示编辑器`show-json-editor`

<ClientOnly>
::: demo

```vue
<template>
  <jl-business.json-schema-editor v-model="value" show-json-editor></jl-business.json-schema-editor>
</template>

<script>
export default {
  data() {
    return {
      value: '',
    };
  },
};
</script>
```

:::
</ClientOnly>

## 类型可配置 `type-visible-function`, 需要返回 `TYPE.xxx[]` 格式

<ClientOnly>
::: demo

```vue
<template>
  <jl-business.json-schema-editor v-model="value" :type-visible-function="typeVisibleFunction"></jl-business.json-schema-editor>
</template>

<script>
export default {
  data() {
    return {
      value: '',
    };
  },
  methods: {
    typeVisibleFunction(TYPE) {
      console.log('TYPE', TYPE);
      return [TYPE.STRING, TYPE.OBJECT];
    },
  },
};
</script>
```

:::
</ClientOnly>

## 异步加载数据

<ClientOnly>
::: demo

```vue
<template>
  <jl-business.json-schema-editor v-model="value"></jl-business.json-schema-editor>
</template>

<script>
export default {
  data() {
    return {
      value: '',
    };
  },
  mounted() {
    setTimeout(() => {
      this.value = JSON.stringify({
        properties: {
          userInfo: {
            type: 'object',
            description: '人员信息',
            properties: {
              id: {
                type: 'string',
                description: '用户ID',
              },
              name: {
                type: 'array',
                description: '用户姓名',
                items: {
                  type: 'object',
                  properties: {
                    item1: {
                      type: 'number',
                      description: 'item1111',
                    },
                    item2: {
                      type: 'string',
                      description: 'item2222',
                    },
                  },
                  required: [],
                },
              },
            },
            required: [],
          },
          startTime: {
            type: 'string',
            description: '开始时间',
          },
        },
        required: [],
      });
    }, 100);
  },
};
</script>
```

:::
</ClientOnly>

### Attributes

| 参数                  | 说明                                                                     | 类型     | 可选值     | 默认值   |
| --------------------- | ------------------------------------------------------------------------ | -------- | ---------- | -------- |
| value/v-model         | 绑定 json 字符串                                                         | string   | —          | ""       |
| type-visible-function | 控制字段类型选择下拉可见类型的函数，参数为全部类型列表，返回可见类型列表 | Function | —          | () => [] |
| show-json-editor      | 是否显示原生 JSON 编辑器，辅助可视化表单操作                             | Boolean  | true/false | false    |
