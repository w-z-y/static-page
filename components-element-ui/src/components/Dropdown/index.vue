<template>
    <el-dropdown v-bind="$attrs" trigger="click" :placement="placement" @command="handleCommand">
        <MyIcon @click.native.stop hover>
            <slot>
                {{ showLabel }}
                <i class="el-icon-arrow-down el-icon--right"></i>
            </slot>
        </MyIcon>
        <el-dropdown-menu slot="dropdown" class="no-dropdown-arrow margin-6-0">
            <slot name="dropdown">
                <el-dropdown-item class="option-item" :divided="option.divided" v-for="option in optionsFilter"
                    :key="option.value" :disabled="option.disabled" :command="option">
                    <div class="flex flex-justify-between flex-align-center">
                        <span>
                            <i :class="option.icon"></i>
                            {{ option.label }}
                        </span>
                        <template v-if="value">
                            <i class="el-icon-check" :class="[
                                'el-icon-check',
                                {
                                    'visible': value === option.value
                                }
                            ]"></i>
                        </template>
                    </div>
                </el-dropdown-item>
            </slot>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
import MyIcon from '../Icon'
export default {
    name: "MyDropdown",
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        value: {
            type: [String, Number],
            default: ''
        },
        options: {
            type: Array,
            default: () => []
        },
        placement: {
            type: String,
            default: 'bottom-start'
        },
    },
    components: { MyIcon },
    computed: {
        optionsFilter() {
            return this.options.filter(option => option.visible !== false)
        },
        showLabel() {
            if (!this.value) return ''
            const findOption = this.optionsFilter.find(option => option.value === this.value)
            if (findOption) {
                return findOption.showLabel || findOption.label
            }
            return ''
        }
    },
    methods: {
        handleCommand(option) {
            this.$emit('change', option.value) // 实现 v-model
            // 扩展了option参数，方便获取内容
            this.$emit('command', option.value/*command*/, option)
        }
    }
}
</script>

<style lang="scss" scoped>
.option-item {
    .el-icon-check {
        margin-left: 20px;
        visibility: hidden;

        &.visible {
            visibility: visible;
        }
    }
}

.el-dropdown {
    color: inherit;
}

.el-dropdown-menu {
    padding: 4px;


    .el-dropdown-menu__item {
        color: #333;
        border-radius: 4px;
        cursor: default;
        transition: background-color 200ms;

        &:not(.is-disabled):hover {
            background-color: #eaeced;
            color: #333;
        }
    }
}
</style>

<style>
/* 全局 */
.el-dropdown-menu.el-popper {
    &.margin-6-0 {
        margin: 6px 0;
    }

    &.no-dropdown-arrow {
        .popper__arrow {
            display: none;
        }
    }
}
</style>