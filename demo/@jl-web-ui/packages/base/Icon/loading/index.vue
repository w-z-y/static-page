<!-- 图标自动旋转 -->
<template>
  <jl-icon v-if="icon" v-bind="$attrs" :icon="icon" v-on="$listeners" class="jl-icon-loading"></jl-icon>
  <LoadingSvg v-else class="jl-icon-loading" />
</template>

<script>
import COM_PREFIX from '@jl/web-ui/src/config';
import JlIcon from '../index.vue';
import LoadingSvg from '@jl/web-ui/src/assets/svg/loading.svg';
export default {
  name: COM_PREFIX + 'Icon.Loading',
  components: { JlIcon, LoadingSvg },
  props: {
    icon: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
.jl-icon-loading {
  width: 1em;
  height: 1em;
  color: var(--jl-primary);
  vertical-align: -0.2em;
  animation: 1s linear 0s infinite normal none running rotating;
}
</style>
