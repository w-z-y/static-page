<template>
  <button
    class="btn"
    :class="[
      `btn-${type}`,
      {
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle,
        'is-disabled': disabled
      }
    ]"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'default',
    validator: (value) => {
      return ['default', 'primary', 'success', 'warning', 'danger', 'dark'].includes(value)
    }
  },
  plain: {
    type: Boolean,
    default: false
  },
  round: {
    type: Boolean, 
    default: false
  },
  circle: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const handleClick = (e) => {
  emit('click', e)
}
</script>

<style scoped lang="scss">
@use './index.scss';
</style>