import MyFormSelect from '../Form/select/index.vue';
import MyFormRadioGroup from '../Form/radio-group/index.vue';
import MyFormCheckboxGroup from '../Form/checkbox-group/index.vue';
import MyFormCycleSelect from '../Form/cycle-select/index.vue';
import MyFormSwitch from '../Form/switch/index.vue';
import MyFormInput from '../Form/input/index.vue';
import MyFormUpload from '../Form/upload/index.vue';
import MyLink from '../Link/index.vue';
import MyBusinessTextareaPopover from '../../business/TextareaPopover/index.vue';

// 共有属性
export const BASE_PROPS = {
  size: 'mini',
  clearable: true,
};

/* 
  component: 组件
  props: 组件所绑定的默认属性
*/
export const COMPONENT_MAP = {
  cascader: {
    component: 'el-cascader',
    props: {
      filterable: true,
    },
  },
  checkbox: {
    component: MyFormCheckboxGroup,
  },
  // 颜色选择器
  'color-picker': {
    component: 'el-color-picker',
    props: {
      // showAlpha: true,
      // predefine: [],
    },
  },
  // 自定义扩展
  'cycle-select': {
    component: MyFormCycleSelect,
  },
  // 日期时间组件
  date: {
    component: 'el-date-picker',
    props: {
      type: 'date',
      valueFormat: 'yyyy-MM-dd',
    },
  },
  datetime: {
    component: 'el-date-picker',
    props: {
      type: 'datetime',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
    },
  },
  input: {
    component: MyFormInput,
  },
  'input-number': {
    component: 'el-input-number',
    props: {
      controlsPosition: 'right',
    },
  },
  link: {
    component: MyLink,
  },
  radio: {
    component: MyFormRadioGroup,
  },
  // 评分
  rate: {
    component: 'el-rate',
  },
  select: {
    component: MyFormSelect,
    props: {
      filterable: true,
    },
  },
  'select-tree': {
    component: MyFormSelect,
    props: {
      type: 'tree',
      filterable: true,
    },
  },
  // 滑块
  slider: {
    component: 'el-slider',
  },
  // 开关
  switch: {
    component: MyFormSwitch,
    props: {
      size: 'mini',
      name: 'el-switch-input',
    },
  },
  textarea: {
    component: MyFormInput,
    props: {
      // autosize: true, // 不配置rows 或 minRows 默认1行高度, 会随内容自适应撑开
      type: 'textarea',
      'show-word-limit': true,
      resize: 'none',
    },
  },
  'textarea-popover': {
    component: MyBusinessTextareaPopover,
  },
  time: {
    component: 'el-time-picker',
    props: {
      valueFormat: 'HH:mm:ss',
    },
  },
  'time-select': {
    component: 'el-time-select',
  },
  // 上传
  upload: {
    component: MyFormUpload,
  },
};
