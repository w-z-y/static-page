<template>
  <jl-popover placement="top-start">
    <jl-button text style="font-size: 20px">option</jl-button>
    <template #content>
      <h1>{{ type }}</h1>
      <jl-markdown-editor v-model="optionMap[type]" readonly></jl-markdown-editor>
    </template>
  </jl-popover>
</template>

<script>
export default {
  name: 'DocOption',
  props: {
    type: { type: String, default: '' },
  },
  data() {
    return {
      optionMap: {
        collapse: `
| 参数             | 说明                              | 类型          | 可选值       | 默认值 |
| ---------------- | --------------------------------- | ------------- | ------------ | ------ |
| label            | 标签文本                          | string        | —            | —      |
| value            | 字段名                            | string        | —            | —      |
| attrs/props      | 控件属性 (key 统一使用驼峰命名)   | object        | —            | {}     |
| listeners/events | 事件监听 (key 统一使用驼峰命名)   | object        | —            | {}     |
| disabled         | 控件禁用                          | vue           |              |        |
| type             | 控件类型，如 input/select/date 等 | string        | —            | input  |
| component        | 自定义组件 (需提供 v-model/attrs) | vue           |              |        |
| required         | 是否必填                          | boolean       | true / false | false  |
| rules            | 验证规则                          | array         | —            | []     |
| span             | 表单项占比（0~24）                | number/string | —            | 24     |
| tip              | 表单提示信息                      | string        | —            | —      |
| description      | 表单描述信息                      | string        | —            | —      |
| flex             | 表单项 flex 布局属性              | number/string | —            | —      |
        `,

        dropdown: `
| 参数      | 说明                                          | 类型        | 可选值                         | 默认值 |
| --------- | --------------------------------------------- | ----------- | ------------------------------ | ------ |
| label     | 标签文本                                      | string      | —                              | —      |
| value     | 字段名                                        | string      | —                              | —      |
| showLabel | 用于回显用的 label(需要组件配置 v-model 使用) | string      | —                              | —      |
| disabled  | 是否禁用                                      | boolean     | true / false                   | false  |
| icon      | label 前图标                                  | vue /string | —                              | —      |
| children  | 多级下拉菜单                                  | array       | -                              | -      |
| divided   | 分割线                                        | boolean     | true / false                   | false  |
| type      | 颜色类型                                      | string      | warning/primary/success/danger | -      |
            `,

        form: `
| 参数                 | 说明                                                                | 类型          | 可选值       | 默认值 |
| -------------------- | ------------------------------------------------------------------- | ------------- | ------------ | ------ |
| label                | 标签文本                                                            | string        | —            | —      |
| value                | 字段名                                                              | string        | —            | —      |
| attrs/props          | 控件属性 (key 统一使用驼峰命名)                                      | object        | —            | {}     |
| listeners/events     | 事件监听 (key 统一使用驼峰命名)                                      | object        | —            | {}     |
| disabled             | 控件禁用                                                            | vue           |              |        |
| type                 | 控件类型，如 input/select/date 等                                   | string        | —            | input  |
| component            | 自定义组件 (需提供 v-model/attrs，字符串可以是 element-ui 的组件名) | vue /string   |              |        |
| required             | 是否必填                                                            | boolean       | true / false | false  |
| rules                | 验证规则                                                            | array         | —            | []     |
| tip                  | 表单提示信息                                                        | string        | —            | —      |
| description          | 表单描述信息                                                        | string        | —            | —      |
| flex (继承 Layout)   | 表单项 flex 布局属性                                                | number/string | —            | —      |
| span(继承 Layout)    | 栅格占据的列数                                                      | number        | -            | 24     |
| visible(继承 Layout) | 是否显示(v-if)                                                      | boolean       | true/false   | —      |
| width (继承 Layout)  | 固定宽度                                                            | number/string | -            | -      |

- [其他属性继承 Element.Layout](https://element.eleme.cn/#/zh-CN/component/layout#col-attributes)
            `,

        layout: `
| 参数    | 说明           | 类型          | 可选值     | 默认值 |
| ------- | -------------- | ------------- | ---------- | ------ |
| flex    | 是否自动撑开   | number/string | 1          | 'none' |
| span    | 栅格占据的列数 | number        | -          | 24     |
| visible | 是否显示(v-if) | boolean       | true/false | —      |
| width   | 固定宽度       | number/string | -          | -      |

- [其他属性继承 Element.Layout](https://element.eleme.cn/#/zh-CN/component/layout#col-attributes)
        `,

        table: `
| 参数             | 说明                                                                | 类型          | 可选值       | 默认值 |
| ---------------- | ------------------------------------------------------------------- | ------------- | ------------ | ------ |
| label            | 标签文本                                                            | string        | —            | —      |
| value            | 字段名                                                              | string        | —            | —      |
| attrs/props      | 控件属性 (key 统一使用驼峰命名)                                     | object        | —            | {}     |
| listeners/events | 事件监听 (key 统一使用驼峰命名)                                     | object        | —            | {}     |
| disabled         | 控件禁用                                                            | vue           |              |        |
| type             | 控件类型，如 input/select/date 等                                   | string        | —            | input  |
| component        | 自定义组件 (需提供 v-model/attrs，字符串可以是 element-ui 的组件名) | vue /string   |              |        |
| required         | 是否必填                                                            | boolean       | true / false | false  |
| rules            | 验证规则                                                            | array         | —            | []     |
| visible          | 是否显示(v-if)                                                      | boolean       | true/false   | —      |
| width            | 固定宽度                                                            | number/string | -            | -      |
        `,

        tabs: `
| 参数             | 说明       | 类型    | 可选值 | 默认值 |
| ---------------- | ---------- | ------- | ------ | ------ |
| label            | 标签文本   | string  | —      | —      |
| value            | 字段名     | string  | —      | —      |
| attrs/props      | 控件属性   | object  | —      | {}     |
| listeners/events | 事件监听   | object  | —      | {}     |
| disabled         | 禁用       | vue     | —      |        |
| closable         | 可关闭     | boolean | —      | false  |
| lazy             | 是否懒加载 | boolean | —      | false  |
        `,
      },
    };
  },
  mounted() {},
};
</script>

<style scoped lang="scss"></style>
