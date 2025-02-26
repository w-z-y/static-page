<template>
    <MyForm v-model="formData" :options="options"></MyForm>
</template>

<script>
export default {
    data() {
        return {
            options: [],
            formData: {}
        }
    }
}
</script>

<style lang="scss" scoped></style>