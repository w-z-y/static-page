export default class Node {
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
    this.isEditing = false;
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

    requestAnimationFrame(() => {
      this.el.style.transition = 'transform 0.2s';
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

    el.addEventListener('dblclick', e => this.startEditing(e));

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
    this.el.style.transform = `translate(${this.x}px, ${this.y}px)`;
  }

  calculateHeight() {
    return this.mindmap.layoutInstance.calculateNodeHeight(this);
  }

  startEditing(e) {
    if (this.isEditing) return;
    e.stopPropagation();

    this.isEditing = true;
    const textSpan = this.el.querySelector('span');
    const textarea = document.createElement('textarea');
    textarea.value = this.topic;
    textarea.className = 'node node-textarea'
    textarea.style.padding = `${this.config.padding}px`;
    // textarea.style.cssText = `
    //     width: 100%;
    //     height: 100%;
    //     border: none;
    //     padding: 0;
    //     margin: 0;
    //     background: transparent;
    //     font-size: inherit;
    //     font-family: inherit;
    //     resize: none;
    //     position: absolute;
    //     top: 0;
    //     left: 0;
    //     box-sizing: border-box;
    //     padding: ${this.config.padding}px;
    // `;

    this.el.appendChild(textarea);
    textarea.focus();
    textarea.select();

    const finishEditing = () => {
      if (!this.isEditing) return;
      this.isEditing = false;
      const newTopic = textarea.value.trim();
      if (newTopic && newTopic !== this.topic) {
        this.topic = this.data.topic = newTopic;
        textSpan.textContent = newTopic;
      }
      textarea.remove();
      this.updateSize();
    };

    textarea.addEventListener('blur', finishEditing);
    textarea.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        finishEditing();
      }
      if (e.key === 'Escape') {
        textarea.value = this.topic;
        textarea.blur();
      }
    });
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
}