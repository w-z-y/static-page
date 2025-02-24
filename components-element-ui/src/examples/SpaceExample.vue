<template>
    <MySpace wrap>
        <MyButton v-for="i in 20" :key="i">Button</MyButton>
    </MySpace>
</template>

<script>
import MySpace from '../components/Space'
import MyButton from '../components/Button'
export default {
    components: {
        MySpace,
        MyButton
    }

}
</script>

<style lang="scss" scoped></style>