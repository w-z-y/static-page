// pc端 基础通用组件
const base = {
  // 高级表格
  // AdvanceTable: './packages/base/AdvanceTable/index.vue',
  // 按钮
  Button: './packages/base/Button/index.vue',
  // 折叠面板
  Collapse: './packages/base/Collapse/index.vue',
  // 卡片
  Card: './packages/base/Card/index.vue',
  // 代码编辑器
  'CodeEditor.Sql': './packages/base/CodeEditor/sql/index.vue',
  // 抽屉
  Drawer: './packages/base/Drawer/index.vue',
  'Drawer.Split': './packages/base/Drawer/split.vue',
  // 弹窗
  Dialog: './packages/base/Dialog/index.vue',
  'Dialog.Fullscreen': './packages/base/Dialog/fullscreen/index.vue',
  // 下拉
  Dropdown: './packages/base/Dropdown/index.vue',
  // 动态表单项
  DynamicComponent: './packages/base/DynamicComponent/index.vue',
  // 图表
  Echarts: './packages/base/Echarts/index.vue',
  // 空
  Empty: './packages/base/Empty/index.vue',
  // 表单
  Form: './packages/base/Form/index.vue',
  FormItem: './packages/base/Form/item/index.vue',
  'Form.Checkbox': './packages/base/Form/checkbox/index.vue',
  'Form.CheckboxGroup': './packages/base/Form/checkbox-group/index.vue',
  'Form.CycleSelect': './packages/base/Form/cycle-select/index.vue',
  'Form.Input': './packages/base/Form/input/index.vue',
  'Form.Radio': './packages/base/Form/radio/index.vue',
  'Form.RadioGroup': './packages/base/Form/radio-group/index.vue',
  'Form.Select': './packages/base/Form/select/index.vue',
  'Form.Switch': './packages/base/Form/switch/index.vue',
  'Form.Upload': './packages/base/Form/upload/index.vue',
  // 图片
  Image: './packages/base/Image/index.vue',
  // 图标
  Icon: './packages/base/Icon/index.vue',
  'Icon.Hover': './packages/base/Icon/hover/index.vue',
  'Icon.Fullscreen': './packages/base/Icon/fullscreen/index.vue',
  'Icon.Loading': './packages/base/Icon/loading/index.vue',
  // json编辑器
  JsonEditor: './packages/base/JsonEditor/index.vue',
  // 布局
  Layout: './packages/base/Layout/index.vue',
  // 链接
  Link: './packages/base/Link/index.vue',
  // List列表
  List: './packages/base/List/index.vue',
  // 加载
  Loading: './packages/base/Loading/index.vue',
  // Markdown编辑器
  MarkdownEditor: './packages/base/MarkdownEditor/index.vue',
  // 分页
  Pagination: './packages/base/Table/src/components/pagination.vue',
  // 弹窗框
  Popover: './packages/base/Popover/index.vue',
  // 气泡确认框
  Popconfirm: './packages/base/Popconfirm/index.vue',
  // 尺寸变化
  Resizer: './packages/base/Resizer/index.vue',
  // 普通文本编辑器
  TextEditor: './packages/base/TextEditor/index.vue',
  // 滑块
  Slider: './packages/base/Slider/index.vue',
  // 分割面板
  SplitPane: './packages/base/SplitPane/index.vue',
  // 骨架屏
  Skeleton: './packages/base/Skeleton/index.vue',
  // 树
  Tree: './packages/base/Tree/index.vue',
  'Tree.FileTree': './packages/base/Tree/file-tree.vue',
  // 标签
  Tabs: './packages/base/Tabs/index.vue',
  // 表格
  Table: './packages/base/Table/index.vue',
  TableColumn: './packages/base/Table/src/components/column.vue',
  // 标签
  Tag: './packages/base/Tag/index.vue',
  // 过渡
  Transition: './packages/base/Transition/index.vue',
  // 提示
  Tooltip: './packages/base/Tooltip/index.vue',
};
// h5基础通用组件
const baseH5 = {
  'H5List': './packages/base-h5/List/index.vue',
};
// pc端 业务组件
const business = {
  // 语音功能
  'Business.Audio': './packages/business/Audio/index.vue',
  // 'Business.CardList': './packages/business/CardList/index.vue',
  'Business.Speech': './packages/business/Speech/index.vue',
  // json-schema-editor编辑器
  'Business.JsonSchemaEditor': './packages/business/JsonSchemaEditor/index.vue',
  // 选项表单
  'Business.OptionForm': './packages/business/OptionForm/index.vue',
  // 选项表格表单
  'Business.OptionTableForm': './packages/business/OptionTableForm/index.vue',
  // 翻译
  'Business.Translate': './packages/business/Translate/index.vue',
  'Business.TranslateItem': './packages/business/Translate/item.vue',
  // 文本域弹出框
  'Business.TextareaPopover': './packages/business/TextareaPopover/index.vue',
};
// pc端 ai组件
const ai = {
  // 聊天气泡
  'Ai.Bubble': './packages/ai/Bubble/index.vue',
  // AI按钮
  'Ai.Button': './packages/ai/Button/index.vue',
  // AI卡片
  'Ai.Card': './packages/ai/Card/index.vue',
  // 消息容器(自动滚动功能+置底)
  'Ai.MessageContainer': './packages/ai/MessageContainer/index.vue',
  // markdown
  'Ai.Markdown': './packages/ai/Markdown/index.vue',
};

module.exports = {
  ...base,
  ...baseH5,
  ...business,
  ...ai,
};
