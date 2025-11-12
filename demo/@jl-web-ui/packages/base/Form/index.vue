<template>
  <el-form
    :validate-on-rule-change="false"
    class="jl-form"
    ref="myFormRef"
    size="mini"
    inline
    :model="internalValue"
    v-bind="$attrs"
    :rules="formRules"
    @submit.native.prevent>
    <slot>
      <jl-layout ref="layoutRef" :gap="gap" :options="options" :visibleFunction="(option, index) => (isExpandAll ? true : index < foldLength)">
        <template #default="{ option, $index }">
          <jl-form-item ref="formItemRef" :label="showLabel ? option.label : ''" :prop="option.value" :class="{ 'is-required': option.required }">
            <template #label>
              {{ option.label }}
              <jl-tooltip v-if="option.tip" :content="option.tip" class="form-item-tip-icon">
                <jl-icon icon="el-icon-question" class="cursor-pointer"></jl-icon>
              </jl-tooltip>
            </template>

            <template>
              <slot name="form-item" v-bind="{ option }">
                <jl-dynamic-component
                  :ref="`dynamicComponentListRef${$index}`"
                  v-model="internalValue[option.value]"
                  :option="option"
                  :data="internalValue"
                  :style="{ width: handlePxValue(option.width) }"
                  @keyup.enter.native="handleEnter(option)">
                </jl-dynamic-component>
              </slot>
              <slot name="form-item-suffix" v-bind="{ option }"></slot>
              <div v-if="option.description" class="form-item-help">{{ option.description }}</div>
            </template>
          </jl-form-item>
        </template>
        <template #footer="{ options }">
          <el-col v-if="!!$slots.footer || footer" :span="24" class="footer-btn-wrap">
            <slot name="footer-prefix"></slot>

            <slot name="footer">
              <jl-button v-if="showSearch" primary :loading="loading" icon="el-icon-search" @click="handleSearch">
                {{ searchText }}
              </jl-button>
              <jl-button v-if="showReset" icon="el-icon-refresh-right" @click="handleReset">
                {{ resetText }}
              </jl-button>
              <jl-button
                v-if="isMoreThan(options)"
                text
                class="expand-btn"
                :icon="isExpandAll ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
                @click="toggleExpand">
                {{ isExpandAll ? '收起' : '展开' }}
              </jl-button>
            </slot>

            <slot name="footer-suffix"></slot>
          </el-col>
        </template>
      </jl-layout>
    </slot>
  </el-form>
</template>

<script>
import COM_PREFIX from '@jl/web-ui/src/config';
import propsMixin from '@jl/web-ui/src/mixin/props';
import modelMixin from '@jl/web-ui/src/mixin/model';

import { getPlaceholder } from '@jl/web-ui/src/util/placeholder';
import { handlePxValue } from '@jl/web-ui/src/util';

import JlDynamicComponent from '../DynamicComponent';
import JlFormItem from './item/index.vue';
import JlLayout from '../Layout';
import JlButton from '../Button';
import JlTooltip from '../Tooltip';
import JlIcon from '../Icon';

export default {
  name: COM_PREFIX + 'Form',
  mixins: [propsMixin, modelMixin],
  components: {
    JlDynamicComponent,
    JlFormItem,
    JlLayout,
    JlButton,
    JlTooltip,
    JlIcon,
  },
  props: {
    /*
      option:
        label: string
        value: string
        required: boolean           是否必填
        rules: array                表单规则
        props | attrs: object       表单项绑定属性
        events | listeners: object  表单项绑定事件
        type: string                表单项类型（通过DynamicComponents映射)
        description                 描述
      ---布局相关
        flex: string|number         flex 布局属性
        style: object               自定义样式
        xs
        sm
        md
    */
    options: { type: Array, required: true },
    foldLength: { type: Number, default: Infinity },
    gap: { type: Number, default: 16 },
    loading: { type: Boolean, default: false },
    // 是否显示表单按钮
    footer: { type: Boolean, default: false },
    // 控制显隐
    showLabel: { type: Boolean, default: true },
    showSearch: { type: Boolean, default: true },
    showReset: { type: Boolean, default: true },
    // 按钮文字调整
    searchText: { type: String, default: '查询' },
    resetText: { type: String, default: '重置' },
  },
  data() {
    return {
      isExpandAll: false,
      debouncedSearch: null,
      initValue: {},
    };
  },
  computed: {
    formRules() {
      const rules = {};
      this.options.forEach((option) => {
        if (option.required) {
          rules[option.value] = [
            {
              required: true,
              message: this.getProps(option)?.placeholder || getPlaceholder(option),
              trigger: ['change'],
            },
          ];
        }
        if (option.rules) {
          rules[option.value] = rules[option.value] || [];
          rules[option.value].push(...(Array.isArray(option.rules) ? option.rules : [option.rules]));
        }
      });
      return rules;
    },
  },
  created() {
    this.initValue = JSON.parse(JSON.stringify(this.internalValue));
  },
  methods: {
    handlePxValue,
    isMoreThan(options) {
      return this.foldLength < options.length;
    },
    getProps(option) {
      return {
        ...(option.attrs || {}),
        ...(option.props || {}),
      };
    },
    // 点击查询按钮
    handleSearch() {
      this.validate((valid) => {
        if (valid) {
          this.$emit('search');
        }
      });
    },
    // 点击重置按钮
    handleReset() {
      this.$refs.myFormRef.resetFields();
      this.$emit('reset');
    },
    // 点击展开、收起
    toggleExpand() {
      this.isExpandAll = !this.isExpandAll;
      this.$emit('expand-change', this.isExpandAll);
    },
    validate(callback) {
      return this.$refs.myFormRef.validate(callback);
    },
    clearValidate(props) {
      this.$refs.myFormRef.clearValidate(props);
    },
    resetFields(bool = false) {
      const myFormRef = this.$refs.myFormRef;
      myFormRef.resetFields();
      // 清除未绑定的字段
      if (bool) {
        for (let key in this.internalValue) {
          if (!myFormRef.fields.some((field) => field.prop === key)) {
            this.internalValue[key] = this.initValue[key];
          }
        }
      }
    },
    handleEnter(option) {
      if (option.enter) {
        this.handleSearch();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.el-form {
  width: 100%;
  &[label-position='top'] {
    .el-form-item {
      display: block;
    }
  }
  .el-form-item {
    display: flex;
    margin-bottom: 0;
    margin-right: 0;

    ::v-deep .el-form-item__label {
      flex-shrink: 0;
      line-height: 28px;
      .form-item-tip-icon {
        color: #999;
        line-height: 1;
        vertical-align: baseline;
        &:hover {
          color: var(--jl-primary);
        }
      }
    }

    ::v-deep .el-form-item__content {
      flex: 1;
      line-height: 28px;
    }

    &.is-required {
      ::v-deep .el-form-item__label::before {
        content: '*';
        color: #f56c6c;
        margin-right: 4px;
      }
    }

    .match-component-error {
      color: #909399;
      font-size: 12px;
      line-height: 28px;
      cursor: not-allowed;
    }

    .form-item-help {
      font-size: 12px;
      color: #909399;
      line-height: 1.2;
      margin-top: 4px;
    }
  }

  .footer-btn-wrap {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    ::v-deep .el-button {
      margin-left: 0;
    }
    .expand-btn {
      margin-left: 8px;
    }
  }
}
</style>
