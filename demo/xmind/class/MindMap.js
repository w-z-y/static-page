import defaultConfig from '../config/index.js'
import { mergeConfig } from '../utils/index.js';

import Node from './Node.js';
import Line from './Line.js';
import Layout from './Layout.js';
import Event from './Event.js';

export default class MindMap {
    constructor(container, data, config = {}) {
        this.config = mergeConfig(defaultConfig, config);
        this.container = typeof container === 'string' ? document.querySelector(container) : container;
        this.wrapper = this.container.querySelector('.mindmap-wrapper');
        this.linesLayer = this.container.querySelector('.lines-layer');
        this.nodesLayer = this.container.querySelector('.nodes-layer');

        this.data = structuredClone(data);
        this.nodeMap = new Map();
        this.collapsedNodeIds = new Set();
        this.history = [this.data];
        this.historyIndex = 0;

        const { offsetWidth, offsetHeight } = this.container;
        this.centerX = offsetWidth / 2;
        this.centerY = offsetHeight / 2;
        this.scale = 1;
        this.offsetX = 0;
        this.offsetY = 0;

        this.layoutInstance = new Layout(this);
        this.lineInstance = new Line(this);
        this.eventInstance = new Event(this);

        this.init();
    }

    init() {
        this.rootNode = this.createNode(this.data, 0);
        this.rootNode.setPosition(this.centerX, this.centerY);
        this.layoutInstance.layoutChildren(this.rootNode, 0);
    }

    createNode(nodeData, level) {
        const cachedNode = this.nodeMap.get(nodeData.id);
        if (cachedNode) {
            if (cachedNode.level !== level) {
                cachedNode.level = level;
                cachedNode.el.dataset.level = level;
            }
            return cachedNode;
        }

        const node = new Node(nodeData, this);
        node.render(level);

        if (nodeData.children?.length) {
            node.children = nodeData.children.map(childData => {
                childData.parent = nodeData.id;
                const childNode = this.createNode(childData, level + 1);
                childNode.parent = node;
                return childNode;
            });
        }

        if (nodeData.parent) {
            node.parent = this.nodeMap.get(nodeData.parent);
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
}