<template>

    <el-dropdown ref="dropdown" v-bind="$attrs" :trigger="internalTrigger" :placement="placement"
        @command="handleCommand" @visible-change="handleVisibleChange">
        <div @contextmenu="handleContextMenu" @click="handleClickContainer">
            <slot>
                <MyButton type="text" :class="{ 'active-bg': showPopper }">
                    {{ showLabel }}
                    <i class="el-icon-arrow-down el-icon--right" :class="{ 'is-rotate': showPopper }"></i>
                </MyButton>
            </slot>
        </div>
        <el-dropdown-menu ref="dropdownMenu" slot="dropdown" class="no-dropdown-arrow margin-6-0"
            @contextmenu.native.prevent>
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
import MyButton from '../Button'

let dot = null
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
        trigger: {
            type: String,
            default: "click",
            validator: (value) => {
                // 只允许 'click', 'hover', 'contextmenu' 三种值
                return ['click', 'hover', 'contextmenu'].includes(value);
            }
        },
        placement: {
            type: String,
            default: 'bottom-start'
        },
    },
    components: { MyButton },
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
        },
        internalTrigger() {
            if (this.trigger === 'contextmenu') {
                return null
            } else {
                return this.trigger
            }
        }
    },
    data() {
        return {
            showPopper: false
        }
    },
    methods: {
        handleCommand(option) {
            this.$emit('change', option.value) // 实现 v-model
            // 扩展了option参数，方便获取内容
            this.$emit('command', option.value/*command*/, option)
        },
        handleContextMenu(event) {
            if (this.trigger !== 'contextmenu') return
            event.preventDefault()

            if (!dot) {
                dot = document.createElement('div')
                dot.style.position = 'absolute';
                document.body.append(dot)
            }
            dot.style.left = `${event.pageX}px`;
            dot.style.top = `${event.pageY}px`;

            if (this.showPopper) {
                this.$refs.dropdownMenu.updatePopper()
            } else {
                this.$refs.dropdownMenu.referenceElm = dot
                this.$refs.dropdown.show()
            }
        },
        handleVisibleChange(visible) {
            this.showPopper = visible
            if (!visible) {
                this.$refs.dropdownMenu.referenceElm = this.$refs.dropdown.$el
                if (dot) {
                    dot.remove()
                    dot = null
                }
            }
            this.$emit('visible-change', visible)
        },
        handleClickContainer() {
            this.$refs.dropdown.hide()
        }
    }
}
</script>

<style lang="scss" scoped>
.el-dropdown {
    color: inherit;

    .el-icon-arrow-down {
        transition: transform 200ms;

        &.is-rotate {
            transform: rotate(-180deg);
        }
    }
}

.el-dropdown-menu {
    padding: 4px;

    .el-dropdown-menu__item {
        color: #333;
        border-radius: 4px;
        cursor: default;
        transition: background-color 200ms;

        &.option-item {
            .el-icon-check {
                margin-left: 20px;
                visibility: hidden;

                &.visible {
                    visibility: visible;
                }
            }
        }

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