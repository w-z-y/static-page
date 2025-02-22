<template>
    <div>
        <h2>Resizable Table 示例</h2>
        <ResizableTable :columns="tableColumns" :tableData="tableData" @row-click="handleRowClick" />
    </div>
</template>

<script>
import ResizableTable from '../components/ResizableTable/index.vue';

export default {
    components: { ResizableTable },
    data() {
        return {
            tableColumns: [
                { label: '名称', value: 'name' },
                { label: '年龄', value: 'age' }
            ],
            tableData: [
                { name: '张三', age: 28 },
                { name: '李四', age: 32 }
            ]
        };
    },
    methods: {
        handleRowClick(row, index) {
            console.log('点击的行:', row, '索引:', index);
        }
    }
}
</script>