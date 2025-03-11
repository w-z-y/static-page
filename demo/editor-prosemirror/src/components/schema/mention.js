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
    const regex = /@(\w+)$/; // 匹配 @ 开头的文本
    return new Plugin({
        props: {
            handleTextInput(view, from, to, text) {
                if (text === "@") {
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
    menu.style.padding = "8px";
    menu.style.zIndex = "1000";

    users.forEach((user) => {
        const item = document.createElement("div");
        item.textContent = user.name;
        item.style.cursor = "pointer";
        item.style.padding = "4px";
        item.onclick = () => {
            // 插入提及节点
            const mentionNode = view.state.schema.nodes.mention.create({
                id: user.id,
                name: user.name,
            });
            const transaction = view.state.tr.replaceSelectionWith(mentionNode).scrollIntoView();
            view.dispatch(transaction);
            menu.remove();
        };
        menu.appendChild(item);
    });

    // 将菜单添加到页面
    document.body.appendChild(menu);

    // 定位菜单
    const coords = view.coordsAtPos(view.state.selection.from);
    menu.style.top = `${coords.bottom + window.scrollY}px`;
    menu.style.left = `${coords.left + window.scrollX}px`;
}
