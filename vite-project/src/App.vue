<script setup>
import { ref, onMounted, computed, unref } from 'vue'
import AutoForm from './components/AutoForm/index.vue'


const formData = ref({
  name: '张三',
  email: 'zhangsan@example.com',
  gender: 'male',
  hobbies: ['reading', 'sports'],
  file: null,
  city: '北京',
  birthday: '',
  score: 80,
  website: 'https://example.com',
  password: '',
  description: '',
  color: '#000000',
  range: 50
})

// 表单配置
const formConfig = ref([
  { label: '姓名', type: 'text', key: 'name' },
  { label: '邮箱', type: 'email', key: 'email' },
  {
    label: '性别',
    type: 'radio',
    key: 'gender',
    options: [
      { label: '男', value: 'male' },
      { label: '女', value: 'female' }
    ]
  },
  { label: '爱好', type: 'checkbox', key: 'hobbies', options: [] },
  { label: '城市', type: 'select', key: 'city', options: [] },
  { label: '生日', type: 'date', key: 'birthday' },
  { label: '分数', type: 'number', key: 'score' },
  { label: '个人网站', type: 'url', key: 'website' },
  { label: '密码', type: 'password', key: 'password' },
  { label: '个人简介', type: 'textarea', key: 'description' },
  { label: '文件', type: 'file', key: 'file' },
  { label: '颜色', type: 'color', key: 'color' },
  { label: '范围', type: 'range', key: 'range', min: 0, max: 100, step: 1 }
])

// 表单验证配置
const formRules = computed(() => ({
  name: [
    { required: true },
    { min: 2, max: 20, message: '姓名长度在2-20个字符之间' },
    { pattern: /^[\u4e00-\u9fa5]+$/, message: '请输入中文姓名' }
  ],
  hobbies: [
    { required: true },
    { type: 'array', max: 3, message: '最多选择3个爱好' }
  ],
  city: [{ required: true }],
  file: [
    { required: true },
    {
      validator: (_, value) => value?.size > 5 * 1024 * 1024 ? Promise.reject('文件大小不能超过5MB') : Promise.resolve()
    }
  ],
  gender: [{ required: true }],
  email: [
    { required: unref(formData)?.name?.length >= 5 },
    { pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: '请输入正确的邮箱格式' }
  ],
  birthday: [{ required: true }],
  score: [
    { required: true },
    { type: 'number', min: 0, max: 100, message: '分数必须在0-100之间' }
  ],
  website: [
    { pattern: /^https?:\/\/.+/, message: '请输入有效的网址' }
  ],
  color: [{ required: true }]
}))

</script>

<template>
  <AutoForm :formData="formData" :formConfig="formConfig" :formRules="formRules" />
</template>

<style scoped></style>
