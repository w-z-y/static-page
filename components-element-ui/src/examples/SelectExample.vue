<template>
    <div>
        <h2>Select 示例</h2>
        <h4>基本使用</h4>
        <MySelect v-model="value" :options="options">
        </MySelect>
        <h4>type='text'(宽度固定，如果要不固定的，建议用dropdown)</h4>
        <MySelect style="width:max-content" v-model="value" :options="options" type="text">
        </MySelect>
    </div>
</template>

<script>
import MySelect from '../components/Select/index.vue';

export default {
    components: { MySelect },
    data() {
        return {
            value: "option2",
            options: [
                { label: '选项1', value: 'option1' },
                { label: '选项2', value: 'option2', showLabel: '选项showLabel' },
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