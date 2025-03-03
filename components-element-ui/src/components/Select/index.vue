<template>
    <el-select
        popper-class="my-select-popper"
        ref="mySelectRef"
        :class="['my-select']"
        v-bind="$attrs"
        :multiple="multiple"
        clearable
        collapse-tags
        v-model="internalValue"
        @change="handleChangeValue"
        @visible-change="handleVisibleChange"
    >
        <template v-if="type === 'tree'">
            <el-option
                v-show="false"
                :label="selectedNode[defaultProps.label]"
                :value="selectedNode[defaultProps.value]"
            >
            </el-option>
            <MyTree
                ref="tree"
                @node-click="handleNodeClick"
                :expand-on-click-node="false"
                check-strictly
                :node-key="defaultProps.value"
                :default-checked-keys="defaultCheckedKeys"
                :props="defaultProps"
                default-expand-all
                :data="options"
            >
            </MyTree>
        </template>
        <template v-else>
            <el-option
                v-for="option in options"
                :key="option[defaultProps.value]"
                :label="option[defaultProps.label]"
                :value="option[defaultProps.value]"
            >
                <MyTooltip>{{ option[defaultProps.label] }}</MyTooltip>
            </el-option>
        </template>
    </el-select>
</template>

<script>
import MyTooltip from "../Tooltip";
import MyTree from "../Tree";

import propsMixin from "@/mixins/props";
import modelMixin from "@/mixins/model";
export default {
    name: "MySelect",
    mixins: [propsMixin, modelMixin],
    components: { MyTooltip, MyTree },
    props: {
        options: {
            type: Array,
            required: true,
        },
        type: {
            type: [String, Object],
            default: null,
            validator: (value) => {
                return [null, "tree"].includes(value);
            },
        },
        multiple: {
            type: Boolean,
            default: false,
        },
    },
    watch: {
        internalValue: {
            handler() {
                this.$nextTick(() => {
                    if (this.isTree && this.value.length) {
                        const myTreeRef = this.$refs.tree.$refs.myTree;
                        this.selectedNode = myTreeRef.getNode(this.value)?.data;
                        if (!this.selectedNode) return;
                        this.$refs.tree.$refs.myTree.setCheckedKeys([
                            this.selectedNode[this.defaultProps.value],
                        ]);
                    }
                });
            },
            immediate: true,
        },
    },
    computed: {
        isTree() {
            return this.type === "tree";
        },
    },
    data() {
        return {
            defaultCheckedKeys: [],
            selectedNode: {},
        };
    },
    methods: {
        handleChangeValue(value) {
            this.$emit("change", value);
        },
        handleNodeClick(data, node) {
            // 禁用
            if (!this.isTree) return;
            if (node.disabled) return;
            this.selectedNode = data;
            // 设置高亮
            this.$refs.tree.$refs.myTree.setCheckedKeys([data[this.defaultProps.value]]);
            this.$emit("input", data[this.defaultProps.value]);
            this.$refs.mySelectRef.visible = false;
        },
        handleVisibleChange(visible) {
            if (visible) {
                if (this.isTree) {
                    // 滚动到选中项
                    setTimeout(() => {
                        this.scrollToOption();
                    }, 0);
                }
            }
        },
        // 滚动到选中项
        scrollToOption() {
            const myTreeRef = this.$refs.tree.$refs.myTree;
            const selectDom = myTreeRef.$el.querySelector(".el-tree-node.is-checked");
            this.$refs.mySelectRef.scrollToOption({ $el: selectDom });
        },
    },
    mounted() {
        const mySelectRef = this.$refs.mySelectRef;
        const popperElm = mySelectRef.$refs.popper.$el;
        popperElm.style.width = `${mySelectRef.$el.offsetWidth}px`;
    },
};
</script>

<style lang="scss">
.my-select-popper {
    .el-select-dropdown__item {
        display: flex;
        align-items: center;
    }
}
</style>
<style lang="scss" scoped>
.el-select {
    .el-tree {
        padding-right: 10px;
    }
}
</style>
