<template>
    <div>
        <el-checkbox
            v-if="showCheckAll"
            :indeterminate="isIndeterminate"
            :value="checkAllValue"
            @change="handleCheckAllChange"
        >
            全选
        </el-checkbox>
        <el-checkbox-group
            v-on="$listeners"
            v-bind="$attrs"
            v-model="internalValue"
            @change="handleChange"
        >
            <el-checkbox
                v-for="option in options"
                :label="option[defaultProps.value]"
                :key="option[defaultProps.value]"
            >
                {{ option[defaultProps.label] }}
            </el-checkbox>
        </el-checkbox-group>
    </div>
</template>
<script>
import propsMixin from "@/mixins/props";
import modelMixin from "@/mixins/model";
export default {
    name: "MyCheckbox",
    mixins: [propsMixin, modelMixin],
    props: {
        // 是否显示全选
        showCheckAll: {
            type: Boolean,
            default: false,
        },
        options: {
            type: Array,
            required: true,
            default: () => [],
        },
    },
    computed: {
        checkAllValue() {
            return this.internalValue.length === this.options.length;
        },
        isIndeterminate() {
            return this.internalValue.length > 0 && this.internalValue.length < this.options.length;
        },
    },
    methods: {
        // 全选
        handleCheckAllChange(value) {
            this.internalValue = value
                ? this.options.map((option) => option[this.defaultProps.value])
                : [];
            this.$emit("change", this.internalValue);
        },
        // 选一项
        handleChange(value) {
            this.$emit("change", value);
        },
    },
};
</script>

<style lang="scss" scoped></style>
