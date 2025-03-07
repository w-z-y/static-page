<template>
  <span class="my-button flex flex-justify-center flex-align-center" :class="{ 'hover-bg': type === 'text' }" @click="handleClick">
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: 'MyButton',
  props: {
    type: {
      type: String,
      default: 'button',
      validator: (value) => {
        return ['text', 'button'].includes(value);
      },
    },
  },
  methods: {
    handleClick() {
      this.$emit('click');
    },
  },
};
</script>

<style lang="scss" scoped>
.my-button {
  padding: 0 7px;
  box-sizing: border-box;
  cursor: default;
  height: 30px;
  border-radius: 4px;
  border: 1px solid #ccc;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
    box-shadow: 0 0 4px #ccc;
  }

  // text
  &.hover-bg {
    border: none;
    cursor: default;
  }

  // .hover-bg 在公共样式 shortcuts.scss 中
}
</style>
