import mindmapData from './data.js';
class Node {
  constructor(data, mindmap) {
    this.data = data
    this.topic = data.topic
    this.id = data.id
    this.children = data.children
    this.parent = null

    this.mindmap = mindmap
    // 定位
    this.x = 0
    this.y = 0
    // 尺寸
    this.width = 0
    this.height = 0

    this.$el = null
  }
  get isRoot() {
    return this.level === 0
  }
  render(level) {
    this.level = level
    this.$el = this.createElement(this.data, level)
    this.width = this.$el.offsetWidth
    this.height = this.$el.offsetHeight
  }
  renderChildren(level) {
    if (this.children?.length && !this.mindmap.collapsedNodes.has(this.id)) {
      const [leftDataList, rightDataList] = this.groupNodes(level);

      const renderNodesGroup = (dataList, isLeft) => {
        const totalHeight = this.calculateNodesHeight(dataList, level + 1)
        let currentX = isLeft ? this.x : this.x + this.width
        let currentY = this.y + this.height / 2 - totalHeight / 2
        console.log('isLeft', dataList, isLeft);
        dataList.forEach(childData => {
          // 从缓存map获取
          childData.direction = isLeft ? 'left' : 'right';
          const childNode = this.mindmap.nodesMap.get(childData.id)
          const childHeight = this.calculateNodeHeight(childData, level + 1);
          const { width, height } = childNode
          const childX = isLeft ? currentX - width : currentX;
          const childY = currentY + childHeight / 2 - height / 2
          childNode.updatePosition(childX, childY)
          childNode.renderChildren(level + 1)
          currentY += childHeight;
        })
        // })
      }

      renderNodesGroup(leftDataList, true);
      renderNodesGroup(rightDataList, false);
    }
  }
  getNode(nodeData, level) {
    let node = this.mindmap.nodesMap.get(nodeData.id)
    if (!this.mindmap.nodesMap.has(nodeData.id)) {
      node = new Node(nodeData, this.mindmap);
      node.render(level)
    }
    return node
  }
  createElement(data, level) {
    const nodeEl = document.createElement("div")
    const textNode = document.createTextNode(data.topic)
    nodeEl.appendChild(textNode)

    const classList = ['node']
    if (level === 0) classList.push('is-root')
    nodeEl.className = classList.join(' ')

    data.direction && (nodeEl.dataset.direction = data.direction)
    nodeEl.dataset.id = data.id;
    nodeEl.dataset.level = level
    nodeEl.draggable = true;

    this.mindmap.nodesLayer.appendChild(nodeEl)
    this.mindmap.nodesMap.set(this.id, this)
    return nodeEl
  }
  updatePosition(x, y) {
    this.x = x
    this.y = y
    if (this.isRoot) {
      this.x = x - this.width / 2
      this.y = y - this.height / 2
    }
    this.$el.style.left = `${this.x}px`
    this.$el.style.top = `${this.y}px`
  }
  /* 
  
  
  
  */
  // 计算单个节点
  calculateNodeHeight(nodeData, level) {
    const nodeSpace = 10 // 节点间距
    const blockSpace = 0 // 块间距
    const node = this.getNode(nodeData, level)
    const nodeHeight = node.height
    // 如果节点没有子节点或已折叠,直接返回节点高度
    if (!nodeData.children?.length || this.mindmap.collapsedNodes.has(nodeData.id)) {
      return nodeHeight + nodeSpace;
    }
    // 计算子节点总高度
    const childrenHeight = this.calculateNodesHeight(nodeData.children, level + 1);
    // 返回节点高度和子节点总高度的最大值
    return Math.max(nodeHeight, childrenHeight + blockSpace);
  }
  // 计算一组节点
  calculateNodesHeight(nodes, level) {
    if (!nodes.length) return 0;
    const totalHeight = nodes.reduce((sum, node) => {
      return sum + this.calculateNodeHeight(node, level)
    }, 0);
    return totalHeight;
  }
  groupNodes(level) {
    const leftNodes = [];
    const rightNodes = [];
    this.data?.children?.forEach(child => {
      if (level === 0) {
        (child.direction === 'left' ? leftNodes : rightNodes).push(child);
      } else {
        (this.data.direction === 'left' ? leftNodes : rightNodes).push(child);
      }
    });

    return [leftNodes, rightNodes];
  }
}


class Mind {
  constructor(container, data) {
    // 容器
    this.container = typeof container === 'string' ? document.querySelector(container) : container
    this.wrapper = this.container.querySelector('.mindmap-wrapper')
    this.linesLayer = this.container.querySelector('.lines-layer')
    this.nodesLayer = this.container.querySelector('.nodes-layer')
    // 数据
    this.data = JSON.parse(JSON.stringify(data)) // 深拷贝数据
    this.rootNode = null // 根节点
    // 存储
    this.nodesMap = new Map() // 存储每个Node节点实例
    this.collapsedNodes = new Set() // 已折叠的节点
    this.history = [this.data] // 历史记录
    this.currentHistoryIndex = 0 // 当前历史记录索引
    // 画布相关
    this.scale = 1// 缩放比例
    this.translateX = 0// X轴平移距离
    this.translateY = 0// Y轴平移距离
    this.centerX = this.container.offsetWidth / 2;
    this.centerY = this.container.offsetHeight / 2;
    // 初始化根节点
    this.init();
  }
  init() {
    this.rootNode = new Node(this.data, this)
    // 挂在渲染
    this.rootNode.render(0)
    // 更新位置
    this.rootNode.updatePosition(this.centerX, this.centerY)
    // 渲染子节点
    this.rootNode.renderChildren(0)
  }
}

const mindmap = new Mind('#container', mindmapData)
console.log(mindmap)