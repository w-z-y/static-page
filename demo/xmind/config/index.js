const defaultConfig = {
    // 缩放相关配置
    map: {
        zoomMax: 50, // 最大缩放倍数
        zoomMin: 0.1, // 最小缩放倍数 
        zoomStep: 0.1 // 每次缩放的步长
    },
    // 节点样式配置
    node: {
        padding: 20, // 节点内边距
        fontSize: {
            root: 30, // 根节点字体大小
            normal: 14 // 普通节点字体大小
        },
        backgroundColor: {
            root: '#1a237e', // 根节点背景色
            normal: '#eee' // 普通节点背景色
        },
        color: {
            root: '#fff', // 根节点文字颜色
            normal: '#000' // 普通节点文字颜色
        },
        maxWidth: 200, // 节点最大宽度
        borderRadius: 4, // 节点圆角大小
        borderWidth: 1, // 节点边框宽度
        borderColor: '#ccc', // 节点边框颜色
    },
    // 连接线样式配置
    line: {
        stroke: '#666', // 线条颜色
        strokeWidth: 2, // 线条宽度
        cornerRadius: 8 // 拐角圆角大小
    },
    // 节点布局配置
    layout: {
        groupGap: 20, // 左右两侧节点组之间的间距
        verticalGap: 10, // 同一侧节点之间的垂直间距
        horizontalGap: 100 // 父子节点之间的水平间距
    },
}

export default defaultConfig