export function posToDOMRect(view, from, to) {
  const { state } = view;
  const { doc, selection } = state;

  const isSelectAll = from === 0 && to === doc.content.size; // 全选

  let start = view.coordsAtPos(isSelectAll ? from + 1 : from);
  let end = view.coordsAtPos(isSelectAll ? to - 1 : to);

  return {
    top: Math.min(start.top, end.top),
    bottom: Math.max(start.bottom, end.bottom),
    left: (start.left + end.left) / 2,
    right: (start.right + end.right) / 2,
    width: 0,
    height: end.bottom - start.top,
  };
}
