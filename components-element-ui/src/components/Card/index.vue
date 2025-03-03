<template>
  <el-card hover>
    <template #[slotName]="slotProps" v-for="(slot, slotName) in $slots">
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </el-card>
</template>

<script>
export default {
  name: 'MyCard',
};
</script>

<style lang="scss" scoped></style>
