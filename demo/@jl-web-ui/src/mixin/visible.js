export default {
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        internalVisible: {
            get() {
                return this.visible
            },
            set(value) {
                this.$emit('update:visible', value)
            },
        },
    },
};
