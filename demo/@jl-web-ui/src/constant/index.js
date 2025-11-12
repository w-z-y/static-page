// markdown 类型
export const MARKDOWN_STATUS = {
  OPEN: 'open',
  CLOSE: 'close',
};
export const MARKDOWN_TYPE = {
  TEXT: 'text',
  CODE_BLOCK: 'code_block',
  TABLE_BLOCK: 'table_block',
};

export const CODE_BLOCK_TYPE = {
  ECHARTS: 'echarts',
};

export const DEFAULT_PROPS = {
  label: 'label',
  value: 'value',

  // 树形数据
  children: 'children',
  parentId: 'parentId',

  // 表单相关
  disabled: 'disabled',
  // disabled:    boolean || function(data){}     (el-tree)
  // showLabel:   string                          (dropdown)

  // 分页相关
  total: 'total',
  currentPage: 'currentPage',
  pageSize: 'pageSize',
};
