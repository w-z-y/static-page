<script setup>
import { ref, onMounted, computed, unref } from 'vue'
import useMockData from '../hooks/useMockData'
import { generatePlaceholder } from './utils'
import FormItem from './FormItem.vue'
const props = defineProps({
  formData: {
    type: Object,
    required: true
  },
  formRules: {
    type: Object,
    required: true
  },
  formConfig: {
    type: Array,
    required: true
  }
})

// 生成验证规则
const generateValidationRules = (key, type, label) => {
  const rules = unref(props.formRules)[key] || []

  return rules.map(rule => {
    if (rule.required) return { ...rule, message: generatePlaceholder(type, label) }
    if (rule.message) return rule

    if (rule.type === 'array') {
      return {
        ...rule,
        message: rule.max ? `最多选择${rule.max}个${label}` : generatePlaceholder(type, label)
      }
    }

    if (rule.min || rule.max) {
      if (rule.type === 'number') {
        return {
          ...rule,
          message: `${label}必须在${rule.min || 0}-${rule.max || '∞'}之间`
        }
      }
      return {
        ...rule,
        message: `${label}长度在${rule.min || 0}-${rule.max || 20}个字符之间`
      }
    }

    if (rule.pattern) return { ...rule, message: `请输入正确的${label}格式` }
    if (rule.validator) return rule

    return { ...rule, message: generatePlaceholder(type, label) }
  })
}

// 表单逻辑
function useForm(config, initialData = {}) {
  // 状态定义
  const formData = ref(initialData)
  const formErrors = ref({})
  const initialFormData = ref({ ...initialData }) // 保存初始值

  // 配置处理
  const configArray = computed(() => Array.isArray(unref(config)) ? unref(config) : [])
  const enrichFormConfig = computed(() => configArray.value.map(item => ({
    ...item,
    placeholder: generatePlaceholder(item.type, item.label),
    rules: generateValidationRules(item.key, item.type, item.label),
    required: generateValidationRules(item.key, item.type, item.label).some(rule => rule.required)
  })))

  // 字段验证
  const validateField = (item, value) => {
    const enrichedItem = enrichFormConfig.value.find(config => config.key === item.key)
    if (!enrichedItem) return true

    const { key, rules = [] } = enrichedItem
    const fieldValue = value || unref(formData)[key]

    // 必填校验
    const requiredRule = rules.find(rule => rule.required)
    const isArrayType = rules.some(rule => rule.type === 'array')

    if (requiredRule?.required) {
      const isEmpty = !fieldValue || (isArrayType && Array.isArray(fieldValue) && !fieldValue.length)
      if (isEmpty) {
        formErrors.value[key] = requiredRule.message || ''
        return false
      }
    }

    // 非必填且为空值则跳过校验
    const isEmptyValue = !fieldValue || (Array.isArray(fieldValue) && !fieldValue.length)
    if (isEmptyValue && !requiredRule?.required) {
      formErrors.value[key] = ''
      return true
    }

    // 规则校验
    const validateRule = ({ required, pattern, min, max, validator, type }) => {
      if (required) return false

      if (pattern && !pattern.test(fieldValue)) return true
      if (type === 'array' && Array.isArray(fieldValue) && max && fieldValue.length > max) return true
      if (type === 'number' && (min !== undefined && fieldValue < min || max !== undefined && fieldValue > max)) return true
      if (fieldValue?.length && ((min && fieldValue.length < min) || (max && fieldValue.length > max))) return true

      if (validator) {
        let validResult = true
        validator(null, fieldValue).catch(() => validResult = false)
        return !validResult
      }

      return false
    }

    const error = rules.find(validateRule)
    formErrors.value[key] = error?.message || ''
    return !error
  }

  // 文件处理
  const handleFileChange = ({ target: { files: [file] } }) => {
    formData.value.file = file
    validateField(enrichFormConfig.value.find(item => item.key === 'file'), file)
  }

  // 表单验证与提交
  const validate = () => enrichFormConfig.value
    .map(item => validateField(item, unref(formData)[item.key]))
    .every(Boolean)

  const submitForm = async () => {
    if (!validate()) return

    try {
      await submitFormData(unref(formData))
      console.log('表单提交成功:', unref(formData))
    } catch (error) {
      console.error('表单提交失败:', error)
    }
  }

  // 清除验证信息
  const clearValidate = () => {
    formErrors.value = {}
  }

  // 表单重置
  const resetForm = () => {
    // 遍历初始值的每个属性进行重置
    Object.keys(initialFormData.value).forEach(key => {
      formData.value[key] = Array.isArray(initialFormData.value[key])
        ? [...initialFormData.value[key]]
        : initialFormData.value[key]
    })
    clearValidate()
  }

  return {
    formData,
    formErrors,
    validateField,
    handleFileChange,
    submitForm,
    resetForm,
    enrichFormConfig,
    clearValidate
  }
}

const { formErrors, validateField, handleFileChange, submitForm, resetForm, enrichFormConfig } = useForm(props.formConfig, props.formData)
const { mockData, getFieldOptions } = useMockData(props.formConfig)

const submitFormData = async data => new Promise(resolve => setTimeout(() => resolve(data), 1000))

onMounted(async () => {
  await Promise.all([
    getFieldOptions('city', mockData.cities, ['北京', '上海', '广州', '深圳']),
    getFieldOptions('hobbies', mockData.hobbies, [
      { label: '阅读', value: 'reading' },
      { label: '运动', value: 'sports' },
      { label: '音乐', value: 'music' }
    ])
  ])
})
</script>

<template>
  <div class="form-container">
    <FormItem v-for="item in enrichFormConfig" :key="item.key" :item="item" v-model="formData[item.key]"
      :validate-field="validateField" :handle-file-change="handleFileChange">
      <template #default="{ item }">
        <slot :item="item" />
      </template>
      <template #error>
        {{ formErrors[item.key] }}
      </template>
    </FormItem>

    <div class="button-group">
      <button class="submit-btn" @click="submitForm">提交</button>
      <button class="reset-btn" @click="resetForm">重置</button>
    </div>
  </div>
</template>

<style scoped>
@import './index.css'
</style>
