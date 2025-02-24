<template>
    <el-select :class="[{ 'hover-bg': type === 'text' }]" v-bind="$attrs" v-model="selectedValue"
        @change="handleChange">
        <el-option v-for="option in options" :key="option.value" :label="option.label" :value="option.value">
        </el-option>
    </el-select>
</template>

<script>
export default {
    name: 'MySelect',
    props: {
        value: {
            type: [String, Number],
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
                return ['default', 'text'].includes(value); // 校验值是否为'default'或'text'
            },
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
        }
    },
    methods: {
        handleChange(value) {
            this.$emit('change', value);
        }
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
}
</style>