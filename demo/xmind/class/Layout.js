import { groupNodes } from "../utils/index.js";
export default class Layout {
  constructor(mindmap) {
    this.mindmap = mindmap;
    this.config = mindmap.config;
  }

  calculateNodeHeight(node) {
    const { verticalGap } = this.config;

    if (!node.children?.length || this.mindmap.collapsedNodeIds.has(node.id)) {
      return (node.totalHeight = node.height + verticalGap);
    }
    const childrenHeight = node.children.reduce(
      (sum, child) => sum + child.calculateHeight(),
      0
    );
    return (node.totalHeight = Math.max(
      node.height + verticalGap,
      childrenHeight
    ));
  }

  layoutChildren(node, level) {
    if (!node.data.children?.length) return;
    const [leftNodes, rightNodes] = groupNodes(node, level);
    const layoutGroup = (nodes, isLeft) => {
      if (!nodes.length) return;
      const totalHeight = nodes.reduce(
        (sum, child) => sum + child.calculateHeight(),
        0
      );
      const { horizontalGap } = this.config;
      const baseX =
        node.x + (isLeft ? -horizontalGap : node.width + horizontalGap);
      let currentY = node.y + node.height / 2 - totalHeight / 2;
      nodes.forEach((childNode) => {
        const direction = isLeft ? "left" : "right";
        childNode.el.dataset.direction = childNode.data.direction = direction;
        childNode.setPosition(
          isLeft ? baseX - childNode.width : baseX,
          currentY + childNode.totalHeight / 2 - childNode.height / 2
        );
        if (!this.mindmap.collapsedNodeIds.has(node.id)) {
          this.mindmap.lineInstance.connect(node, childNode);
        }
        this.layoutChildren(childNode, level + 1);
        currentY += childNode.totalHeight;
      });
    };

    layoutGroup(leftNodes, true);
    layoutGroup(rightNodes, false);
  }
}
