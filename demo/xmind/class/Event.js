export default class Event {
    constructor(mindmap) {
        this.mindmap = mindmap;
        this.config = mindmap.config;
        this.setupWheelEvent();
        this.setupDragEvent();
        this.setupTouchEvent();
        this.setupKeyboardEvent();
    }
    // 键盘事件
    setupKeyboardEvent() {
        document.addEventListener('keydown', e => {
            // Ctrl+Z 撤销
            if (e.ctrlKey && e.key.toLowerCase() === 'z' && !e.shiftKey) {
                e.preventDefault();
                this.mindmap.historyInstance.undo();
            }

            // Ctrl+Shift+Z 或 Ctrl+Y 重做
            if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'z') ||
                (e.ctrlKey && e.key.toLowerCase() === 'y')) {
                e.preventDefault();
                this.mindmap.historyInstance.redo();
            }


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

