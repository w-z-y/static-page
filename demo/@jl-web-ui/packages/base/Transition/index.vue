<template>
  <div class="jl-transition">
    <slot :is-transition="isTransition"></slot>
  </div>
</template>

<script>
import createVue from '@jl/web-ui/src/createVue';

export default createVue({
  name: 'Transition',
  data() {
    return {
      isTransition: false,
    };
  },
  mounted() {
    this.setupTransitionHandlers();
  },
  beforeDestroy() {
    this.removeTransitionHandlers();
  },
  methods: {
    transitionStartHandler(e) {
      if (e.target === this.$el) {
        this.isTransition = true;
        this.$emit('transition-start', e);
      }
    },
    transitionEndHandler(e) {
      if (e.target === this.$el) {
        this.isTransition = false;
        this.$emit('transition-end', e);
      }
    },
    setupTransitionHandlers() {
      this.$el.addEventListener('transitionstart', this.transitionStartHandler);
      this.$el.addEventListener('transitionend', this.transitionEndHandler);
    },
    removeTransitionHandlers() {
      if (this.$el) {
        this.$el.removeEventListener('transitionstart', this.transitionStartHandler);
        this.$el.removeEventListener('transitionend', this.transitionEndHandler);
      }
    },
  },
});
</script>

<style scoped lang="scss"></style>
