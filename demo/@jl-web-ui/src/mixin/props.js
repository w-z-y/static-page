import { DEFAULT_PROPS } from '../constant';
import merge from '../util/merge';
/* 

    defaultProps

*/
export default {
  props: {
    props: {
      type: Object,
      default: () => DEFAULT_PROPS,
    },
  },
  computed: {
    defaultProps() {
      return merge({ ...DEFAULT_PROPS }, this.props || {});
    },
  },
};
