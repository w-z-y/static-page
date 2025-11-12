<template>
  <jl-transition v-on="$listeners" :class="classes">
    <slot></slot>
  </jl-transition>
</template>

<script>
import COM_PREFIX from '@jl/web-ui/src/config/index.js';

import jlTransition from '../Transition';
export default {
  name: COM_PREFIX + 'SplitPane.Pane',
  props: {
    className: String,
  },
  components: { jlTransition },
  data() {
    const classes = [this.$parent.direction, this.className];
    return {
      classes: classes.join(' '),
      percent: 50,
    };
  },
};
</script>

<style scoped lang="scss">
.splitter-pane {
  overflow: hidden;
  box-sizing: border-box;
  &.splitter-paneR {
    z-index: 1;
  }
}
</style>
