export default class Node {
  constructor(data, mindmap) {
    this.data = data;
    this.topic = data.topic;
    this.id = data.id;
    this.mindmap = mindmap;
    this.config = mindmap.config;
    this.children = null;
    this.parent = null;
    this.x = this.y = this.width = this.height = this.totalHeight = 0;
    this.el = null;
    this.parentLine = null;
    this.childLines = [];

    this.isEditing = false;
    this.isSelected = false;
  }

  get isRoot() {
    return this.level === 0;
  }

  render(level) {
    this.level = level;
    this.el = this.createElement();
    
    if (this.mindmap.collapsedNodeIds.has(this.id)) {
      this.el.classList.add('is-collapsed');
    }
    
    const { offsetWidth, offsetHeight } = this.el;
    this.width = offsetWidth;
    this.height = offsetHeight;
    this.mindmap.eventInstance.setupNodeEvents(this);
    
    requestAnimationFrame(() => {
      const { transition } = this.config;
      transition && (this.el.style.transition = `transform ${transition}ms`);
    });
  }

  /**
   * 切换节点展开/收起状态
   * @param {boolean} [force] - 可选,强制设置展开/收起状态
   */
  toggleExpand(force) {
    const isCollapsed = this.mindmap.collapsedNodeIds.has(this.id);
    // 如果传入force参数,则使用force的值,否则切换当前状态
    const willExpand = force !== undefined ? force : isCollapsed;
    
    if (willExpand) {
      // 展开节点
      this.mindmap.collapsedNodeIds.delete(this.id);
      this.toggleChildren(true);
      this.el.classList.remove('is-collapsed');
    } else {
      // 收起节点
      this.mindmap.collapsedNodeIds.add(this.id);
      this.toggleChildren(false); 
      this.el.classList.add('is-collapsed');
    }

    // 更新展开按钮文本
    if (this.el) {
      const btn = this.el.querySelector('.expand-btn');
      if (btn) {
        const childCount = this.getChildCount();
        btn.textContent = willExpand ? '-' : `+${childCount}`;
      }
    }

    this.mindmap.refresh();
  }

  /**
   * 获取所有子节点数量(包括深层子节点)
   */
  getChildCount() {
    let count = 0;
    if (this.children) {
      count += this.children.length;
      this.children.forEach(child => {
        count += child.getChildCount();
      });
    }
    return count;
  }

  /**
   * 创建展开/收起按钮
   */
  createExpandBtn() {
    const btn = document.createElement('div');
    btn.className = 'expand-btn';
    
    // 初始化按钮文本
    const isCollapsed = this.mindmap.collapsedNodeIds.has(this.id);
    const childCount = this.getChildCount();
    btn.textContent = isCollapsed ? `+${childCount}` : '-';

    // 点击事件改为调用 toggleExpand
    btn.onclick = e => {
      e.stopPropagation();
      this.toggleExpand();
    };

    btn.ondblclick = e => e.stopPropagation();
    
    return btn;
  }

  createElement() {
    const el = document.createElement("div");
    const textSpan = document.createElement("span");
    textSpan.textContent = this.topic;
    el.appendChild(textSpan);
    el.className = this.isRoot ? 'node is-root' : 'node';
    el.dataset.id = this.id;
    el.dataset.level = this.level;
    el.draggable = true;

    if (this.data.children?.length > 0 && !this.isRoot) {
        el.appendChild(this.createExpandBtn());
    }

    this.mindmap.nodesLayer.appendChild(el);

    return el;
  }

  toggleChildren(show) {
    this.children?.forEach(child => {
        if (!child) return;
        
        // 删除/添加节点元素，而不是使用 display 属性
        if (show) {
            if (!child.el.parentNode) {
                this.mindmap.nodesLayer.appendChild(child.el);
                // 重新计算节点高度
                const { offsetHeight, offsetWidth } = child.el;
                child.height = offsetHeight;
                child.width = offsetWidth;
                child.totalHeight = child.calculateHeight();

                // 重新计算x位置
                const { horizontalGap } = this.mindmap.config;
                const isLeft = child.data.direction === 'left';
                const parentX = this.x + (this.isRoot ? this.width / 2 : this.width);
                child.x = isLeft ? 
                    parentX - horizontalGap - child.width : 
                    parentX + horizontalGap;
                
                // 应用新位置
                child.setPosition(child.x, child.y);
            }
            if (!this.mindmap.collapsedNodeIds.has(child.id)) {
                child.toggleChildren(true);
            }
        } else {
            child.el.remove();
            child.toggleChildren(false);
        }
    });
    
    // 展开/收起后重新计算当前节点的总高度
    this.totalHeight = this.calculateHeight();
    
    this.toggleChildrenLines(show);
  }

  toggleChildrenLines(show) {
    this.children?.forEach(child => {
        const line = this.childLines.find(l => l.childNode === child);
        if (line) {
            if (show) {
                if (!line.path.parentNode) {
                    this.mindmap.linesLayer.appendChild(line.path);
                }
            } else {
                line.path.remove();
            }
            child.toggleChildrenLines(show);
        }
    });
  }

  setPosition(x, y) {
    this.x = this.isRoot ? x - this.width / 2 : x;
    this.y = this.isRoot ? y - this.height / 2 : y;
    this.el.style.transform = `translate(${this.x}px, ${this.y}px)`;
  }

  calculateHeight() {
    return this.mindmap.layoutInstance.calculateNodeHeight(this);
  }
  updateSize() {
    const { offsetWidth, offsetHeight } = this.el;
    const sizeChanged = this.width !== offsetWidth || this.height !== offsetHeight;

    if (sizeChanged) {
      this.width = offsetWidth;
      this.height = offsetHeight;
      this.mindmap.refresh();
    }
  }
  
  select() {
    this.mindmap.selectedNode?.unselect();
    this.isSelected = true;
    this.el.classList.add('is-selected');
    this.mindmap.selectedNode = this;
  }

  unselect() {
    this.isSelected = false;
    this.el.classList.remove('is-selected');
    if (this.mindmap.selectedNode === this) {
      this.mindmap.selectedNode = null;
    }
  }

  isDescendantOf(node) {
    let parent = this.parent;
    while (parent) {
      if (parent === node) return true;
      parent = parent.parent;
    }
    return false;
  }

  moveTo(newParent) {
    // 递归清理所有子节点的连接线
    const clearChildLines = (node) => {
        node.children?.forEach(child => {
            if (child.parentLine) {
                child.parentLine.path.remove();
                const index = node.childLines.indexOf(child.parentLine);
                if (index > -1) {
                    node.childLines.splice(index, 1);
                }
                child.parentLine = null;
            }
            clearChildLines(child);
        });
    };

    // 清理当前节点及其所有子节点的连接线
    if (this.parentLine) {
        this.parentLine.path.remove();
        const index = this.parent.childLines.indexOf(this.parentLine);
        if (index > -1) {
            this.parent.childLines.splice(index, 1);
        }
        this.parentLine = null;
    }
    clearChildLines(this);

    // 更新节点关系
    if (this.parent) {
        const index = this.parent.children.indexOf(this);
        if (index > -1) {
            this.parent.children.splice(index, 1);
            this.parent.data.children.splice(index, 1);
        }
    }

    // 检查原父节点是否还有其他子节点
    if (this.parent && this.parent.data.children.length === 0) {
        delete this.parent.data.children;
        // 移除原父节点的展开按钮
        const expandBtn = this.parent.el.querySelector('.expand-btn');
        expandBtn?.remove();
    }

    newParent.children = newParent.children || [];
    newParent.data.children = newParent.data.children || [];
    newParent.children.push(this);
    newParent.data.children.push(this.data);
    this.parent = newParent;

    this.data.direction = newParent.data.direction;

    // 更新当前节点及其所有子节点的level
    const updateNodeLevel = (node, level) => {
        node.level = level;
        node.el.dataset.level = level;
        node.children?.forEach(child => updateNodeLevel(child, level + 1));
    };
    updateNodeLevel(this, newParent.level + 1);

    // 确保新父节点有展开按钮
    if (newParent.data.children?.length > 0 && !newParent.el.querySelector('.expand-btn') && !newParent.isRoot) {
        newParent.el.appendChild(this.createExpandBtn());
    }

    this.mindmap.refresh();
    // 添加历史记录
    this.mindmap.history.add(structuredClone(this.mindmap.data));
  }

  addExpandBtn() {
    if (!this.el.querySelector('.expand-btn') && !this.isRoot) {
        this.el.appendChild(this.createExpandBtn());
    }
  }

  /**
   * 更新节点内容
   */
  updateContent() {
    // 更新节点文本内容
    const textSpan = this.el.querySelector('span');
    if (textSpan && this.topic !== this.data.topic) {
      this.topic = this.data.topic;
      textSpan.textContent = this.topic;
      this.updateSize(); // 更新节点尺寸
    }

    // 更新方向
    if (this.data.direction) {
      this.el.dataset.direction = this.data.direction;
    }

    // 更新子节点状态
    if (!this.data.children?.length && this.el.querySelector('.expand-btn')) {
      // 如果没有子节点但有展开按钮,移除按钮
      this.el.querySelector('.expand-btn').remove();
    } else if (this.data.children?.length && !this.el.querySelector('.expand-btn')) {
      // 如果有子节点但没有展开按钮,添加按钮
      this.addExpandBtn();
    }
  }
}
