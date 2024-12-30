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
    const { offsetWidth, offsetHeight } = this.el;
    this.width = offsetWidth;
    this.height = offsetHeight;
    this.mindmap.eventInstance.setupNodeEvents(this);
    
    requestAnimationFrame(() => {
      const { transition } = this.config;
      transition && (this.el.style.transition = `transform ${transition}ms`);
    });
  }

  handleExpandBtnClick(e, btn) {
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
  }

  createExpandBtn() {
    const btn = document.createElement('div');
    btn.className = 'expand-btn';
    btn.textContent = '-';
    btn.onclick = e => this.handleExpandBtnClick(e, btn);
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

    newParent.children = newParent.children || [];
    newParent.data.children = newParent.data.children || [];
    newParent.children.push(this);
    newParent.data.children.push(this.data);
    this.parent = newParent;

    this.data.direction = newParent.data.direction;

    this.mindmap.refresh();
  }
}

