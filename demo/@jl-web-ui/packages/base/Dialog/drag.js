const getViewportSize = () => {
  const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  return { width, height };
};

const draggable = {
  bind(el, binding) {
    const { containment = false } = binding.value || {};

    const dialog = el.querySelector('.el-dialog');
    const header = el.querySelector('.el-dialog__header');

    if (!dialog || !header) return;

    // 设置拖拽样式
    header.style.cursor = 'move';
    header.style.userSelect = 'none';
    header.style['-ms-user-select'] = 'none';
    header.style['-moz-user-select'] = 'none';

    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let initialLeft = 0;
    let initialTop = 0;

    // 将 handleMouseDown 挂载到 el 上，便于unbind时移除
    const handleMouseMove = (e) => {
      if (!isDragging) return;

      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      let newLeft = initialLeft + deltaX;
      let newTop = initialTop + deltaY;

      if (containment) {
        const viewport = getViewportSize();
        const dialogRect = dialog.getBoundingClientRect();

        // 限制在视口范围内
        newLeft = Math.max(0, Math.min(newLeft, viewport.width - dialogRect.width));
        newTop = Math.max(0, Math.min(newTop, viewport.height - dialogRect.height));
      }

      dialog.style.margin = '0';
      dialog.style.left = `${newLeft}px`;
      dialog.style.top = `${newTop}px`;
    };

    const handleMouseUp = () => {
      isDragging = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    const handleMouseDown = (e) => {
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;

      const rect = dialog.getBoundingClientRect();
      initialLeft = rect.left;
      initialTop = rect.top;

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    // 保存 handleMouseDown 到 el 上，方便解绑时使用
    el._dialogHandleMouseDown = handleMouseDown;

    header.addEventListener('mousedown', handleMouseDown);
  },

  unbind(el) {
    // 清理事件监听器
    const header = el.querySelector('.el-dialog__header');
    if (header && el._dialogHandleMouseDown) {
      header.removeEventListener('mousedown', el._dialogHandleMouseDown);
      delete el._dialogHandleMouseDown;
    }
  },
};

export default draggable;
