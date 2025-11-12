<template>
  <div v-if="options && options.length" class="jl-radio-group" :class="{ 'is-gap': gap, 'is-round': round }">
    <el-radio-group :class="{ 'is-button': type === 'button' }" :style="{ gap: internalGap }" :size="size" v-bind="$attrs" v-on="$listeners">
      <jl-radio :type="type" v-for="option in options" :key="option[defaultProps.value]" :label="option[defaultProps.value]">
        <span> {{ option[defaultProps.label] }}</span>
      </jl-radio>
    </el-radio-group>
  </div>
  <jl-radio v-else-if="!options" :size="size" :type="type" v-bind="$attrs">
    {{ label }}
  </jl-radio>
</template>
<script>
import JlRadio from '../radio';
import { handlePxValue } from '@jl/web-ui/src/util';
import COM_PREFIX from '@jl/web-ui/src/config';
import propsMixin from '@jl/web-ui/src/mixin/props';
export default {
  name: COM_PREFIX + 'Form.Radio',
  mixins: [propsMixin],
  components: { JlRadio },
  props: {
    // 单条时(不传options时)使用
    label: { type: String, default: '' },
    size: { type: String, default: 'small' },

    options: { type: Array, default: null },
    type: { type: String, default: 'default', validator: (value) => ['default', 'button'].includes(value) },
    round: { type: Boolean, default: false },
    // 间距
    gap: { type: [Number, String, Array], default: null },
  },
  computed: {
    internalGap() {
      return handlePxValue(this.gap);
    },
  },
};
</script>

<style lang="scss" scoped>
@use './index.scss';
</style>
