export default class History {
    constructor(mindmap) {
        this.mindmap = mindmap;
        this.records = [structuredClone(mindmap.data)];
        this.currentIndex = 0;
        this.maxLength = 50;
        this.updateButtons();
    }

    add(data) {
        this.records.splice(this.currentIndex + 1);
        this.records.push(structuredClone(data));
        this.currentIndex++;

        if (this.records.length > this.maxLength) {
            this.records.shift();
            this.currentIndex--;
        }

        this.updateButtons();
    }

    undo() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.restore();
            this.updateButtons();
        }
    }

    redo() {
        if (this.currentIndex < this.records.length - 1) {
            this.currentIndex++;
            this.restore();
            this.updateButtons();
        }
    }

    restore() {
        const data = structuredClone(this.records[this.currentIndex]);

        const getNodeIds = (node, ids = new Set()) => {
            ids.add(node.id);
            node.children?.forEach(child => getNodeIds(child, ids));
            return ids;
        };
        const newNodeIds = getNodeIds(data);

        this.mindmap.nodeMap.forEach((node, id) => {
            if (!newNodeIds.has(id)) {
                this.mindmap.removeNodeDOM(node);
            }
        });

        const collapsedNodeIds = new Set(this.mindmap.collapsedNodeIds);

        this.mindmap.data = data;
        this.mindmap.init();

        collapsedNodeIds.forEach(nodeId => {
            const node = this.mindmap.nodeMap.get(nodeId);
            if (node) {
                this.mindmap.collapsedNodeIds.add(nodeId);
                node.el.classList.add('is-collapsed');
                node.toggleChildren(false);
                const btn = node.el.querySelector('.expand-btn');
                if (btn) {
                    btn.textContent = `+${node.getChildCount()}`;
                }
            }
        });

        this.mindmap.refresh();
    }

    updateButtons() {
        const undoBtn = document.getElementById('undoBtn');
        const redoBtn = document.getElementById('redoBtn');
        
        if (undoBtn) {
            undoBtn.disabled = this.currentIndex === 0;
        }
        if (redoBtn) {
            redoBtn.disabled = this.currentIndex === this.records.length - 1;
        }
    }
}