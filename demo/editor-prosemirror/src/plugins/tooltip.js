import { Plugin } from "prosemirror-state";
import tippy from "tippy.js";

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
    const tip = tippy(this.tooltip, {
      content: '<button class="tippy-button">点击我</button>', // 包含可点击元素
      allowHTML: true, // 允许HTML内容
      interactive: true, // 启用交互模式
      interactiveBorder: 10, // 鼠标移出工具提示时的缓冲区域(像素)
      trigger: "click", // 推荐使用click触发
      onMount(instance) {
        // 阻止工具提示内部点击事件冒泡
        instance.popper.style.userSelect = "none";
      },
    });
    // 添加延迟显示功能
    this.timeout = null;
    this.isVisible = false;
    
    // 清除之前的延迟显示
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
    
    // 如果选中了文本，设置延迟显示
    if (!state.selection.empty) {
      this.timeout = setTimeout(() => {
        // 确保当前选择仍然有效
        if (!view.state.selection.empty) {
          tip.show();
          this.isVisible = true;
        }
      }, 100); // 500毫秒延迟，可以根据需要调整
    } else if (this.isVisible) {
      // 如果之前是可见的，现在选择为空，则隐藏
      tip.hide();
      this.isVisible = false;
    }
    
    // 添加销毁方法
    this.hideTip = () => {
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
      if (this.isVisible) {
        tip.hide();
        this.isVisible = false;
      }
    };
  }

  destroy() {
    this.tooltip.remove();
  }
}

export default function tooltipPlugin() {
  return new Plugin({
    view(editorView) {
      return new SelectionSizeTooltip(editorView);
    },
  });
}
