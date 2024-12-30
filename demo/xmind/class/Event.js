export default class Event {
    constructor(mindmap) {
        this.mindmap = mindmap;
        this.config = mindmap.config;
        this.setupWheelEvent();
        this.setupDragEvent();
        this.setupTouchEvent();
        this.setupKeyboardEvent();
        this.setupContainerEvent();
    }

    // 新增容器事件处理
    setupContainerEvent() { 
        // 从 MindMap 类移动过来的容器点击事件
        this.mindmap.container.addEventListener('click', e => {
            if (e.target === this.mindmap.container || e.target === this.mindmap.wrapper) {
                this.mindmap.selectedNode?.unselect();
            }
        });
    }

    // 新增节点事件处理
    setupNodeEvents(node) {
        const el = node.el;
        if(!el) return;
        // 点击选中
        el.addEventListener('click', e => {
            e.stopPropagation();
            node.select();
        });

        // 双击编辑
        el.addEventListener('dblclick', e => this.handleNodeEdit(e, node));

        // 拖拽相关
        el.addEventListener('dragstart', e => {
            e.stopPropagation();
            node.select();
            e.dataTransfer.setData('text/plain', node.id);
        });

        el.addEventListener('dragover', e => {
            e.preventDefault();
            e.stopPropagation();
        });

        el.addEventListener('drop', e => {
            e.preventDefault();
            e.stopPropagation();
            const draggedNodeId = e.dataTransfer.getData('text/plain');
            const draggedNode = this.mindmap.nodeMap.get(draggedNodeId);

            if (draggedNode && draggedNode !== node && !node.isDescendantOf(draggedNode)) {
                draggedNode.moveTo(node);
            }
        });
    }

    // 新增节点编辑处理
    handleNodeEdit(e, node) {
        if (node.isEditing) return;
        e.stopPropagation();

        node.isEditing = true;
        const textSpan = node.el.querySelector('span');
        const textarea = document.createElement('textarea');
        textarea.value = node.topic;
        textarea.className = 'node node-textarea';

        node.el.appendChild(textarea);
        textarea.focus();
        textarea.select();

        const finishEditing = () => {
            if (!node.isEditing) return;
            node.isEditing = false;
            const newTopic = textarea.value.trim();
            if (newTopic && newTopic !== node.topic) {
                node.topic = node.data.topic = newTopic;
                textSpan.textContent = newTopic;
                this.mindmap.history.add(structuredClone(this.mindmap.data));
            }
            textarea.remove();
            node.updateSize();
        };

        textarea.addEventListener('blur', finishEditing);
        textarea.addEventListener('keydown', e => {
            if (e.key === 'Enter' && !e.shiftKey || e.key === 'Tab') {
                e.preventDefault();
                e.stopPropagation();
                finishEditing();
            }
            if (e.key === 'Escape') {
                textarea.value = node.topic;
                textarea.blur();
            }
        });
    }

    // 键盘事件
    setupKeyboardEvent() {
        document.addEventListener('keydown', e => {
            if (this.mindmap.selectedNode && !this.mindmap.selectedNode.isEditing) {
                if (e.key === 'Tab') {
                    e.preventDefault();
                    this.mindmap.addChild(this.mindmap.selectedNode);
                } else if (e.key === 'Enter') {
                    e.preventDefault();
                    this.mindmap.addSibling(this.mindmap.selectedNode);
                } else if (e.key === 'Delete' || e.key === 'Backspace') {
                    e.preventDefault();
                    this.mindmap.deleteNode(this.mindmap.selectedNode);
                }
            }
        });
    }
    // 滚轮操作
    setupWheelEvent() {
        const handleWheel = e => {
            e.preventDefault();
            this.mindmap.zoom(e.deltaY > 0 ? 'out' : 'in', {
                x: e.clientX,
                y: e.clientY,
            });
        };
        this.mindmap.container.addEventListener('wheel', handleWheel, { passive: false });
    }

    // 拖拽操作
    setupDragEvent() {
        let dragState = {
            isDragging: false,
            startX: 0,
            startY: 0,
            initialOffsetX: 0,
            initialOffsetY: 0
        };

        const handleMouseDown = e => {
            if (e.target === this.mindmap.container || e.target === this.mindmap.wrapper) {
                dragState = {
                    isDragging: true,
                    startX: e.clientX,
                    startY: e.clientY,
                    initialOffsetX: this.mindmap.offsetX,
                    initialOffsetY: this.mindmap.offsetY
                };
            }
        };

        const handleMouseMove = e => {
            if (!dragState.isDragging) return;

            const deltaX = e.clientX - dragState.startX;
            const deltaY = e.clientY - dragState.startY;

            this.mindmap.setPosition(
                dragState.initialOffsetX + deltaX,
                dragState.initialOffsetY + deltaY
            );
        };

        const handleMouseUp = () => {
            dragState.isDragging = false;
        };

        this.mindmap.container.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }

    // 触屏操作
    setupTouchEvent() {
        let touchState = {
            lastTouchDistance: 0,
            isDragging: false,
            startX: 0,
            startY: 0,
            initialOffsetX: 0,
            initialOffsetY: 0
        };

        const handleTouchStart = e => {
            if (e.target === this.mindmap.container || e.target === this.mindmap.wrapper) {
                touchState = {
                    ...touchState,
                    isDragging: true,
                    startX: e.touches[0].clientX,
                    startY: e.touches[0].clientY,
                    initialOffsetX: this.mindmap.offsetX,
                    initialOffsetY: this.mindmap.offsetY
                };

                if (e.touches.length === 2) {
                    touchState.lastTouchDistance = Math.hypot(
                        e.touches[0].clientX - e.touches[1].clientX,
                        e.touches[0].clientY - e.touches[1].clientY
                    );
                }
            }
        };

        this.mindmap.container.addEventListener('touchstart', handleTouchStart);

        this.mindmap.container.addEventListener('touchmove', e => {
            e.preventDefault();

            if (e.touches.length === 2) {
                // 处理缩放
                const distance = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );

                const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
                const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
                const rect = this.mindmap.container.getBoundingClientRect();
                const x = (midX - rect.left - this.mindmap.offsetX) / this.mindmap.scale;
                const y = (midY - rect.top - this.mindmap.offsetY) / this.mindmap.scale;

                const scaleFactor = distance / touchState.lastTouchDistance;
                const newScale = this.mindmap.scale * scaleFactor;

                const { zoomMin, zoomMax } = this.config;
                if (newScale >= zoomMin && newScale <= zoomMax) {
                    this.mindmap.scale = newScale;
                    this.mindmap.offsetX = midX - rect.left - x * this.mindmap.scale;
                    this.mindmap.offsetY = midY - rect.top - y * this.mindmap.scale;
                    this.mindmap.wrapper.style.transform =
                        `translate(${this.mindmap.offsetX}px, ${this.mindmap.offsetY}px) scale(${this.mindmap.scale})`;
                }

                touchState.lastTouchDistance = distance;
            } else if (touchState.isDragging) {
                // 处理拖动
                const deltaX = e.touches[0].clientX - touchState.startX;
                const deltaY = e.touches[0].clientY - touchState.startY;

                this.mindmap.setPosition(
                    touchState.initialOffsetX + deltaX,
                    touchState.initialOffsetY + deltaY
                );
            }
        });

        this.mindmap.container.addEventListener('touchend', () => {
            touchState.isDragging = false;
        });
    }
}

