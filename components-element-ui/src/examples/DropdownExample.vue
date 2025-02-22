<template>
    <div>
        <h2>Dropdown 示例</h2>
        <MyDropdown v-model="selectedOption" :options="dropdownOptions" @change="handleDropdownChange">
            <template #default>
                请选择一个选项
            </template>
        </MyDropdown>
    </div>
</template>

<script>
import MyDropdown from '../components/Dropdown/index.vue';

export default {
    components: { MyDropdown },
    data() {
        return {
            selectedOption: '',
            dropdownOptions: [
                { label: '选项1', value: 'option1' },
                { label: '选项2', value: 'option2' },
                { label: '选项3', value: 'option3' }
            ]
        };
    },
    methods: {
        handleDropdownChange(value) {
            console.log('选择的值:', value);
        }
    }
}
</script>