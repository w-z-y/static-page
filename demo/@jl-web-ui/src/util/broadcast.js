const FIXED_EVENT_NAME = 'jl-custom-event-broadcast';

class JlBroadcast {
  constructor() {
    // _listeners: Map<type, Map<callback, Set<listener>>>
    this._listeners = new Map();
  }

  broadcast(type, payload) {
    window.dispatchEvent(new CustomEvent(FIXED_EVENT_NAME, { detail: { type, payload } }));
  }

  on(type, callback) {
    if (typeof callback !== 'function') return;
    // 包装回调，使其只在 type 匹配时调用
    const listener = (e) => {
      if (e.detail && e.detail.type === type) {
        callback(e.detail.payload);
      }
    };
    // 支持多个同type同callback的注册
    if (!this._listeners.has(type)) {
      this._listeners.set(type, new Map());
    }
    const cbMap = this._listeners.get(type);
    if (!cbMap.has(callback)) {
      cbMap.set(callback, new Set());
    }
    cbMap.get(callback).add(listener);
    window.addEventListener(FIXED_EVENT_NAME, listener);
  }

  off(type, callback) {
    const listenersOfType = this._listeners.get(type);
    if (listenersOfType && listenersOfType.has(callback)) {
      const listenersSet = listenersOfType.get(callback);
      // 支持去除所有该type+callback注册的监听
      listenersSet.forEach((listener) => {
        window.removeEventListener(FIXED_EVENT_NAME, listener);
      });
      listenersOfType.delete(callback);
      if (listenersOfType.size === 0) {
        this._listeners.delete(type);
      }
    }
  }
}

export default {
  install(Vue) {
    // 如果有，则共用一个实例
    if (window.$jlBroadcast) {
      Vue.prototype.$jlBroadcast = window.$jlBroadcast;
    } else {
      Vue.prototype.$jlBroadcast = window.$jlBroadcast = new JlBroadcast();
    }
  },
};

/* 
示例
this.$jlBroadcast.broadcast('open-chat-drawer', { aa: 1 })

this.$jlBroadcast.on('open-chat-drawer', this.fn1)
this.$jlBroadcast.on('open-chat-drawer', this.fn2)

this.$jlBroadcast.off('open-chat-drawer', this.fnfnfn)
this.$jlBroadcast.off('open-chat-drawer', this.fn2)

methods: {
  fn1(data) {
    console.log(data)
  },
  fn2(data) {
    console.log(data)
  }
}
*/
