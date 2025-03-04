<template>
  <el-card class="my-card" hover :style="{ width: block ? '100%' : 'auto' }">
    <template #[slotName] v-for="(slot, slotName) in $slots">
      <slot :name="slotName" />
    </template>
  </el-card>
</template>

<script>
export default {
  name: 'MyCard',
  props: {
    block: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    console.log(this.$slots);
  },
};
</script>

<style lang="scss" scoped>
.my-card {
  display: flex;
  flex-direction: column;
  ::v-deep .el-card__body {
    flex: 1;
  }
}
</style>
