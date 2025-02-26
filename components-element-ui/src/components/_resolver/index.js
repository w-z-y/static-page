export default function (option) {
    return {
        type: 'component',
        resolve: (name) => {
            if (/^My[A-Z]/.test(name)) {
                const compName = name.slice(2)
                return {
                    from: `@/components/${compName}/index.vue`, // 修复引入路径
                }
            }
        }
    }
}