module.exports = {
  '/views/components/': [
    {
      title: '⚛️基础组件',
      collapsable: false,
      key: 'base',
      children: [
        // {
        //   title: '高级表格 AdvanceTable',
        //   path: 'AdvanceTable',
        // },
        {
          title: '按钮 Button',
          path: 'base/Button',
        },
        {
          title: '卡片 Card',
          path: 'base/Card',
        },
        {
          title: '代码编辑器 CodeEditor',
          path: 'base/CodeEditor',
        },
        {
          title: '折叠面板 Collapse',
          path: 'base/Collapse',
        },
        {
          title: '对话框 Dialog',
          path: 'base/Dialog',
        },
        {
          title: '抽屉 Drawer',
          path: 'base/Drawer',
        },
        {
          title: '下拉菜单 Dropdown',
          path: 'base/Dropdown',
        },
        {
          title: '图表 ECharts',
          path: 'base/ECharts',
        },
        {
          title: '空状态 Empty',
          path: 'base/Empty',
        },
        {
          title: '表单 Form',
          path: 'base/form/Form',
        },
        {
          title: '表单项 Form.Item',
          collapsable: false,
          children: [
            {
              title: '多选 Form.Checkbox',
              path: 'base/form/Checkbox',
            },
            {
              title: '周期选择 Form.CycleSelect',
              path: 'base/form/CycleSelect',
            },
            {
              title: '输入框 Form.Input',
              path: 'base/form/Input',
            },
            {
              title: '单选 Form.Radio',
              path: 'base/form/Radio',
            },
            {
              title: '输入框 Form.Select',
              path: 'base/form/Select',
            },
          ],
        },
        {
          title: '图标 Icon',
          path: 'base/Icon',
        },
        {
          title: '图片 Image',
          path: 'base/Image',
        },
        {
          title: '布局 Layout',
          path: 'base/Layout',
        },
        {
          title: '列表List',
          path: 'base/List',
        },
        {
          title: '加载 Loading',
          path: 'base/Loading',
        },
        {
          title: 'JSON编辑器 JsonEditor',
          path: 'base/JsonEditor',
        },
        {
          title: 'Markdown编辑器 MarkdownEditor',
          path: 'base/MarkdownEditor',
        },
        {
          title: '弹出框 Popover',
          path: 'base/Popover',
        },
        {
          title: '滑块 Slider',
          path: 'base/Slider',
        },
        {
          title: '分割面板 SplitPane',
          path: 'base/SplitPane',
        },
        {
          title: '表格 Table',
          path: 'base/Table',
        },
        {
          title: '标签页 Tabs',
          path: 'base/Tabs',
        },
        {
          title: '标签 Tag',
          path: 'base/Tag',
        },
        {
          title: '文本编辑器 TextEditor',
          path: 'base/TextEditor',
        },
        {
          title: '过渡 Transition',
          path: 'base/Transition',
        },
        {
          title: '文字提示 Tooltip',
          path: 'base/Tooltip',
        },
        {
          title: '树 Tree',
          path: 'base/Tree',
        },
      ],
    },
    {
      title: '🧩业务组件',
      collapsable: false,
      key: 'business',
      children: [
        {
          title: '音频预览 Audio',
          path: 'business/Audio',
        },
        // {
        //   title: '卡片列表 CardList',
        //   path: 'business/CardList',
        // },
        {
          title: '选项表单 OptionForm',
          path: 'business/OptionForm',
        },
        {
          title: 'JsonSchema编辑器 JsonSchemaEditor',
          path: 'business/JsonSchemaEditor',
        },
        {
          title: '选项表格表单 OptionTableForm',
          path: 'business/OptionTableForm',
        },
        {
          title: '语音 Speech',
          path: 'business/Speech',
        },
        {
          title: '翻译 Translate',
          path: 'business/Translate',
        },
        {
          title: '文本域弹出框 TextareaPopover',
          path: 'business/TextareaPopover',
        },
      ],
    },
    {
      title: '🤖AI相关',
      key: 'ai',
      collapsable: false,
      children: [
        {
          title: '聊天气泡 Bubble',
          path: 'ai/Ai.Bubble',
        },
        {
          title: '按钮 Button',
          path: 'ai/Ai.Button',
        },
        {
          title: '卡片 Card',
          path: 'ai/Ai.Card',
        },
        {
          title: '聊天内容 Markdown',
          path: 'ai/Ai.Markdown',
        },
        {
          title: '消息容器 MessageContainer',
          path: 'ai/Ai.MessageContainer',
        },
      ],
    },
  ],
};
