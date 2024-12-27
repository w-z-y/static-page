/**
 * 思维导图功能大纲:
 * 
 * 1. 基础渲染
 * - 支持节点树形结构渲染
 * - 支持节点左右分布
 * - 支持贝塞尔曲线连接线
 * - 支持根节点特殊样式
 * 
 * 2. 节点操作
 * - 支持节点展开/收起
 * - 支持节点拖拽(draggable)
 * - 支持节点缓存复用
 * 
 * 3. 布局功能
 * - 支持自动计算节点位置
 * - 支持节点间距配置
 * - 支持分组间距配置
 * - 支持垂直/水平间距配置
 * 
 * 4. 视图控制
 * - 支持画布缩放
 * - 支持画布平移
 * - 支持居中定位
 * 
 * 5. 数据管理
 * - 支持数据结构克隆
 * - 支持历史记录
 * - 支持节点映射缓存
 */

import mindmapData from './data.js';

// 默认配置
const defaultConfig = {
  groupGap: 0, // 组间距
  verticalGap: 10, // 垂直节点间距
  horizontalGap: 20 // 横向节点间距
}

// 思维导图类,负责整体布局和渲染
class MindMap {
  constructor(container, data, config = {}) {
    this.config = { ...defaultConfig, ...config };
    this.container = typeof container === 'string' ? document.querySelector(container) : container;

    // 获取DOM元素
    this.wrapper = this.container.querySelector('.mindmap-wrapper');
    this.linesLayer = this.container.querySelector('.lines-layer'); 
    this.nodesLayer = this.container.querySelector('.nodes-layer');

    // 数据相关
    this.data = structuredClone(data);
    this.rootNode = null;
    this.nodeMap = new Map();
    this.collapsedNodeIds = new Set();
    this.history = [this.data];
    this.historyIndex = 0;

    // 画布相关
    const { offsetWidth, offsetHeight } = this.container;
    this.scale = 1;
    this.offsetX = 0;
    this.offsetY = 0;
    this.centerX = offsetWidth / 2;
    this.centerY = offsetHeight / 2;

    // 布局实例
    this.layoutManager = new LayoutManager(this);
    this.lineManager = new LineManager(this);

    this.init();
  }

  // 初始化
  init() {
    this.rootNode = this.createNode(this.data, 0);
    this.rootNode.setPosition(this.centerX, this.centerY);
    this.layoutManager.layoutChildren(this.rootNode, 0);
  }

  // 创建节点实例
  createNode(nodeData, level) {
    // 先从缓存中获取
    const cachedNode = this.nodeMap.get(nodeData.id);
    if (cachedNode) {
      if (cachedNode.level !== level) {
        cachedNode.level = level;
        cachedNode.el.dataset.level = level;
      }
      return cachedNode;
    }

    // 创建新节点
    const node = new Node(nodeData, this);
    node.render(level);

    // 设置父子关系
    if (nodeData.children?.length) {
      nodeData.children.forEach(childData => {
        childData.parent = nodeData.id;
        const childNode = this.createNode(childData, level + 1);
        if (!node.children) node.children = [];
        node.children.push(childNode);
        childNode.parent = node;
      });
    }

    if (nodeData.parent) {
      node.parent = this.nodeMap.get(nodeData.parent);
    }
    return node;
  }

  // 重新布局
  refresh() {
    // 显示所有连线
    this.linesLayer.querySelectorAll('path').forEach(path => {
      path.style.display = '';
    });
    
    this.rootNode.calculateHeight();
    this.layoutManager.layoutChildren(this.rootNode, 0);
    
    // 隐藏折叠节点的所有下级连线
    this.collapsedNodeIds.forEach(nodeId => {
      const node = this.nodeMap.get(nodeId);
      if(node) {
        node.toggleChildrenLines(false);
      }
    });
  }
}

// 连线管理类,负责节点间贝塞尔曲线绘制
class LineManager {
  constructor(mindmap) {
    this.mindmap = mindmap;
    this.linesLayer = mindmap.linesLayer;
  }

  // 创建SVG路径
  createPath() {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const attrs = {
      stroke: '#666',
      fill: 'none',
      'stroke-width': '2'
    };
    Object.entries(attrs).forEach(([key, value]) => {
      path.setAttribute(key, value);
    });
    return path;
  }

  // 绘制贝塞尔曲线
  drawCurve(startX, startY, endX, endY, isLeft) {
    const path = this.createPath();
    const controlX = isLeft ? 
      startX - Math.abs(endX - startX) / 2 :
      startX + Math.abs(endX - startX) / 2;
    
    const d = `M ${startX} ${startY} C ${controlX} ${startY}, ${controlX} ${endY}, ${endX} ${endY}`;
    
    path.setAttribute('d', d);
    this.linesLayer.appendChild(path);
    return path;
  }

  // 连接父子节点
  connect(parent, child) {
    // 先查找是否已存在连线
    let line = parent.childLines.find(l => l.childNode === child);

    const isLeft = child.data.direction === 'left';
    const startX = parent.x + (isLeft ? 0 : parent.width);
    const startY = parent.y + parent.height / 2;
    const endX = child.x + (isLeft ? child.width : 0);
    const endY = child.y + child.height / 2;

    if(line) {
      // 更新已有连线路径
      const controlX = isLeft ? 
        startX - Math.abs(endX - startX) / 2 :
        startX + Math.abs(endX - startX) / 2;
      const d = `M ${startX} ${startY} C ${controlX} ${startY}, ${controlX} ${endY}, ${endX} ${endY}`;
      line.path.setAttribute('d', d);
      line.path.style.display = '';
      return line.path;
    } else {
      // 创建新连线
      const path = this.drawCurve(startX, startY, endX, endY, isLeft);
      path.dataset.parentId = parent.id;
      path.dataset.childId = child.id;
      
      // 创建连线对象
      line = {
        path,
        parentNode: parent,
        childNode: child
      };
      
      // 建立节点和连线的关系
      parent.childLines.push(line);
      child.parentLine = line;
      
      return path;
    }
  }

  // 清除所有连线
  clear() {
    this.linesLayer.replaceChildren();
  }
}

// 布局管理类,负责节点定位计算
class LayoutManager {
  constructor(mindmap) {
    this.mindmap = mindmap;
    this.config = mindmap.config;
  }

  // 分组子节点
  groupNodes(node, level) {
    const leftNodes = [];
    const rightNodes = [];

    node.children?.forEach(childNode => {
      const targetArray = level === 0 ?
        (childNode.data.direction === 'left' ? leftNodes : rightNodes) :
        (node.data.direction === 'left' ? leftNodes : rightNodes);

      targetArray.push(childNode);
    });

    return [leftNodes, rightNodes];
  }

  // 计算节点高度
  calculateNodeHeight(node) {
    const { verticalGap, groupGap } = this.config;
    const nodeHeight = node.height;

    if (!node.children?.length || this.mindmap.collapsedNodeIds.has(node.id)) {
      node.totalHeight = nodeHeight + verticalGap;
      return node.totalHeight;
    }

    const childrenHeight = node.children.reduce((sum, childNode) => {
      return sum + childNode.calculateHeight();
    }, 0);

    node.totalHeight = Math.max(nodeHeight, childrenHeight + groupGap);
    return node.totalHeight;
  }

  // 布局子节点
  layoutChildren(node, level) {
    if (!node.children?.length) return;

    const [leftNodes, rightNodes] = this.groupNodes(node, level);

    const layoutGroup = (nodes, isLeft) => {
      const totalHeight = nodes.reduce((sum, childNode) => {
        return sum + childNode.calculateHeight();
      }, 0);

      const baseX = isLeft ?
        node.x - this.config.horizontalGap :
        node.x + node.width + this.config.horizontalGap;
      let currentY = node.y + node.height / 2 - totalHeight / 2;

      nodes.forEach(childNode => {
        const direction = isLeft ? 'left' : 'right';
        childNode.el.dataset.direction = childNode.data.direction = direction;

        const childHeight = childNode.totalHeight;
        const childX = isLeft ? baseX - childNode.width : baseX;
        const childY = currentY + childHeight / 2 - childNode.height / 2;

        childNode.setPosition(childX, childY);
        // 绘制连线
        if(!this.mindmap.collapsedNodeIds.has(node.id)) {
          this.mindmap.lineManager.connect(node, childNode);
        }
        this.layoutChildren(childNode, level + 1);
        currentY += childHeight;
      });
    };

    layoutGroup(leftNodes, true);
    layoutGroup(rightNodes, false);
  }
}

// 节点类,负责单个节点的渲染和位置计算
class Node {
  constructor(data, mindmap) {
    const { topic, id, children } = data;
    this.data = data;
    this.topic = topic;
    this.id = id;
    this.children = null;
    this.parent = null;
    this.mindmap = mindmap;

    // 定位和尺寸
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.totalHeight = 0; // 节点总高度(包含子节点)
    this.el = null;

    // 连线相关
    this.parentLine = null; // 父节点连线
    this.childLines = []; // 子节点连线数组
  }

  get isRoot() {
    return this.level === 0;
  }

  // 渲染节点DOM
  render(level) {
    this.level = level;
    this.el = this.createElement();
    const { offsetWidth, offsetHeight } = this.el;
    this.width = offsetWidth;
    this.height = offsetHeight;
    this.mindmap.nodeMap.set(this.id, this);
  }

  // 创建展开/收起按钮
  createExpandBtn() {
    const btn = document.createElement('div');
    btn.className = 'expand-btn';
    btn.textContent = '-';

    const handleClick = (e) => {
      e.stopPropagation();
      const { collapsedNodeIds } = this.mindmap;
      const isCollapsed = collapsedNodeIds.has(this.id);

      if (isCollapsed) {
        collapsedNodeIds.delete(this.id);
        btn.textContent = '-';
        this.toggleChildren(true);
      } else {
        collapsedNodeIds.add(this.id);
        btn.textContent = '+';
        this.toggleChildren(false);
      }

      this.mindmap.refresh();
    };

    btn.onclick = handleClick;
    return btn;
  }

  // 创建节点DOM元素
  createElement() {
    const el = document.createElement("div");
    el.appendChild(document.createTextNode(this.topic));

    const classList = ['node'];
    if (this.isRoot) classList.push('is-root');
    el.className = classList.join(' ');

    Object.assign(el.dataset, {
      id: this.id,
      level: this.level
    });
    el.draggable = true;

    if (this.data.children?.length && !this.isRoot) {
      el.appendChild(this.createExpandBtn());
    }

    this.mindmap.nodesLayer.appendChild(el);

    return el;
  }

  // 切换子节点显示/隐藏状态
  toggleChildren(show) {
    if (!this.children?.length) return;

    this.children.forEach(childNode => {
      if (!childNode) return;

      // 显示/隐藏节点
      childNode.el.style.display = show ? '' : 'none';
      
      // 递归处理子节点的显示/隐藏
      if (show) {
        if (!this.mindmap.collapsedNodeIds.has(childNode.id)) {
          childNode.toggleChildren(true);
        }
      } else {
        childNode.toggleChildren(false);
      }
    });

    // 递归处理连线显示/隐藏
    this.toggleChildrenLines(show);
  }

  // 递归处理子节点连线的显示/隐藏
  toggleChildrenLines(show) {
    if (!this.children?.length) return;

    this.childLines.forEach(line => {
      line.path.style.display = show ? '' : 'none';
      line.childNode.toggleChildrenLines(show);
    });
  }

  // 更新节点位置
  setPosition(x, y) {
    this.x = x;
    this.y = y;

    if (this.isRoot) {
      this.x = x - this.width / 2;
      this.y = y - this.height / 2;
    }

    Object.assign(this.el.style, {
      left: `${this.x}px`,
      top: `${this.y}px`
    });
  }

  // 计算节点高度
  calculateHeight() {
    return this.mindmap.layoutManager.calculateNodeHeight(this);
  }
}

const mindmap = new MindMap('#container', mindmapData);
console.log('mindmap', mindmap);