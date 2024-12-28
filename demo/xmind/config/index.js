const defaultConfig = {
    zoomMax: 50, // 最大缩放倍数
    zoomMin: 0.1, // 最小缩放倍数 
    zoomStep: 0.1, // 每次缩放的步长

    groupGap: 0, // 左右两侧节点组之间的间距
    verticalGap: 10, // 同一侧节点之间的垂直间距
    horizontalGap: 25, // 父子节点之间的水平间距

    lineStroke: '#1a237e', // 线条颜色
    lineStrokeWidth: 3, // 线条宽度
    lineCornerRadius: 10, // 拐角圆角大小

    // transition: 200, // 过渡时间 ms(节点+线)
}

export default defaultConfig