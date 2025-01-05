const config = {
  maxDepth: 4,
  maxLeftChildren: 2,
  maxRightChildren: 3,
};

const randomDepth = Math.ceil(Math.random() * config.maxDepth);
const randomLeftChildren = Math.ceil(Math.random() * config.maxLeftChildren);
const randomRightChildren = Math.ceil(Math.random() * config.maxRightChildren);

function generateRandomId() {
  return Math.random().toString(36).substring(2, 10);
}

function generateRandomTopic() {
  const topics = [
    "主题",
    "Let's speak English together, Let's speak English together, Let's speak English together",
    "让我们一起说中文",
    "这是一个很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的主题",
    "包含<特殊>字符&的#主题",
    "包含\n换行\n符的主题",
    "包含    多个空格    的主题",
    "包含emoji的主题🎉🌟⭐️",
    "包含数字123和符号!@#的主题",
    "包含中英文混合的Topic主题",
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "包含标点符号的主题：；，。！？",
    "单个字",
    "A",
  ];
  return topics[Math.floor(Math.random() * topics.length)];
}

function generateNode(depth = 0, direction) {
  const node = {
    id: generateRandomId(),
    topic: generateRandomTopic(),
    direction,
  };

  if (depth < randomDepth) {
    const childCount = Math.floor(Math.random() * 4) + 1;
    node.children = [];
    for (let i = 0; i < childCount; i++) {
      node.children.push(generateNode(depth + 1, direction));
    }
  }

  return node;
}

function generateFreeNode() {
  return {
    id: generateRandomId(),
    topic: generateRandomTopic(),
    direction: "free",
    x: Math.random() * 800 - 400, // 随机位置 -400 到 400
    y: Math.random() * 600 - 300, // 随机位置 -300 到 300
  };
}

const mindmapData = {
  id: generateRandomId(),
  topic: "中心主题",
  children: [],
};

// 生成左侧节点
for (let i = 0; i < randomLeftChildren; i++) {
  mindmapData.children.push(generateNode(0, "left"));
}

// 生成右侧节点
for (let i = 0; i < randomRightChildren; i++) {
  mindmapData.children.push(generateNode(0, "right"));
}

// 添加一个自由主题
mindmapData.children.push(generateFreeNode());

export default mindmapData;

// export default {
//   id: "0",
//   topic: "中心主题",
//   children: [
//     {
//       id: "1",
//       topic:
//         "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
//       direction: "right",
//       children: [
//         {
//           id: "2",
//           topic: "主题2",
//           direction: "right",
//           children: [
//             {
//               id: "3",
//               topic: "主题3",
//             },
//           ],
//         },
//       ],
//     },
//     {
//       id: "4",
//       topic:
//         "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
//       direction: "right",
//       children: [
//         { id: "5", topic: "包含<特殊>字符&的#主题", direction: "right" },
//       ],
//     },
//     {
//       id: "6",
//       topic: "a",
//       direction: "right",
//       children: [
//         { id: "7", topic: "包含<特殊>字符&的#主题", direction: "right" },
//       ],
//     },
//   ],
// };
