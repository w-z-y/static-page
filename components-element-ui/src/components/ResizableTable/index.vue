<template>
    <table>
        <colgroup>
            <col v-for="col in columns" :key="col.value"
                :style="columnWidths[col.value] ? { width: columnWidths[col.value] + 'px' } : {}">
        </colgroup>
        <thead>
            <tr>
                <th v-for="col in columns" :key="col.value">
                    <slot name="header" :column="col">
                        <template v-if="col.options && col.options.length">
                            <MyDropdown :value="filter[col.filterValue || col.value]"
                                @command="(value) => emitFilterChange(value, col)" :options="col.options">
                            </MyDropdown>
                        </template>
                        <template v-else>
                            {{ col.label }}
                        </template>
                    </slot>
                </th>
            </tr>
        </thead>
        <tbody>
            <template v-if="tableData.length">
                <tr v-for="(row, index) in tableData" @click="onRowClick(row, index)" :key="row.id || index">
                    <td v-for="col in columns" :key="col.value">
                        <slot :row="row" :column="col">
                            {{ row[col.value] }}
                        </slot>
                    </td>
                </tr>
            </template>
            <el-empty v-else description="暂无数据"></el-empty>
        </tbody>
    </table>
</template>

<script>
import MyDropdown from '../Dropdown'
export default {
    name: "MyResizableTable",
    model: {
        prop: 'filter',
        event: 'filter-change'
    },
    props: {
        filter: {
            type: Object,
            default: () => { return {} }
        },
        columns: {
            type: Array,
            required: true
        },
        tableData: {
            type: Array,
            required: true
        }
    },
    components: {
        MyDropdown,
    },
    data() {
        return {
            widthsMap: {}
        }
    },
    computed: {
        columnWidths() {
            const widths = {};
            this.columns.forEach(col => {
                if (col.width) {
                    widths[col.value] = this.widthsMap[col.value] || col.width;
                } else {
                    widths[col.value] = this.widthsMap[col.value];
                }
            });
            return widths;
        }
    },
    methods: {
        onRowClick(row, index) {
            this.$emit('row-click', row, index)
        },
        emitFilterChange(value, col) {
            this.$emit('filter-change', {
                ...this.filter,
                [col.filterValue || col.value]: value
            });
            console.log('this.filter', this.filter, {
                ...this.filter,
                [col.filterValue || col.value]: value
            })
        }
    },
}
</script>

<style lang="scss" scoped>
table {
    font-size: 14px;
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
}

th {
    font-weight: normal;
    color: #888;
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #EBEEF5;
}

td {
    color: #888;
    padding: 8px;
    text-align: left;
}

tbody tr {
    cursor: pointer;

    .is-hover-show {
        opacity: 0;
    }

    &:hover {
        background-color: #f1f2f2;

        .is-hover-show {
            opacity: 1;
        }
    }
}

tbody tr:hover td:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
}

tbody tr:hover td:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
}

/* 设置表头和表体之间的间距 */
tbody::before {
    content: "";
    display: block;
    height: 10px;
}
</style>