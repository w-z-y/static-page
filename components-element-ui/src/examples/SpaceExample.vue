<template>
    <MySpace wrap>
        <MyButton v-for="i in 20" :key="i">Button</MyButton>
    </MySpace>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped></style>