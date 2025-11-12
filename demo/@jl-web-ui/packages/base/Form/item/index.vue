<script>
import elFormItem from 'element-ui/lib/form-item';
import { getPropByPath } from 'element-ui/src/utils/util';
import { isObject } from '@jl/web-ui/src/util';
import COM_PREFIX from '@jl/web-ui/src/config';

export default {
  name: COM_PREFIX + 'Form.Item',
  mixins: [elFormItem], // 使用 mixins 替代 extends
  inheritAttrs: false, // 添加这行，防止属性自动继承
  data() {
    return {
      internalInitialValue: null,
    };
  },
  mounted() {
    if (this.prop) {
      this.internalInitialValue = isObject(this.initialValue) ? structuredClone(this.initialValue) : this.initialValue;
    }
  },
  methods: {
    // 重置resetField方法
    resetField() {
      this.validateState = '';
      this.validateMessage = '';

      let model = this.form.model;
      let value = this.fieldValue;
      let path = this.prop.replace(/:/, '.');

      let prop = getPropByPath(model, path, true);
      this.validateDisabled = true;

      if (Array.isArray(value)) {
        prop.o[prop.k] = [].concat(this.internalInitialValue);
      } else if (isObject(this.internalInitialValue)) {
        prop.o[prop.k] = structuredClone(this.internalInitialValue);
      } else {
        prop.o[prop.k] = this.internalInitialValue;
      }

      this.$nextTick(() => {
        this.validateDisabled = false;
      });
    },
  },
};
</script>
