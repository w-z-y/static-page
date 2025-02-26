<template>
    <MyTree :data="data">
        <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
                <el-button type="text" size="mini" @click="() => append(data)">
                    Append
                </el-button>
                <el-button type="text" size="mini" @click="() => remove(node, data)">
                    Delete
                </el-button>
            </span>
        </span>
    </MyTree>
</template>

<script>
export default {
    data() {
        const data = [{
            id: 1,
            label: '一级 1',
            children: [{
                id: 4,
                label: '二级 1-1',
                children: [{
                    id: 9,
                    label: '三级 1-1-1'
                }, {
                    id: 10,
                    label: '三级 1-1-2'
                }]
            }]
        }, {
            id: 2,
            label: '一级 2',
            children: [{
                id: 5,
                label: '二级 2-1'
            }, {
                id: 6,
                label: '二级 2-2'
            }]
        }, {
            id: 3,
            label: '一级 3',
            children: [{
                id: 7,
                label: '二级 3-1'
            }, {
                id: 8,
                label: '二级 3-2'
            }]
        }]
        return {
            data
        };
    },
    methods: {
        handleDropdownChange(value) {
            console.log('选择的值:', value);
        }
    }
}
</script>