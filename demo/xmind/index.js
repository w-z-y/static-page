
import mindmapData from './backup/data.js';
import defaultConfig from './config.js'

class MindMap {
  constructor(container, data, config = {}) {
    this.config = {
      node: { ...defaultConfig.node, ...config.node },
      line: { ...defaultConfig.line, ...config.line },
      layout: { ...defaultConfig.layout, ...config.layout }
    };
    this.container = typeof container === 'string' ? document.querySelector(container) : container;
    this.wrapper = this.container.querySelector('.mindmap-wrapper');
    this.linesLayer = this.container.querySelector('.lines-layer');
    this.nodesLayer = this.container.querySelector('.nodes-layer');

    this.data = structuredClone(data);
    this.nodeMap = new Map();
    this.collapsedNodeIds = new Set();
    this.history = [this.data];
    this.historyIndex = 0;

    const { offsetWidth, offsetHeight } = this.container;
    this.centerX = offsetWidth / 2;
    this.centerY = offsetHeight / 2;
    this.scale = 1;
    this.offsetX = 0;
    this.offsetY = 0;

    this.Layout = new Layout(this);
    this.Line = new Line(this);

    this.init();
  }

  init() {
    this.rootNode = this.createNode(this.data, 0);
    this.rootNode.setPosition(this.centerX, this.centerY);
    this.Layout.layoutChildren(this.rootNode, 0);
  }

  createNode(nodeData, level) {
    const cachedNode = this.nodeMap.get(nodeData.id);
    if (cachedNode) {
      if (cachedNode.level !== level) {
        cachedNode.level = level;
        cachedNode.el.dataset.level = level;
      }
      return cachedNode;
    }

    const node = new Node(nodeData, this);
    node.render(level);

    if (nodeData.children?.length) {
      node.children = nodeData.children.map(childData => {
        childData.parent = nodeData.id;
        const childNode = this.createNode(childData, level + 1);
        childNode.parent = node;
        return childNode;
      });
    }

    if (nodeData.parent) {
      node.parent = this.nodeMap.get(nodeData.parent);
    }
    return node;
  }

  refresh() {
    this.linesLayer.querySelectorAll('path').forEach(path => path.style.display = '');
    this.rootNode.calculateHeight();
    this.Layout.layoutChildren(this.rootNode, 0);
    this.collapsedNodeIds.forEach(nodeId => {
      const node = this.nodeMap.get(nodeId);
      node?.toggleChildrenLines(false);
    });
  }
}

class Line {
  constructor(mindmap) {
    this.mindmap = mindmap;
    this.linesLayer = mindmap.linesLayer;
    this.config = mindmap.config.line;
  }

  createPath() {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('stroke', this.config.stroke);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-width', this.config.strokeWidth);
    return path;
  }

  // 计算连线路径
  getLinePath(startX, startY, endX, endY, isLeft) {
    const { cornerRadius } = this.config;
    const midX = startX + (isLeft ? -1 : 1) * Math.abs(endX - startX) / 2;
    let d = `M ${startX} ${startY}`;

    if (startY !== endY) {
      d += ` L ${midX} ${startY}`;

      if (endY > startY) {
        d += ` L ${midX} ${endY - cornerRadius}`;
        d += ` Q ${midX} ${endY} ${midX + (isLeft ? -cornerRadius : cornerRadius)} ${endY}`;
      } else {
        d += ` L ${midX} ${endY + cornerRadius}`;
        d += ` Q ${midX} ${endY} ${midX + (isLeft ? -cornerRadius : cornerRadius)} ${endY}`;
      }
    }

    d += ` L ${endX} ${endY}`;
    return d;
  }

  connect(parent, child) {
    let line = parent.childLines.find(l => l.childNode === child);
    const isLeft = child.data.direction === 'left';
    const startX = parent.x + (isLeft ? 0 : parent.width);
    const startY = parent.y + parent.height / 2;
    const endX = child.x + (isLeft ? child.width : 0);
    const endY = child.y + child.height / 2;

    if (line) {
      line.path.style.display = '';
      line.path.setAttribute('d', this.getLinePath(startX, startY, endX, endY, isLeft));
      return line.path;
    }

    const path = this.createPath();
    path.setAttribute('d', this.getLinePath(startX, startY, endX, endY, isLeft));
    path.dataset.parentId = parent.id;
    path.dataset.childId = child.id;
    this.linesLayer.appendChild(path);

    line = { path, parentNode: parent, childNode: child };
    parent.childLines.push(line);
    child.parentLine = line;
    return path;
  }

  clear() {
    this.linesLayer.replaceChildren();
  }
}

class Layout {
  constructor(mindmap) {
    this.mindmap = mindmap;
    this.config = mindmap.config.layout;
  }

  groupNodes(node, level) {
    const [leftNodes, rightNodes] = [[], []];
    node.children?.forEach(childNode => {
      const isLeft = level === 0 ? childNode.data.direction === 'left' : node.data.direction === 'left';
      (isLeft ? leftNodes : rightNodes).push(childNode);
    });
    return [leftNodes, rightNodes];
  }

  calculateNodeHeight(node) {
    const { verticalGap, groupGap } = this.config;
    if (!node.children?.length || this.mindmap.collapsedNodeIds.has(node.id)) {
      return node.totalHeight = node.height + verticalGap;
    }
    const childrenHeight = node.children.reduce((sum, child) => sum + child.calculateHeight(), 0);
    return node.totalHeight = Math.max(node.height, childrenHeight + groupGap);
  }

  layoutChildren(node, level) {
    if (!node.children?.length) return;

    const [leftNodes, rightNodes] = this.groupNodes(node, level);
    const layoutGroup = (nodes, isLeft) => {
      const totalHeight = nodes.reduce((sum, child) => sum + child.calculateHeight(), 0);
      const baseX = node.x + (isLeft ? -this.config.horizontalGap : node.width + this.config.horizontalGap);
      let currentY = node.y + node.height / 2 - totalHeight / 2;

      nodes.forEach(childNode => {
        const direction = isLeft ? 'left' : 'right';
        childNode.el.dataset.direction = childNode.data.direction = direction;
        childNode.setPosition(
          isLeft ? baseX - childNode.width : baseX,
          currentY + childNode.totalHeight / 2 - childNode.height / 2
        );
        if (!this.mindmap.collapsedNodeIds.has(node.id)) {
          this.mindmap.Line.connect(node, childNode);
        }
        this.layoutChildren(childNode, level + 1);
        currentY += childNode.totalHeight;
      });
    };

    layoutGroup(leftNodes, true);
    layoutGroup(rightNodes, false);
  }
}

class Node {
  constructor(data, mindmap) {
    this.data = data;
    this.topic = data.topic;
    this.id = data.id;
    this.mindmap = mindmap;
    this.config = mindmap.config.node;
    this.children = null;
    this.parent = null;
    this.x = this.y = this.width = this.height = this.totalHeight = 0;
    this.el = null;
    this.parentLine = null;
    this.childLines = [];
  }

  get isRoot() {
    return this.level === 0;
  }

  render(level) {
    this.level = level;
    this.el = this.createElement();
    const { offsetWidth, offsetHeight } = this.el;
    this.width = offsetWidth;
    this.height = offsetHeight;
    this.mindmap.nodeMap.set(this.id, this);
  }

  createExpandBtn() {
    const btn = document.createElement('div');
    btn.className = 'expand-btn';
    btn.textContent = '-';
    btn.onclick = e => {
      e.stopPropagation();
      const isCollapsed = this.mindmap.collapsedNodeIds.has(this.id);
      if (isCollapsed) {
        this.mindmap.collapsedNodeIds.delete(this.id);
        btn.textContent = '-';
        this.toggleChildren(true);
      } else {
        this.mindmap.collapsedNodeIds.add(this.id);
        btn.textContent = '+';
        this.toggleChildren(false);
      }
      this.mindmap.refresh();
    };
    return btn;
  }

  createElement() {
    const el = document.createElement("div");
    el.appendChild(document.createTextNode(this.topic));
    el.className = this.isRoot ? 'node is-root' : 'node';
    el.dataset.id = this.id;
    el.dataset.level = this.level;
    el.draggable = true;

    // 应用节点样式
    Object.assign(el.style, {
      padding: `${this.config.padding}px`,
      fontSize: `${this.isRoot ? this.config.fontSize.root : this.config.fontSize.normal}px`,
      maxWidth: `${this.config.maxWidth}px`,
      borderRadius: `${this.config.borderRadius}px`,
      borderWidth: `${this.config.borderWidth}px`,
      borderStyle: 'solid',
      borderColor: this.config.borderColor,
      backgroundColor: this.isRoot ? this.config.backgroundColor.root : this.config.backgroundColor.normal,
      color: this.isRoot ? this.config.color.root : this.config.color.normal
    });

    if (this.data.children?.length && !this.isRoot) {
      el.appendChild(this.createExpandBtn());
    }

    this.mindmap.nodesLayer.appendChild(el);
    return el;
  }

  toggleChildren(show) {
    this.children?.forEach(child => {
      if (!child) return;
      child.el.style.display = show ? '' : 'none';
      if (show) {
        if (!this.mindmap.collapsedNodeIds.has(child.id)) {
          child.toggleChildren(true);
        }
      } else {
        child.toggleChildren(false);
      }
    });
    this.toggleChildrenLines(show);
  }

  toggleChildrenLines(show) {
    this.children?.forEach(child => {
      const line = this.childLines.find(l => l.childNode === child);
      if (line) {
        line.path.style.display = show ? '' : 'none';
        child.toggleChildrenLines(show);
      }
    });
  }

  setPosition(x, y) {
    this.x = this.isRoot ? x - this.width / 2 : x;
    this.y = this.isRoot ? y - this.height / 2 : y;
    Object.assign(this.el.style, {
      left: `${this.x}px`,
      top: `${this.y}px`
    });
  }

  calculateHeight() {
    return this.mindmap.Layout.calculateNodeHeight(this);
  }
}

const mindmap = new MindMap('#container', mindmapData);
console.log('mindmap', mindmap);