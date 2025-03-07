<template>
  <el-form ref="myFormRef" inline :model="internalValue" v-bind="$attrs" :rules="formRules">
    <el-row class="flex flex-wrap" :gutter="16">
      <template v-for="(option, index) in options">
        <el-col v-show="isExpandAll ? true : index < foldLength" v-if="option.visible !== false" :key="option.prop" :span="option.span || 24">
          <el-form-item v-model="internalValue[option.value]" :label="option.label" :prop="option.value">
            <slot v-bind="{ option }">
              <component
                v-if="option.type && COMPONENT_MAP[option.type]"
                :is="COMPONENT_MAP[option.type] || option.type"
                style="width: 100%"
                v-model="internalValue[option.value]"
                v-bind="{
                  placeholder: getPlaceholder(option),
                  clearable: true,
                  disabled: option.disabled,
                  ...option.attrs,
                }"
                v-on="option.listeners"
              />
              <div class="match-component-error" v-else-if="!option.type">需要配置[type]属性,或使用插槽</div>
              <div class="match-component-error" v-else>需要配置type=[{{ option.type }}]映射组件,或使用插槽</div>
              <!-- 
                                    插槽使用
                                    <template #default="option">
                                        <div v-if="option.value === 'slot'">slot</div>
                                    </template>
                                -->
            </slot>
          </el-form-item>
        </el-col>
      </template>

      <div v-if="footer" class="footer-btn-wrap">
        <slot name="footer">
          <el-button @click="search" type="primary" icon="el-icon-search">查询</el-button>
          <el-button @click="reset" type="default" icon="el-icon-refresh-right">重置</el-button>
          <el-button v-if="foldLength < options.length" type="text" class="expand-btn" :icon="isExpandAll ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" @click="isExpandAll = !isExpandAll">
            {{ isExpandAll ? '收起' : '展开' }}
          </el-button>
        </slot>
      </div>
    </el-row>
  </el-form>
</template>

<script>
import propsMixin from '@/mixins/props'; /* defaultProps */
import modelMixin from '@/mixins/model'; /* internalValue */

import formRulesMixin from './rules'; /* formRules */

import { COMPONENT_MAP, PLACEHOLDER_MAP } from './config';
export default {
  name: 'MyForm',
  mixins: [propsMixin, modelMixin, formRulesMixin],
  props: {
    options: {
      type: Array,
      required: true,
    },
    foldLength: {
      type: Number,
      default: Infinity,
    },
    // 设置 footer为 true, 才能用 footer 插槽
    footer: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isExpandAll: false,
      COMPONENT_MAP: Object.freeze(COMPONENT_MAP),
    };
  },
  methods: {
    getPlaceholder(option) {
      return `${PLACEHOLDER_MAP[option.type] || '请输入'}${option.label}`;
    },
    search() {
      this.$emit('search');
    },
    reset() {
      this.$refs.myFormRef.resetFields();
      this.$emit('reset');
    },
  },
};
</script>

<style lang="scss" scoped>
.el-form {
  width: 100%;
  margin-bottom: -18px;
  .el-form-item {
    display: flex;
    ::v-deep .el-form-item__label {
      flex-shrink: 0;
    }
    ::v-deep .el-form-item__content {
      flex: 1;
    }
    .match-component-error {
      color: #ccc;
      cursor: not-allowed;
    }
  }
  .footer-btn-wrap {
    margin-bottom: 18px;
    flex: 1;
    display: flex;
    align-items: self-start;
    justify-content: flex-end;
  }
}
</style>
