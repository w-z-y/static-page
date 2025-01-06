import defaultConfig from '../config/index.js'

import Node from './Node.js';
import Line from './Line.js';
import Layout from './Layout.js';
import Event from './Event.js';
import History from './History.js';
import Renderer from './Renderer.js';

export default class MindMap {
    constructor(container, data, config = {}) {
        // 基础配置初始化
        this.initializeBasics(container, data, config);
        
        // 创建各个功能实例
        this.initializeInstances();
        
        this.setThemeVariables();
        // 初始化视图
        this.init();
    }

    initializeBasics(container, data, config) {
        this.config = { ...defaultConfig, ...config };
        this.container = typeof container === 'string' ? 
            document.querySelector(container) : container;
        this.wrapper = this.container.querySelector('.mindmap-wrapper');
        this.linesLayer = this.container.querySelector('.lines-layer');
        this.nodesLayer = this.container.querySelector('.nodes-layer');
        
        this.data = structuredClone(data);
        this.nodeMap = new Map();
        this.collapsedNodeIds = new Set();
        
        // 视图相关属性初始化
        const { offsetWidth, offsetHeight } = this.container;
        this.centerX = offsetWidth / 2;
        this.centerY = offsetHeight / 2;
        this.scale = 1;
        this.offsetX = 0;
        this.offsetY = 0;
        
        this.selectedNode = null;
    }

    initializeInstances() {
        // 各个功能模块实例化
        this.renderer = new Renderer(this);
        this.layoutInstance = new Layout(this);
        this.lineInstance = new Line(this);
        this.eventInstance = new Event(this);
        this.historyInstance = new History(this);
    }

    setThemeVariables() {
        const variables = {
            '--root-bg': this.config.rootNodeBgColor,
            '--root-text': this.config.rootNodeTextColor,
            '--level1-bg': this.config.level1NodeBgColor,
            '--normal-bg': this.config.normalNodeBgColor,
            '--level1-text': this.config.level1NodeTextColor,
            '--normal-text': this.config.normalNodeTextColor,
            '--line-stroke': this.config.lineStroke,
        };

        Object.entries(variables).forEach(([key, value]) => {
            this.container.style.setProperty(key, value);
        });
    }

    init() {
        // 清理所有连接线
        this.lineInstance.clear();

        // 清理所有节点的连接线引用
        this.nodeMap.forEach(node => {
            node.parentLine = null;
            node.childLines = [];
            node.children = null;
        });

        this.rootNode = this.createNode(this.data, 0);
        this.rootNode.setPosition(this.centerX, this.centerY);
        this.nodeMap.forEach(node => {
            node.updateContent();
        });
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
        node.data = nodeData
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
        // 如果节点被收起，先展开它
        if (this.collapsedNodeIds.has(node.id)) {
            node.toggleExpand(true); // 强制展开节点
        }

        const newNode = {
            id: Math.random().toString(36).substring(2),
            topic: '新主题',
            direction: node.data.direction
        };

        node.data.children = node.data.children || [];
        node.data.children.push(newNode);

        // 如果是叶子节点添加子节点,需要添加展开按钮
        if (node.data.children.length === 1) {
            node.addExpandBtn();
        }

        // 添加历史记录
        this.historyInstance.add(structuredClone(this.data));

        this.init();
        this.nodeMap.get(newNode.id).select();
        this.eventInstance.handleNodeEdit({ stopPropagation: () => { } }, this.nodeMap.get(newNode.id));
    }

    addSibling(node) {
        if (node?.isRoot) return;

        const newNode = {
            id: Math.random().toString(36).substring(2),
            topic: '新主题',
            direction: node.data.direction
        };

        const siblings = node.parent.data.children;
        const index = siblings.indexOf(node.data);
        siblings.splice(index + 1, 0, newNode);

        // 添加历史记录
        this.historyInstance.add(structuredClone(this.data));

        this.init();
        this.nodeMap.get(newNode.id).select();
        this.eventInstance.handleNodeEdit({ stopPropagation: () => { } }, this.nodeMap.get(newNode.id));
    }
    removeNodeDOM(node) {
        // 删除节点元素
        node.el?.remove();
        // 删除与父节点的连接线
        if (node.parentLine) {
            node.parentLine.path.remove();
            const index = node.parent.childLines.indexOf(node.parentLine);
            if (index > -1) {
                node.parent.childLines.splice(index, 1);
            }
            node.parentLine = null;
        }

        // 递归删除子节点
        node.children?.forEach(child => {
            this.removeNodeDOM(child);
        });

        // 从节点映射中移除
        this.nodeMap.delete(node.id);
    };

    deleteNode(node) {
        if (!node || node.isRoot) return;

        // 递归删除所有子节点
        const deleteNodeAndChildren = (node) => {
            // 删除子节点
            if (node.children?.length) {
                node.children.forEach(child => {
                    deleteNodeAndChildren(child);
                });
            }
            
            // 从节点映射中移除
            this.nodeMap.delete(node.id);
            
            // 从 DOM 中移除节点元素
            node.el?.remove();
            
            // 删除与父节点的连接线
            if (node.parentLine) {
                node.parentLine.path.remove();
                const index = node.parent.childLines.indexOf(node.parentLine);
                if (index > -1) {
                    node.parent.childLines.splice(index, 1);
                }
                node.parentLine = null;
            }
        };

        // 从父节点的 children 数组中移除
        const siblings = node.parent.data.children;
        const index = siblings.indexOf(node.data);
        siblings.splice(index, 1);

        // 如果删除后父节点没有子节点了，删除父节点的 children 属性
        if (siblings.length === 0) {
            delete node.parent.data.children;
            // 移除父节点的展开按钮
            const expandBtn = node.parent.el.querySelector('.expand-btn');
            expandBtn?.remove();
        }

        // 递归删除节点及其所有子节点
        deleteNodeAndChildren(node);

        // 添加历史记录
        this.historyInstance.add(structuredClone(this.data));

        // 重新渲染并选中父节点
        this.init();
        node.parent.select();
    }

    toggleCollapseAll() {
        // 检查是否所有非根节点都已收起
        const isAllCollapsed = Array.from(this.nodeMap.values()).every(node => 
            node.isRoot || this.collapsedNodeIds.has(node.id)
        );

        // 获取所有非根节点
        const nonRootNodes = Array.from(this.nodeMap.values()).filter(node => !node.isRoot);

        if (isAllCollapsed) {
            // 如果所有节点都已收起，则展开所有节点
            nonRootNodes.forEach(node => {
                if (this.collapsedNodeIds.has(node.id)) {
                    this.collapsedNodeIds.delete(node.id);
                    node.el.classList.remove('is-collapsed');
                    // 显示子节点
                    node.toggleChildren(true);
                    // 更新展开按钮文本
                    const btn = node.el.querySelector('.expand-btn');
                    if (btn) {
                        btn.textContent = '-';
                    }
                }
            });
        } else {
            // 收起所有非根节点
            nonRootNodes.forEach(node => {
                if (!this.collapsedNodeIds.has(node.id)) {
                    this.collapsedNodeIds.add(node.id);
                    node.el.classList.add('is-collapsed');
                    // 隐藏子节点
                    node.toggleChildren(false);
                    // 更新展开按钮文本
                    const btn = node.el.querySelector('.expand-btn');
                    if (btn) {
                        btn.textContent = `+${node.getChildCount()}`;
                    }
                }
            });
        }

        // 刷新视图
        this.refresh();
    }
}

