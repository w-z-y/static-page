<template>
    <span class="hover-icon flex flex-justify-center flex-align-center" :class="{ 'hover-bg': hover }">
        <slot></slot>
    </span>
</template>

<script>
export default {
    name: "MyIcon",
    props: {
        hover: {
            type: Boolean,
            default: false
        }
    },
}
</script>

<style lang="scss" scoped>
.hover-icon {
    padding: 0 7px;
    box-sizing: border-box;
    cursor: default;
    height: 30px;
    border-radius: 4px;
    // .hover-bg 在公共样式 shortcuts.scss 中
}
</style>