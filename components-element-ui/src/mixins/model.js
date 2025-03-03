/* 

    internalValue

*/
export default {
    props: {
        /* 
            Common      String
            MyTreeSelect    multiple: true => Array
            MyForm      Object
        */
        value: {},
    },
    computed: {
        internalValue: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit("input", value);
            },
        },
    },
};
