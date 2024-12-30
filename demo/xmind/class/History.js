export default class History {
    constructor(mindmap) {
        this.mindmap = mindmap;
        this.records = [structuredClone(mindmap.data)];
        this.currentIndex = 0;
    }

    add(data) {
        // 删除当前位置之后的所有记录
        this.records.splice(this.currentIndex + 1);
        // 添加新记录
        this.records.push(structuredClone(data));
        this.currentIndex++;
    }

    undo() {
        console.log('this.records', this.records);
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.restore();
        }
    }

    redo() {
        if (this.currentIndex < this.records.length - 1) {
            this.currentIndex++;
            this.restore();
        }
    }

    restore() {
        const data = structuredClone(this.records[this.currentIndex]);

        // 获取新数据中所有节点的ID
        const getNodeIds = (node, ids = new Set()) => {
            ids.add(node.id);
            node.children?.forEach(child => getNodeIds(child, ids));
            return ids;
        };
        const newNodeIds = getNodeIds(data);

        // 删除不在新数据中的节点
        this.mindmap.nodeMap.forEach((node, id) => {
            if (!newNodeIds.has(id)) {
                this.mindmap.removeNodeDOM(node);
            }
        });

        this.mindmap.data = data;
        this.mindmap.init();
    }
}