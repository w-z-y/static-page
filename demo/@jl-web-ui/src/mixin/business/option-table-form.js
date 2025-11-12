// 选项表格 | 选项表单共用

import modelMixin from '../model';

import JlDynamicComponent from '../../../packages/base/DynamicComponent';
import JlIcon from '../../../packages/base/Icon/index.vue';
import jlButton from '../../../packages/base/Button/index.vue';
import jlLayout from '../../../packages/base/Layout/index.vue';

export default {
  mixins: [modelMixin],
  components: {
    JlDynamicComponent,
    jlButton,
    JlIcon,
    jlLayout,
  },
  props: {
    // 是否开启删除确认
    showDeleteConfirm: { type: Boolean, default: false },
    // 控制按钮显隐
    showOperateButton: { type: Boolean, default: true },
    // 自动添加第一项(至少保留一项，不让删除)
    autoAddOneRow: { type: Boolean, default: false },
    // 添加之前需要做的操作
    beforeAdd: { type: Function },
    // 需要添加额外的字段
    extra: { type: Object, default: () => ({}) },
  },
  watch: {
    internalValue: {
      handler(val) {
        // 未定义
        if (!val) {
          this.internalValue = [];
        }
        // 有值,但没有长度
        if (val && !val.length && this.autoAddOneRow) {
          setTimeout(() => {
            this.add(0, true);
          }, 0);
        }
      },
      immediate: true,
    },
  },
  computed: {
    optionTableFormMixin_deleteButtonDisabled() {
      return this.internalValue.length === 1;
    },
  },
  data() {
    return {
      template: {},
    };
  },
  created() {
    this.createTemplate();
  },
  methods: {
    // 创建添加模板
    createTemplate() {
      const list = this.options || this.columns;
      list.map((item) => {
        this.$set(this.template, item.value, null);
      });
    },
    // 根据下标删除
    optionTableFormMixin_remove(index) {
      if (this.optionTableFormMixin_deleteButtonDisabled && this.autoAddOneRow) return;
      const spliceItem = this.internalValue[index];
      this.internalValue.splice(index, 1);
      this.$emit('remove', spliceItem);
    },
    // 点击删除按钮
    handleClickRemove(index) {
      if (!this.showDeleteConfirm) {
        this.remove(index);
      }
    },
  },
};
