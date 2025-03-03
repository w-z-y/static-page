<template>
  <el-radio-group v-on="$listeners" v-bind="$attrs">
    <el-radio v-for="option in options" :key="option[defaultProps.value]" :label="option[defaultProps.value]">
      {{ option[defaultProps.label] }}
    </el-radio>
  </el-radio-group>
</template>
<script>
import propsMixin from '@/mixins/props';
export default {
  name: 'MyRadio',
  mixins: [propsMixin],
  props: {
    options: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped></style>
