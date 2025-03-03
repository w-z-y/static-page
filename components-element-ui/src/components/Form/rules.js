export default {
    computed: {
        formRules() {
            const rules = {};
            this.options.forEach((option) => {
                if (option.required) {
                    rules[option.value] = [
                        {
                            required: true,
                            message: option.attrs?.placeholder || this.getPlaceholder(option),
                            trigger: ["blur", "change"],
                        },
                    ];
                }
                if (option.rules) {
                    rules[option.value] = rules[option.value] || [];
                    rules[option.value].push(
                        ...(Array.isArray(option.rules) ? option.rules : [option.rules])
                    );
                }
            });
            return rules;
        },
    }
}