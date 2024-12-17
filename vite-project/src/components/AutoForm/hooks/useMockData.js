import { unref } from 'vue'

export default function useMockData(formConfig) {
    const mockData = {
        cities: ['北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '西安'],
        hobbies: [
            { label: '阅读', value: 'reading' },
            { label: '运动', value: 'sports' },
            { label: '音乐', value: 'music' },
            { label: '旅行', value: 'travel' },
            { label: '摄影', value: 'photography' },
            { label: '美食', value: 'food' }
        ]
    }

    const getFieldOptions = async (key, data, fallback) => {
        try {
            const result = await new Promise(resolve => setTimeout(() => resolve(data), 10))
            const field = unref(formConfig).find(item => item.key === key)
            if (field) field.options = result
        } catch (error) {
            console.error(`获取${key}数据失败:`, error)
            const field = unref(formConfig).find(item => item.key === key)
            if (field) field.options = fallback
        }
    }

    return { mockData, getFieldOptions }
}