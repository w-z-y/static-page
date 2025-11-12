# Layout 布局

- 通过配置每一项来控制布局

### Attributes

| 参数            | 说明                           | 类型                                    | 可选值 | 默认值 |
| --------------- | ------------------------------ | --------------------------------------- | ------ | ------ |
| options         | 布局选项配置                   | <DocOption type="layout"></DocOption>[] | —      | []     |
| gap             | 布局项之间的间距               | number                                  | —      | 16     |
| visibleFunction | 控制选项是否显示的函数(v-show) | function                                | —      | —      |

### Slot

| 插槽名  | 说明       | 参数                      |
| ------- | ---------- | ------------------------- |
| default | 布局项内容 | { option, $index }        |
| footer  | 底部内容   | options(处理后的 options) |
