import { Plugin } from "prosemirror-state";

export default {
  inline: true,
  group: "inline",
  attrs: {
    id: { default: null }, // 用户ID
    name: { default: "" }, // 用户名
  },
  toDOM: (node) => [
    "span",
    { class: "mention", "data-user-id": node.attrs.id },
    `@${node.attrs.name}`,
  ],
  parseDOM: [
    {
      tag: "span.mention",
      getAttrs: (dom) => {
        return {
          id: dom.getAttribute("data-user-id"),
          name: dom.textContent.slice(1), // 去掉 @ 符号
        };
      },
    },
  ],
};

export function mentionRule(schema) {
  const regex = /^@\w*/; // 匹配 @ 开头的文本
  return new Plugin({
    props: {
      handleTextInput(view, from, to, text) {
        if (regex.test(text)) {
          // 打开用户选择菜单
          openUserMenu(view);
          return true;
        }
        return false;
      },
    },
  });
}

function openUserMenu(view) {
  // 模拟用户列表
  const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ];

  // 创建菜单
  const menu = document.createElement("div");
  menu.style.position = "absolute";
  menu.style.backgroundColor = "white";
  menu.style.border = "1px solid #ccc";
  menu.style.borderRadius = "4px";
  menu.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.15)";
  menu.style.padding = "8px 0";
  menu.style.zIndex = "1000";

  let selectedIndex = -1;
  const menuItems = [];

  users.forEach((user, index) => {
    const item = document.createElement("div");
    item.textContent = user.name;
    item.style.cursor = "pointer";
    item.style.padding = "6px 8px";
    item.style.borderRadius = "3px";
    item.style.transition = "background-color 0.2s";

    // 悬浮高亮效果
    item.onmouseover = () => {
      resetHighlight();
      item.style.backgroundColor = "#f0f0f0";
      selectedIndex = index;
    };

    item.onmouseout = () => {
      item.style.backgroundColor = "";
    };

    item.onclick = () => {
      insertMention(user);
    };

    menuItems.push(item);
    menu.appendChild(item);
  });

  // 将菜单添加到页面
  document.body.appendChild(menu);

  // 定位菜单
  const coords = view.coordsAtPos(view.state.selection.from);
  menu.style.top = `${coords.bottom + window.scrollY}px`;
  menu.style.left = `${coords.left + window.scrollX}px`;

  // 键盘导航
  document.addEventListener("keydown", handleKeyDown);

  // 点击其他区域关闭菜单
  document.addEventListener("click", handleClickOutside);

  function resetHighlight() {
    menuItems.forEach((item) => {
      item.style.backgroundColor = "";
    });
  }

  function highlightItem(index) {
    resetHighlight();
    if (index >= 0 && index < menuItems.length) {
      menuItems[index].style.backgroundColor = "#f0f0f0";
      selectedIndex = index;
    }
  }

  function insertMention(user) {
    // 插入提及节点
    const mentionNode = view.state.schema.nodes.mention.create({
      id: user.id,
      name: user.name,
    });
    const transaction = view.state.tr
      .replaceSelectionWith(mentionNode)
      .scrollIntoView();
    view.dispatch(transaction);
    closeMenu();
    view.focus();
  }

  function handleKeyDown(e) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        highlightItem((selectedIndex + 1) % users.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        highlightItem(
          selectedIndex <= 0 ? users.length - 1 : selectedIndex - 1
        );
        break;
      case "Enter":
        if (selectedIndex >= 0) {
          e.preventDefault();
          insertMention(users[selectedIndex]);
        }
        break;
      case "Escape":
        e.preventDefault();
        closeMenu();
        break;
    }
  }

  function handleClickOutside(e) {
    if (!menu.contains(e.target)) {
      closeMenu();
    }
  }

  function closeMenu() {
    menu.remove();
    document.removeEventListener("keydown", handleKeyDown);
    document.removeEventListener("click", handleClickOutside);
  }
}
