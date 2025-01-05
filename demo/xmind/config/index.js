const defaultConfig = {
  zoomMax: 50, // 最大缩放倍数
  zoomMin: 0.1, // 最小缩放倍数
  zoomStep: 0.1, // 每次缩放的步长

  groupGap: 0, // 左右两侧节点组之间的间距
  verticalGap: 10, // 同一侧节点之间的垂直间距
  horizontalGap: 27, // 父子节点之间的水平间距

  // transition: 200, // 过渡时间 ms(节点+线)

  // 添加背景色配置
  rootNodeTextColor: "#fff", // 添加根节点字体颜色配置
  rootNodeBgColor: "#2c2d30", // 根节点背景色
  // 添加字体颜色配置
  level1NodeTextColor: "2c2d30", // 一级节点字体颜色
  level1NodeBgColor: "#db8fff", // 一级节点背景色

  normalNodeTextColor: "#491e1c", // 普通节点字体颜色
  normalNodeBgColor: "#efefef", // 普通节点背景色

  lineStroke: "#2c2d30", // 线条颜色
  lineStrokeWidth: 3, // 线条宽度
  lineCornerRadius: 10, // 拐角圆角大小
};

export default defaultConfig;
