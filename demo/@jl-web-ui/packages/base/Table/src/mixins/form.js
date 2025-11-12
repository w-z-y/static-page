import { getPlaceholder } from '@jl/web-ui/src/util/placeholder';

export default {
  computed: {
    formMixin_formRules() {
      const rules = {};
      if (!this.validate) return null;
      this.data.forEach((row, rowIndex) => {
        this.columns.forEach((option) => {
          const key = `${option.value}-${rowIndex}`;
          if (option.required) {
            rules[key] = [
              {
                required: true,
                message: this.formMixin_getProps(option) && this.formMixin_getProps(option).placeholder || getPlaceholder(option),
                trigger: ['change'],
              },
            ];
          }
          if (option.rules) {
            rules[key] = rules[key] || [];
            rules[key].push(...(Array.isArray(option.rules) ? option.rules : [option.rules]));
          }
        });
      });
      return rules;
    },
    formMixin_formData() {
      if (!this.validate) return null;
      const formObj = {};
      this.data.forEach((row, rowIndex) => {
        this.columns.forEach((column) => {
          const key = `${column.value}-${rowIndex}`;
          formObj[key] = row[column.value];
        });
      });
      return formObj;
    },
  },
  methods: {
    formMixin_getProps(option) {
      return {
        ...(option.attrs || {}),
        ...(option.props || {}),
      };
    },
  },
};
