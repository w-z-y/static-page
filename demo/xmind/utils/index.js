// 配置合并方法
export function mergeConfig(defaultConfig, customConfig) {
    return Object.entries(defaultConfig).reduce((acc, [key, defaultValue]) => {
        acc[key] = { ...defaultValue, ...(customConfig[key] || {}) };
        return acc;
    }, {});
}

// 获取连接线路径
export function getLinePath(startX, startY, endX, endY, isLeft, cornerRadius) {
    const midX = startX + (isLeft ? -1 : 1) * Math.abs(endX - startX) / 2;
    let d = `M ${startX} ${startY}`;

    if (startY !== endY) {
        d += ` L ${midX} ${startY}`;

        if (endY > startY) {
            d += ` L ${midX} ${endY - cornerRadius}`;
            d += ` Q ${midX} ${endY} ${midX + (isLeft ? -cornerRadius : cornerRadius)} ${endY}`;
        } else {
            d += ` L ${midX} ${endY + cornerRadius}`;
            d += ` Q ${midX} ${endY} ${midX + (isLeft ? -cornerRadius : cornerRadius)} ${endY}`;
        }
    }

    d += ` L ${endX} ${endY}`;
    return d;
}

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