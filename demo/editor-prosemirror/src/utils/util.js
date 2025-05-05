// 选区空
export function isEmpty(view) {
  const { state } = view;
  const { selection } = state;
  const { empty } = selection;
  return empty;
}
// 换行符
export function isBr(view) {
  const { state } = view;
  const { doc, selection } = state;
  const { from, to } = selection;
  return to - from === 2 && doc.resolve(to).parent !== doc.resolve(from).parent;
}
