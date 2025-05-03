import { Plugin } from "prosemirror-state";
class SelectionSizeTooltip {
  constructor(view) {
    this.tooltip = document.createElement("div");
    this.tooltip.className = "tooltip";
    view.dom.parentNode.appendChild(this.tooltip);

    this.update(view, null);
  }

  update(view, lastState) {
    let state = view.state;
    if (
      lastState &&
      lastState.doc.eq(state.doc) &&
      lastState.selection.eq(state.selection)
    )
      return;

    if (state.selection.empty) {
      this.tooltip.style.display = "none";
      return;
    }

    this.tooltip.style.display = "";
    let { from, to } = state.selection;
    let start = view.coordsAtPos(from),
      end = view.coordsAtPos(to);
    let box = this.tooltip.offsetParent.getBoundingClientRect();
    let left = Math.max((start.left + end.left) / 2, start.left + 3);
    this.tooltip.style.left = left - box.left + "px";
    this.tooltip.style.bottom = box.bottom - start.top + "px";
    this.tooltip.textContent = to - from;
  }

  destroy() {
    this.tooltip.remove();
  }
}

export default function selectionSizePlugin() {
  return new Plugin({
    view(editorView) {
      return new SelectionSizeTooltip(editorView);
    },
  });
}
