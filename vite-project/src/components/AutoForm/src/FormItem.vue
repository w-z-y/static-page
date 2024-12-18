<script setup>
import { computed } from 'vue'

const props = defineProps({
    item: {
        type: Object,
        required: true
    },
    modelValue: {
        type: [String, Number, Array, Object],
        default: ''
    },
    validateField: {
        type: Function,
        required: true
    }
})

const emit = defineEmits(['update:modelValue'])

  // 文件处理
  const handleFileChange = ({ target: { files: [file] } }) => {
    emit('update:modelValue', file)
    props.validateField(props.item, file)
  }
// 处理值更新
const handleValueChange = (value) => {
    emit('update:modelValue', value)
    props.validateField(props.item, value)
}
</script>

<template>
    <div class="input-group">
        <label>
            <span v-if="item.required" class="required">*</span>
            {{ item.label }}：
        </label>

        <div class="input-wrapper">
            <slot :item="item">
                <!-- 选择框 -->
                <select v-if="item.type === 'select'" :value="modelValue" :placeholder="item.placeholder"
                    @change="e => handleValueChange(e.target.value)">
                    <option v-for="opt in item.options" :key="opt" :value="opt">{{ opt }}</option>
                </select>

                <!-- 文本域 -->
                <textarea v-else-if="item.type === 'textarea'" :value="modelValue" :placeholder="item.placeholder"
                    @input="e => handleValueChange(e.target.value)">
                </textarea>

                <!-- 单选/多选 -->
                <template v-else-if="['radio', 'checkbox'].includes(item.type) && item.options.length > 0">
                    <template v-for="opt in item.options" :key="opt.value">
                        <input :type="item.type" :value="opt.value" :id="opt.value"
                            :checked="Array.isArray(modelValue) ? modelValue.includes(opt.value) : modelValue === opt.value"
                            @change="e => handleValueChange(item.type === 'checkbox' ?
                                (e.target.checked ? [...(modelValue || []), opt.value] : (modelValue || []).filter(v => v !== opt.value)) :
                                e.target.value)">
                        <label :for="opt.value">{{ opt.label }}</label>
                    </template>
                </template>

                <!-- 文件上传 -->
                <div v-else-if="item.type === 'file'" class="file-upload">
                    <input type="file" :id="item.key" @change="handleFileChange" class="file-input">
                    <label :for="item.key" class="file-label">
                        <span class="file-text">{{ modelValue?.name || '选择文件' }}</span>
                        <span class="file-button">浏览</span>
                    </label>
                </div>

                <!-- 颜色选择器 -->
                <div v-else-if="item.type === 'color'" class="color-picker">
                    <input type="color" :value="modelValue" class="color-input"
                        @input="e => handleValueChange(e.target.value)">
                    <span class="color-value">{{ modelValue }}</span>
                </div>

                <!-- 默认输入框 -->
                <input v-else :type="item.type" :value="modelValue" :placeholder="item.placeholder" :min="item.min"
                    :max="item.max" :step="item.step" @input="e => handleValueChange(e.target.value)"
                    :class="{ 'date-input': item.type === 'date' }">
            </slot>

            <div class="error-message">
                <slot name="error"></slot>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import './index.css'
</style>
