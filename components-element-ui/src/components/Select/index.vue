<template>
    <el-select ref="mySelect" :class="['my-select', { 'hover-bg': type === 'text' }]" v-bind="$attrs"
        :multiple="multiple" :popper-append-to-body="false" clearable collapse-tags v-model="selectedValue"
        @change="handleChangeValue" @visible-change="handleVisibleChange">
        <template v-if="type === 'tree'">
            <el-option v-show="false" :label="selectedNode[defaultProps.label]"
                :value="selectedNode[defaultProps.value]">
            </el-option>
            <MyTree ref="tree" @node-click="handleNodeClick" :expand-on-click-node="false" check-strictly
                :node-key="defaultProps.value" :default-checked-keys="defaultCheckedKeys" :props="defaultProps"
                default-expand-all :data="options">
            </MyTree>
        </template>
        <template v-else>
            <el-option v-for="option in options" :key="option[defaultProps.value]" :label="option[defaultProps.label]"
                :value="option[defaultProps.value]">
                <MyTooltip>{{ option[defaultProps.label] }}</MyTooltip>
            </el-option>
        </template>
    </el-select>
</template>

<script>
import MyTooltip from '../Tooltip'
import MyTree from '../Tree'
import merge from '@/utils/merge'
import { DEFAULT_PROPS } from '@/config/constant'
export default {
    name: 'MySelect',
    components: { MyTooltip, MyTree },
    props: {
        value: {
            type: [String, Number, Array/* multiple 为 true时传入数组 */],
            default: ''
        },
        options: {
            type: Array,
            required: true
        },
        type: {
            type: String,
            default: 'default', // 添加默认值为'default'
            validator: (value) => {
                return ['default', 'text', 'tree'].includes(value)
            },
        },
        props: {
            type: Object,
            default: () => DEFAULT_PROPS
        },
        multiple: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        selectedValue: {
            handler() {
                this.$nextTick(() => {
                    if (this.isTree && this.value.length) {
                        const myTreeRef = this.$refs.tree.$refs.myTree
                        this.selectedNode = myTreeRef.getNode(this.value)?.data
                        console.log('-------', this.selectedNode)
                        if (!this.selectedNode) return
                        this.$refs.tree.$refs.myTree.setCheckedKeys([this.selectedNode[this.defaultProps.value]])
                    }
                })
            },
            immediate: true
        }
    },
    computed: {
        selectedValue: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit('input', value);
            }
        },
        isTree() {
            return this.type === 'tree'
        },
        defaultProps() {
            return merge({ ...DEFAULT_PROPS }, this.props || {})
        }
    },
    data() {
        return {
            internalValue: null,
            defaultCheckedKeys: [],
            selectedNode: {}
        }
    },
    methods: {
        handleChangeValue(value) {
            this.$emit('change', value);
        },
        handleNodeClick(data, node) {
            // 禁用
            if (!this.isTree) return
            if (node.disabled) return
            this.selectedNode = data
            // 设置高亮
            this.$refs.tree.$refs.myTree.setCheckedKeys([data[this.defaultProps.value]])
            this.$emit('input', data[this.defaultProps.value]);
            this.$refs.mySelect.visible = false
        },
        handleVisibleChange(visible) {
            if (visible) {
                if (this.isTree) {
                    // 滚动到选中项
                    setTimeout(() => {
                        this.scrollToOption()
                    }, 0);
                }
            }
        },
        // 滚动到选中项
        scrollToOption() {
            const myTreeRef = this.$refs.tree.$refs.myTree
            const selectDom = myTreeRef.$el.querySelector('.el-tree-node.is-checked')
            this.$refs.mySelect.scrollToOption({ $el: selectDom })
        }
    },
    mounted() {
        const mySelectRef = this.$refs.mySelect
        const popperElm = mySelectRef.$refs.popper.$el
        popperElm.style.width = `${mySelectRef.$el.offsetWidth}px`
    }
}
</script>

<style lang="scss" scoped>
.el-select {
    width: 100%;

    &.hover-bg {
        :deep .el-input__inner {
            border: none;
            background-color: unset;
        }
    }

    .el-tree {

        padding-right: 10px;


    }
}
</style>