<template>
    <div>
        <h2>Resizable Table 示例</h2>
        <MyResizableTable v-model="filter" :columns="tableColumns" :tableData="tableData"
            @filter-change="handleFilterChange" @row-click="handleRowClick">
        </MyResizableTable>
    </div>
</template>

<script>
import MyResizableTable from '../components/ResizableTable/index.vue';

export default {
    model: {
        prop: 'filter',
        event: 'filter-change'
    },
    components: { MyResizableTable },
    data() {
        return {
            filter: {
                name: 'option2'
            },
            tableColumns: [
                {
                    label: '名称',
                    value: 'name',
                    options: [
                        {
                            label: 'option1',
                            value: 'option1'
                        },
                        {
                            label: 'option2',
                            value: 'option2'
                        }
                    ]
                },
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
        },
        handleFilterChange(filter) {
            console.log('filter', filter)
        }
    }
}
</script>