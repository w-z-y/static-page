import { getLinePath } from '../utils/index.js';
export default class Line {
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

    connect(parent, child) {
        let line = parent.childLines.find(l => l.childNode === child);
        const isLeft = child.data.direction === 'left';
        const startX = parent.x + (isLeft ? 0 : parent.width);
        const startY = parent.y + parent.height / 2;
        const endX = child.x + (isLeft ? child.width : 0);
        const endY = child.y + child.height / 2;

        if (line) {
            line.path.style.display = '';
            line.path.setAttribute('d', getLinePath(startX, startY, endX, endY, isLeft, this.config.cornerRadius));
            return line.path;
        }

        const path = this.createPath();
        path.setAttribute('d', getLinePath(startX, startY, endX, endY, isLeft, this.config.cornerRadius));
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
