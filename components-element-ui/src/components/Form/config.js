import MySelect from '../Select';
import MyRadio from '../Radio';
import MyCheckbox from '../Checkbox';

export const COMPONENT_MAP = {
  select: MySelect,
  radio: MyRadio,
  checkbox: MyCheckbox,
  switch: 'el-switch',
  input: 'el-input',
  date: 'el-date-picker',
};
export const PLACEHOLDER_MAP = {
  input: '请输入',
  select: '请选择',
  checkbox: '请选择',
  radio: '请选择',
  date: '请选择',
};
