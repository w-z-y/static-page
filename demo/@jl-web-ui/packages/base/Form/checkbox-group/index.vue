<template>
  <div v-if="options && options.length" class="jl-checkbox-group flex-col" :class="{ 'is-gap': gap }" :style="{ gap: internalGap }">
    <jl-checkbox
      :type="type"
      :size="size"
      :round="round"
      v-if="showCheckAll"
      :indeterminate="isIndeterminate"
      :value="checkAllValue"
      @change="handleCheckAllChange"
      style="align-self: flex-start">
      {{ checkAllText }}
    </jl-checkbox>
    <el-checkbox-group
      v-if="isMounted"
      class="flex flex-wrap"
      :style="{ gap: internalGap }"
      :size="size"
      v-on="$listeners"
      v-bind="$attrs"
      v-model="internalValue"
      @change="handleChange">
      <jl-checkbox
        :type="type"
        :size="size"
        :round="round"
        v-for="option in options"
        :key="option[defaultProps.value]"
        :label="option[defaultProps.value]">
        {{ option[defaultProps.label] }}
      </jl-checkbox>
    </el-checkbox-group>
  </div>
  <!-- 不传options时，默认就是单个布尔值类型的勾选 -->
  <jl-checkbox v-else-if="!options" :type="type" :size="size" :round="round" :value="internalValue" @change="handleChangeOne" v-bind="$attrs">
    {{ label }}
  </jl-checkbox>
</template>
<script>
import JlCheckbox from '../checkbox';
import COM_PREFIX from '@jl/web-ui/src/config';
import { handlePxValue } from '@jl/web-ui/src/util';
import propsMixin from '@jl/web-ui/src/mixin/props';
import modelMixin from '@jl/web-ui/src/mixin/model';
export default {
  name: COM_PREFIX + 'Form.CheckboxGroup',
  mixins: [propsMixin, modelMixin],
  components: { JlCheckbox },
  props: {
    value: { type: [Array, String, Boolean], default: () => [] },
    // 单条时(不传options时)使用
    label: { type: String, default: '' },
    size: { type: String, default: 'small' },
    // 是否圆角
    round: { type: Boolean, default: false },

    // 是否显示全选
    showCheckAll: { type: Boolean, default: false },
    checkAllText: { type: String, default: '全选' },
    // 间距
    gap: { type: [Number, String, Array], default: null },
    options: { type: Array, default: null },
    type: { type: String, default: 'default', validator: (value) => ['default', 'button'].includes(value) },
  },
  computed: {
    checkAllValue() {
      return this.options.length ? this.internalValue.length === this.options.length : false;
    },
    isIndeterminate() {
      return this.internalValue.length > 0 && this.internalValue.length < this.options.length;
    },
    internalGap() {
      return handlePxValue(this.gap);
    },
  },
  created() {
    if (this.options && !Array.isArray(this.internalValue)) {
      this.internalValue = [];
    }
  },
  data() {
    return {
      isMounted: false,
    };
  },
  mounted() {
    this.isMounted = true;
  },
  methods: {
    // 全选
    handleCheckAllChange(value) {
      this.internalValue = value ? this.options.map((option) => option[this.defaultProps.value]) : [];
      this.$emit('change', this.internalValue);
    },
    // 选一项
    handleChange(value) {
      this.$emit('change', value);
    },
    handleChangeOne(value) {
      this.internalValue = value;
      this.$emit('change', value);
    },
  },
};
</script>
<style scoped lang="scss">
@use './index.scss';
</style>
