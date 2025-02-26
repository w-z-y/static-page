import { DEFAULT_PROPS } from '@/constant'
import merge from '@/utils/merge'
/* 

    defaultProps

*/
export default {
    props: {
        props: {
            type: Object,
            default: () => DEFAULT_PROPS
        },
    },
    computed: {
        defaultProps() {
            return merge({ ...DEFAULT_PROPS }, this.props || {})
        }
    }
}