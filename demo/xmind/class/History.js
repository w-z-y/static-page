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
        this.mindmap.data = data;
        this.mindmap.init();
    }
} 
