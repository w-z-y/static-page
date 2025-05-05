import FloatingMenu from "../components/FloatingMenu.vue";
import { isEmpty, isBr } from "../utils/util";
import { posToDOMRect } from "../utils/posToDOMRect";

import { Plugin } from "prosemirror-state";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import Vue from "vue";

class FloatingMenuView {
  constructor({ view, element }) {
    this.view = view;
    this.element = element;
    // 创建 Vue 组件实例
    const ComponentClass = Vue.extend(FloatingMenu);
    this.floatingMenuInstance = new ComponentClass({
      propsData: { editorView: view },
    });
    this.floatingMenuEl = this.floatingMenuInstance.$mount().$el;

    this.tippyOption = {
      duration: 0,
      getReferenceClientRect: null,
      content: this.floatingMenuEl,
      interactive: true,
      trigger: "manual",
      placement: "right",
      arrow: false,
    };
    // 创建 Tippy 实例
    this.creteTooltip();
  }
  creteTooltip() {
    this.tippy = tippy(this.element, this.tippyOption);
  }
  update(view, oldState) {
    if (isEmpty(view) || isBr(view)) {
      this.hide();
      return;
    }
    const { state } = view;
    const { selection } = state;
    const { from, to } = selection;

    const rect = posToDOMRect(view, from, to);
    // 更新 Tippy 位置并显示
    this.tippy.setProps({
      getReferenceClientRect: () => rect,
      placement: this.getBestPlacement(rect),
    });

    this.show();
  }
  show() {
    this.tippy.show();
  }
  hide() {
    this.tippy.hide();
  }
  destroy() {
    this.tippy.destroy();
    this.floatingMenuInstance.$destroy();
  }
  getBestPlacement(coords) {
    const viewportHeight = window.innerHeight;
    const spaceAbove = coords.top;
    const spaceBelow = viewportHeight - coords.bottom;

    return spaceBelow > spaceAbove ? "top" : "bottom";
  }
}

export default function createFloatingToolbarPlugin(options) {
  return new Plugin({
    view(view) {
      return new FloatingMenuView({ view, ...options });
    },
  });
}
