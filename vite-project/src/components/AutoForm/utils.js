export const generatePlaceholder = (type, label) => {
    const action = ['select', 'file', 'date', 'time', 'color'].includes(type) ? '选择' : '输入'
    return `请${action}${label}`
}
