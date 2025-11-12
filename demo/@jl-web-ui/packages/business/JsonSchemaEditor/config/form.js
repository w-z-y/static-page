export function formList() {
  return [
    {
      label: '字段名',
      value: 'key',
      type: 'input',
      flex: 1,
      style: { maxWidth: '200px' },
      required: true,
      listeners: {
        input: (val, row, field) => {
          row[field] = val;
          this.debouncedUpdate();
        },
      },
      rules: [
        {
          validator: (rule, value, callback) => {
            const num = this.internalValue.filter((item) => item.key === value).length;
            if (num > 1) {
              callback(new Error('字段名重复!'));
            } else {
              callback();
            }
          },
        },
      ],
      attrs: {
        placeholder: '字段名',
      },
    },
    {
      label: '描述',
      value: 'description',
      type: 'input',
      flex: 1,
      style: { maxWidth: '200px' },
      required: true,
      listeners: {
        input: (val, row, field) => {
          row[field] = val;
          this.debouncedUpdate();
        },
      },
      attrs: {
        placeholder: '名称',
      },
    },
    {
      label: '字段类型',
      value: 'type',
      type: 'select',
      required: true,
      flex: 1,
      attrs: {
        style: { maxWidth: '100px' },
        clearable: false,
        filterable: false,
        options: this.fieldTypeList,
      },
      listeners: {
        change: (val, row, field) => {
          row[field] = val;
          this.handleUpdate();
        },
      },
    },
    {
      label: '',
      value: 'required',
      type: 'checkbox',
      flex: '0 0 80px',
      attrs: {
        options: [{ label: '必填', value: 1 }],
        style: {
          paddingLeft: '10px',
        },
      },
      listeners: {
        change: (val, row, field) => {
          row[field] = val;
          // 必填状态改变时立即更新，不使用防抖
          this.handleUpdate();
        },
      },
    },
  ];
}
