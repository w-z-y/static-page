<template>
    <div>
        <h2>Select 示例</h2>
        <h4>基本使用</h4>
        <MySelect v-model="value" :options="options">
        </MySelect>
        <h4>type='text'(宽度固定，如果要不固定的，建议用dropdown)</h4>
        <MySelect style="width:max-content" v-model="value" :options="options" type="text">
        </MySelect>
        <h4>type='tree'</h4>
        <MySelect filterable style="width:max-content" v-model="value" :options="options2" type="tree"
            :props="{ label: 'label', value: 'value', disabled: () => false }">
        </MySelect>
    </div>
</template>

<script>
export default {
    data() {
        return {
            /* 
            
            */
            value: "option1",
            options: [
                { label: '选项1', value: 'option1' },
                { label: '选项2选项2选项2选项2选项2选项2选项2选项2选项2选项2选项2选项2选项2选项2', value: 'option2', showLabel: '选项showLabel' },
                { label: '选项3', value: 'option3' }
            ],
            /* 
            
            
            
            */
            value2: "option1",
            options2: [
                {
                    label: '选项1', value: 'option1', disabled: true, children: [{
                        label: '选项2选项2选项2选项2选项2选项2选项2选项2选项2选项2选项2选项2选项2选项2', value: 'option2'
                    }]
                },
                { label: '选项3', value: 'option3', showLabel: '选项showLabel' },
            ]
        };
    },
    methods: {
        handleDropdownChange(value) {
            console.log('选择的值:', value);
        },
    }
}
</script>