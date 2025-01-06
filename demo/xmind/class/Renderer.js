export default class Renderer {
    constructor(mindmap) {
        this.mindmap = mindmap;
        this.config = mindmap.config;
    }

    createNode(nodeData, level) {
        let node = null;
        const cachedNode = this.mindmap.nodeMap.get(nodeData.id);
        
        if (cachedNode) {
            this.updateExistingNode(cachedNode, level);
            node = cachedNode;
        } else {
            node = new Node(nodeData, this.mindmap);
            this.mindmap.nodeMap.set(node.id, node);
            node.render(level);
        }
        
        this.setupNodeChildren(node, nodeData, level);
        return node;
    }

    updateExistingNode(node, level) {
        if (node.level !== level) {
            node.level = level;
            node.el.dataset.level = level;
        }
    }

    setupNodeChildren(node, nodeData, level) {
        if (nodeData.children?.length) {
            node.children = nodeData.children.map(childData => {
                const childNode = this.createNode(childData, level + 1);
                childNode.parent = node;
                return childNode;
            });
        }
        node.data = nodeData;
    }
} 