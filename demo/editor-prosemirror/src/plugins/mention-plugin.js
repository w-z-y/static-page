import { Plugin } from "prosemirror-state";
import { TextSelection } from "prosemirror-state";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

class MentionView {
  constructor(view) {
    this.view = view;
    this.popup = null;
    this.users = [
      { id: 1, name: "张三" },
      { id: 2, name: "李四" },
      { id: 3, name: "王五" },
      { id: 4, name: "赵六" },
    ];
  }

  update(view, lastState) {
    this.view = view;

    const { state } = view;
    const { selection } = state;
    const { $from, from } = selection;
    const coords = view.coordsAtPos(from)


    console.log("selection", coords,selection, from);
    // 检查光标前的文本是否包含 @
    const textBeforeCursor = $from.parent.textContent.slice(
      0,
      $from.parentOffset
    );
    const match = /@(\w*)$/.exec(textBeforeCursor);

    if (match) {
      // 如果找到 @，显示提示框
      this.showMentionPopup(match[1], coords);
    } else {
      // 否则关闭提示框
      this.hideMentionPopup();
    }

    return true;
  }

  showMentionPopup(query, coords) {
    // 过滤用户列表
    const filteredUsers = this.users.filter((user) =>
      user.name.toLowerCase().includes(query.toLowerCase())
    );

    if (!this.popup) {
      // 创建提示框容器
      const element = document.createElement("div");
      element.className = "mention-popup";

      // 使用 tippy 创建提示框
      this.popup = tippy(this.view.dom, {
        content: element,
        trigger: "manual",
        interactive: true,
        placement: "bottom-start",
        getReferenceClientRect: () => coords,
        theme: "light",
        arrow: true,
        appendTo: () => document.body,
      });
    }

    // 更新提示框内容
    const element = this.popup.popper.querySelector(".mention-popup");
    element.innerHTML = "";

    // 创建用户列表
    filteredUsers.forEach((user) => {
      const userElement = document.createElement("div");
      userElement.className = "mention-item";
      userElement.textContent = user.name;
      userElement.addEventListener("click", () => this.selectMention(user));
      element.appendChild(userElement);
    });

    // 显示提示框
    this.popup.show();
  }

  hideMentionPopup() {
    if (this.popup) {
      this.popup.hide();
    }
  }

  selectMention(user) {
    const { state, dispatch } = this.view;
    const { selection } = state;
    const { $from } = selection;

    // 查找 @ 符号的位置
    const textBeforeCursor = $from.parent.textContent.slice(
      0,
      $from.parentOffset
    );
    const atPos = textBeforeCursor.lastIndexOf("@");
    if (atPos === -1) return;

    // 计算 @ 符号在文档中的绝对位置
    const start = $from.start() + atPos;
    const end = $from.pos;

    // 创建 mention 节点
    const mentionNode = state.schema.nodes.mention.create({
      id: user.id,
      name: user.name,
    });
    console.log("mentionNode", mentionNode);
    // 替换 @ 及其后面的文本为 mention 节点
    const tr = state.tr.replaceWith(start, end, mentionNode);

    // 将光标移动到 mention 节点后面
    const newPos = start + 1;
    tr.setSelection(TextSelection.create(tr.doc, newPos));

    dispatch(tr);
    this.hideMentionPopup();
    this.view.focus();
  }

  destroy() {
    if (this.popup) {
      this.popup.destroy();
      this.popup = null;
    }
  }
}

export default function mentionPlugin() {
  return new Plugin({
    view(editorView) {
      return new MentionView(editorView);
    },
    props: {
      handleKeyDown(view, event) {
        // 可以在这里处理键盘导航
        return false;
      },
    },
  });
}
