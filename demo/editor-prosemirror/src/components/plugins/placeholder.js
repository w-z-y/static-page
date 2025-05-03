import { Plugin } from "prosemirror-state";

class Placeholder {
  constructor(view, text) {
    this.text = text;
    this.update(view, null);
  }

  update(view, lastState) {
    let state = view.state;
    if (lastState && lastState.doc.eq(state.doc)) return;

    if (view.state.doc.textContent) {
      view.dom.removeAttribute("data-placeholder");
    } else {
      view.dom.setAttribute("data-placeholder", this.text);
    }
  }

  destroy() {
    // 清理工作（如果需要）
  }
}

export default function placeholder(text) {
  return new Plugin({
    view(editorView) {
      return new Placeholder(editorView, text);
    },
  });
}
