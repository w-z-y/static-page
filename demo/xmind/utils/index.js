// 分组节点
export function groupNodes(node, level) {
    const [leftNodes, rightNodes] = [[], []];
    node.children?.forEach(childNode => {
        const isLeft = level === 0 ? childNode.data.direction === 'left' : node.data.direction === 'left';
        (isLeft ? leftNodes : rightNodes).push(childNode);
    });
    return [leftNodes, rightNodes];
}

// 判断是否为移动端设备
export function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}