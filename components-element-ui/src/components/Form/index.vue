<template>
  <div class="flex flex-wrap">
    <el-form :model="internalValue" v-bind="$attrs" :rules="formRules">
      <el-row class="flex flex-wrap">
        <template v-for="(option, index) in options">
          <el-col v-show="isExpandAll ? true : index < foldLength" v-if="option.visible !== false" :key="option.prop" :span="inline ? null : option.span || 24">
            <el-form-item v-model="internalValue[option.value]" :label="option.label" :prop="option.value">
              <slot v-bind="option">
                <component
                  v-if="option.type && COMPONENT_MAP[option.type]"
                  :is="COMPONENT_MAP[option.type] || option.type"
                  v-model="internalValue[option.value]"
                  v-bind="{
                    placeholder: getPlaceholder(option),
                    ...option.attrs,
                  }"
                  v-on="option.listeners" />
                <div class="match-error" v-else-if="!option.type">需要配置[type]属性,或使用插槽</div>
                <div class="match-error" v-else>需要配置type=[{{ option.type }}]映射组件,或使用插槽</div>
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
            <el-button type="primary" icon="el-icon-search">查询</el-button>
            <el-button type="default" icon="el-icon-refresh-right">重置</el-button>
            <el-button type="text" class="expand-btn" :icon="isExpandAll ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" @click="isExpandAll = !isExpandAll">
              {{ isExpandAll ? '收起' : '展开' }}
            </el-button>
          </slot>
        </div>
      </el-row>
    </el-form>
  </div>
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
    // 不使用 el-form 的 inline 属性,使用自定义的 inline 属性
    // 设置 inline 后, span当会失效, 需要自定义span
    inline: {
      type: Boolean,
      default: false,
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
  },
};
</script>

<style lang="scss" scoped>
.el-form {
  width: 100%;
  .match-error {
    color: #ccc;
    cursor: not-allowed;
  }
  .footer-btn-wrap {
    flex: 1;
    display: flex;
    align-items: self-start;
    justify-content: flex-end;
  }
}
</style>
