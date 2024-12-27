function generateRandomId() {
  return Math.random().toString(36).substring(2, 10);
}

function generateRandomTopic() {
  const topics = ['主题',
    'Let\'s speak English together',
    '让我们一起说中文',
    '这是一个很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的主题',
    '包含<特殊>字符&的#主题',
    '包含\n换行\n符的主题',
    '包含    多个空格    的主题',
    '包含emoji的主题🎉🌟⭐️',
    '包含数字123和符号!@#的主题',
    '包含中英文混合的Topic主题',
    '包含标点符号的主题：；，。！？',
    '单个字',
    'A'
  ];
  return topics[Math.floor(Math.random() * topics.length)]
}

function generateNode(depth = 0, direction) {
  const node = {
    id: generateRandomId(),
    topic: generateRandomTopic(),
    direction
  };

  if (depth < 2) {
    const childCount = Math.floor(Math.random() * 4) + 1;
    node.children = [];
    for (let i = 0; i < childCount; i++) {
      node.children.push(generateNode(depth + 1, direction));
    }
  }

  return node;
}

const mindmapData = {
  id: generateRandomId(),
  topic: '中心主题',
  children: []
};

// 生成左侧节点
for (let i = 0; i < 2; i++) {
  mindmapData.children.push(generateNode(0, 'left'));
}

// 生成右侧节点
for (let i = 0; i < 2; i++) {
  mindmapData.children.push(generateNode(0, 'right'));
}

export default mindmapData;
