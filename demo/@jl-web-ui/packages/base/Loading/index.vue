<template>
  <div class="loader">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
import createVue from '@jl/web-ui/src/createVue';
export default createVue({
  name: 'Ai.Loading',
});
</script>

<style scoped lang="scss">
.loader {
  // 使用 em 作为尺寸单位，基于 font-size
  display: inline-block;
  position: relative;
  width: 2em;
  height: 1.1em;

  div {
    position: absolute;
    top: 0.4em;
    width: 0.4em;
    height: 0.4em;
    border-radius: 50%;
    background: var(--jl-primary);
    animation-timing-function: cubic-bezier(0, 1, 1, 0);

    &:nth-child(1) {
      left: 0.2em;
      animation: flip1 0.6s infinite;
    }
    &:nth-child(2) {
      left: 0.2em;
      animation: flip2 0.6s infinite;
    }
    &:nth-child(3) {
      left: 0.8em;
      animation: flip2 0.6s infinite;
    }
    &:nth-child(4) {
      left: 1.4em;
      animation: flip3 0.6s infinite;
    }
  }
}

@keyframes flip1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes flip3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}

@keyframes flip2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(0.6em, 0);
  }
}
</style>
