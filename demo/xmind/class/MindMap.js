import defaultConfig from '../config/index.js'

import Node from './Node.js';
import Line from './Line.js';
import Layout from './Layout.js';
import Event from './Event.js';
import History from './History.js'

export default class MindMap {
    constructor(container, data, config = {}) {
        this.config = { ...defaultConfig, ...config };
        this.container = typeof container === 'string' ? document.querySelector(container) : container;
        this.wrapper = this.container.querySelector('.mindmap-wrapper');
        this.linesLayer = this.container.querySelector('.lines-layer');
        this.nodesLayer = this.container.querySelector('.nodes-layer');

        this.data = structuredClone(data);
        this.nodeMap = new Map();
        this.collapsedNodeIds = new Set();
        this.historyInstance = new History(this);

        const { offsetWidth, offsetHeight } = this.container;
        this.centerX = offsetWidth / 2;
        this.centerY = offsetHeight / 2;
        this.scale = 1;
        this.offsetX = 0;
        this.offsetY = 0;

        this.layoutInstance = new Layout(this);
        this.lineInstance = new Line(this);
        this.eventInstance = new Event(this);

        this.selectedNode = null;

        // 添加容器点击取消选中事件
        this.container.addEventListener('click', e => {
            if (e.target === this.container || e.target === this.wrapper) {
                this.selectedNode?.unselect();
            }
        });

        this.init();
    }

    init() {
        // 清理所有连接线
        this.lineInstance.clear();
        
        // 清理所有节点的连接线引用
        this.nodeMap.forEach(node => {
            node.parentLine = null;
            node.childLines = [];
        });
        
        this.rootNode = this.createNode(this.data, 0);
        this.rootNode.setPosition(this.centerX, this.centerY);
        this.layoutInstance.layoutChildren(this.rootNode, 0);
    }

    createNode(nodeData, level) {
        let node = null;
        const cachedNode = this.nodeMap.get(nodeData.id);
        if (cachedNode) {
            if (cachedNode.level !== level) {
                cachedNode.level = level;
                cachedNode.el.dataset.level = level;
            }
            node = cachedNode;
        } else {
            node = new Node(nodeData, this);
            this.nodeMap.set(node.id, node);
            node.render(level);
        }
        if (nodeData.children?.length) {
            node.children = nodeData.children.map(childData => {
                const childNode = this.createNode(childData, level + 1);
                childNode.parent = node;
                return childNode;
            });
        }
        return node;
    }

    refresh() {
        this.linesLayer.querySelectorAll('path').forEach(path => path.style.display = '');
        this.rootNode.calculateHeight();
        this.layoutInstance.layoutChildren(this.rootNode, 0);
        this.collapsedNodeIds.forEach(nodeId => {
            const node = this.nodeMap.get(nodeId);
            node?.toggleChildrenLines(false);
        });
    }

    reset() {
        this.setPosition(0, 0, 1);
        this.refresh();
    }

    zoom(type, options = {}) {
        const { zoomMin, zoomMax, zoomStep } = this.config;
        const {
            x = this.container.offsetWidth / 2,
            y = this.container.offsetHeight / 2
        } = options;

        const scaleFactor = type === 'out' ?
            (1 - zoomStep) :
            (1 + zoomStep);

        const newScale = this.scale * scaleFactor;

        if (newScale < zoomMin || newScale > zoomMax) {
            return;
        }

        const rect = this.container.getBoundingClientRect();
        const centerX = x - rect.left;
        const centerY = y - rect.top;

        const zoomX = (centerX - this.offsetX) / this.scale;
        const zoomY = (centerY - this.offsetY) / this.scale;

        this.scale = newScale;
        this.offsetX = centerX - zoomX * this.scale;
        this.offsetY = centerY - zoomY * this.scale;

        this.setPosition(this.offsetX, this.offsetY, this.scale)
    }

    setPosition(x, y, scale) {
        if (typeof x === 'number') this.offsetX = x;
        if (typeof y === 'number') this.offsetY = y;
        if (typeof scale === 'number') this.scale = scale;

        this.wrapper.style.transform =  
            `translate(${this.offsetX}px, ${this.offsetY}px) scale(${this.scale})`;
    }
    addChild(node) {
        const newNode = {
            id: Math.random().toString(36).substring(2),
            topic: '新主题',
            direction: node.data.direction
        };

        node.data.children = node.data.children || [];
        node.data.children.push(newNode);
        this.historyInstance.add(this.data);
        this.init();
        this.nodeMap.get(newNode.id).select();
        this.nodeMap.get(newNode.id).startEditing({ stopPropagation: () => {} });
    }

    addSibling(node) {
        if (node.isRoot) return;

        const newNode = {
            id: Math.random().toString(36).substring(2),
            topic: '新主题',
            direction: node.data.direction
        };

        const siblings = node.parent.data.children;
        const index = siblings.indexOf(node.data);
        siblings.splice(index + 1, 0, newNode);
        this.historyInstance.add(this.data);

        this.init();
        this.nodeMap.get(newNode.id).select();
        this.nodeMap.get(newNode.id).startEditing({ stopPropagation: () => {} });
    }

    deleteNode(node) {
        if (node.isRoot) return;

        const siblings = node.parent.data.children;
        const index = siblings.indexOf(node.data);
        siblings.splice(index, 1);
        this.historyInstance.add(this.data);

        this.init();
        node.parent.select();
    }
}
