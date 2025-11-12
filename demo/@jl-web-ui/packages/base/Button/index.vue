<template>
  <el-button ref="buttonRef" :type="internalType" :plain="plain" class="jl-button" :size="size" v-bind="$attrs" v-on="$listeners">
    <jl-icon :icon="$slots.icon ? '' : icon" v-if="icon || $slots.icon" :color="iconColor">
      <slot name="icon"></slot>
    </jl-icon>
    <slot></slot>
  </el-button>
</template>

<script>
import COM_PREFIX from '@jl/web-ui/src/config';
import JlIcon from '../Icon/index.vue';
// import typeMixin from '@jl/web-ui'

export default {
  name: COM_PREFIX + 'Button',
  components: { JlIcon },
  props: {
    size: { type: String, default: 'small' },
    icon: { type: String, default: '' },
    iconColor: { type: String, default: '' },
    type: {
      type: String,
      default: '',
      validator: (value) => ['', 'success', 'warning', 'danger', 'info', 'primary'].includes(value),
    },
    plain: { type: Boolean, default: false },
    text: { type: Boolean, default: false },
  },
  computed: {
    internalType() {
      return this.text ? 'text' : this.type;
    },
  },
  methods: {
    focus() {
      this.$refs.buttonRef.$el.focus();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@jl/web-ui/src/style/components/button.scss';

.jl-button {
  &.el-button {
    @include jl-button-base;
  }
}
</style>
