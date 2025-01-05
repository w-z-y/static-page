import { openBlock as r, createElementBlock as c, normalizeClass as P, renderSlot as z, ref as A, computed as d, createElementVNode as p, createVNode as E, withCtx as I, createTextVNode as w, toDisplayString as D, createBlock as V, createCommentVNode as k, Fragment as T, renderList as B, onMounted as G, onUnmounted as J, unref as R, normalizeStyle as q, useSlots as K } from "vue";
const Q = (t) => {
  const n = new Date(t);
  return new Date(n.getTime() - n.getTimezoneOffset() * 6e4).toISOString().split("T")[0];
}, L = (t, n) => {
  const a = t.__vccOpts || t;
  for (const [s, i] of n)
    a[s] = i;
  return a;
}, Z = ["disabled"], ee = {
  __name: "index",
  props: {
    type: {
      type: String,
      default: "default",
      validator: (t) => ["default", "primary", "success", "warning", "danger", "dark"].includes(t)
    },
    plain: {
      type: Boolean,
      default: !1
    },
    round: {
      type: Boolean,
      default: !1
    },
    circle: {
      type: Boolean,
      default: !1
    },
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["click"],
  setup(t, { emit: n }) {
    const a = n, s = (i) => {
      a("click", i);
    };
    return (i, v) => (r(), c("button", {
      class: P(["btn", [
        `btn-${t.type}`,
        {
          "is-plain": t.plain,
          "is-round": t.round,
          "is-circle": t.circle,
          "is-disabled": t.disabled
        }
      ]]),
      disabled: t.disabled,
      onClick: s
    }, [
      z(i.$slots, "default", {}, void 0, !0)
    ], 10, Z));
  }
}, O = /* @__PURE__ */ L(ee, [["__scopeId", "data-v-59f58d3a"]]), te = ["data-view"], ne = { class: "calendar-header" }, ae = ["data-month"], le = { class: "weekdays" }, se = {
  key: 0,
  class: "today-button"
}, oe = { class: "weeks" }, re = {
  key: 0,
  class: "day-header"
}, ue = {
  key: 0,
  class: "today-button"
}, ce = { class: "day-body" }, ie = {
  __name: "index",
  props: {
    date: {
      type: Date,
      default: () => /* @__PURE__ */ new Date()
    },
    weekStartsOnSunday: {
      type: Boolean,
      default: !0
    }
  },
  setup(t) {
    Date.prototype.getISODate = function() {
      return Q(this);
    };
    const n = t, a = A(n.date || /* @__PURE__ */ new Date()), s = A("month"), i = (e, l) => Math.floor((l - e) / (24 * 60 * 60 * 1e3)), v = (e) => !n.weekStartsOnSunday && e === 0 ? 6 : n.weekStartsOnSunday ? e : e - 1, _ = d(() => {
      const e = n.weekStartsOnSunday ? ["日", "一", "二", "三", "四", "五", "六"] : ["一", "二", "三", "四", "五", "六", "日"];
      return s.value === "week" ? $.value[0].map((l) => `${l.getDate()}日 (${e[l.getDay()]})`) : e;
    }), b = d(() => {
      const { value: e } = a;
      return `${e.getFullYear()}年${e.getMonth() + 1}月`;
    }), m = d(() => {
      const { value: e } = a, l = new Date(e.getFullYear(), 0, 1), o = i(l, e);
      return Math.ceil((o + l.getDay() + 1) / 7);
    }), S = d(() => {
      const e = /* @__PURE__ */ new Date(), { value: l } = a;
      if (s.value === "month")
        return e.getFullYear() === l.getFullYear() && e.getMonth() === l.getMonth();
      const o = new Date(e.getFullYear(), 0, 1), g = Math.ceil((e - o) / (7 * 24 * 60 * 60 * 1e3)), C = Math.ceil((l - o) / (7 * 24 * 60 * 60 * 1e3));
      return e.getFullYear() === l.getFullYear() && g === C;
    }), Y = d(() => a.value.getMonth() + 1), x = (e) => {
      const l = /* @__PURE__ */ new Date();
      return e.getFullYear() === l.getFullYear() && e.getMonth() === l.getMonth() && e.getDate() === l.getDate();
    }, F = () => {
      const { value: e } = a, l = e.getFullYear(), o = e.getMonth(), g = new Date(l, o, 1), C = new Date(l, o + 1, 0), N = [], H = v(g.getDay());
      for (let h = 0; h < H; h++)
        N.unshift(new Date(l, o, -h));
      for (let h = 1; h <= C.getDate(); h++)
        N.push(new Date(l, o, h));
      const X = 42 - N.length;
      for (let h = 1; h <= X; h++)
        N.push(new Date(l, o + 1, h));
      return N;
    }, W = () => {
      const { value: e } = a, l = v(e.getDay());
      return Array.from({ length: 7 }, (o, g) => {
        const C = new Date(e);
        return C.setDate(e.getDate() - l + g), C;
      });
    }, $ = d(() => {
      const e = s.value === "month" ? F() : W();
      return s.value === "month" ? Array.from(
        { length: e.length / 7 },
        (l, o) => e.slice(o * 7, (o + 1) * 7)
      ) : [e];
    }), f = (e, l) => {
      const o = new Date(a.value);
      l === "month" ? o.setMonth(o.getMonth() + e) : o.setDate(o.getDate() + e * 7), a.value = o;
    }, M = () => f(-1, s.value === "month" ? "month" : "week"), u = () => f(1, s.value === "month" ? "month" : "week"), y = () => a.value = /* @__PURE__ */ new Date(), j = () => s.value = s.value === "month" ? "week" : "month";
    return (e, l) => (r(), c("div", {
      class: "calendar",
      "data-view": s.value
    }, [
      p("div", ne, [
        E(O, { onClick: M }, {
          default: I(() => l[0] || (l[0] = [
            w("<")
          ])),
          _: 1
        }),
        p("span", null, D(b.value) + D(s.value === "week" ? " 第" + m.value + "周" : ""), 1),
        E(O, { onClick: u }, {
          default: I(() => l[1] || (l[1] = [
            w(">")
          ])),
          _: 1
        }),
        S.value ? k("", !0) : (r(), V(O, {
          key: 0,
          onClick: y
        }, {
          default: I(() => l[2] || (l[2] = [
            w("今天")
          ])),
          _: 1
        })),
        E(O, { onClick: j }, {
          default: I(() => [
            w(D(s.value === "month" ? "周视图" : "月视图"), 1)
          ]),
          _: 1
        })
      ]),
      p("div", {
        class: "calendar-body",
        "data-month": Y.value
      }, [
        p("div", le, [
          (r(!0), c(T, null, B(_.value, (o) => (r(), c("span", null, [
            w(D(o) + " ", 1),
            s.value === "week" && x($.value[0][_.value.indexOf(o)]) ? (r(), c("button", se, "今")) : k("", !0)
          ]))), 256))
        ]),
        (r(!0), c(T, null, B($.value, (o) => (r(), c("div", oe, [
          (r(!0), c(T, null, B(o, (g) => (r(), c("div", {
            class: P(["day", { "is-today": x(g) }])
          }, [
            s.value === "month" ? (r(), c("div", re, [
              p("span", null, D(g.getDate()), 1),
              x(g) ? (r(), c("button", ue, "今")) : k("", !0)
            ])) : k("", !0),
            p("div", ce, [
              z(e.$slots, "default", { date: g }, void 0, !0)
            ])
          ], 2))), 256))
        ]))), 256))
      ], 8, ae)
    ], 8, te));
  }
}, me = /* @__PURE__ */ L(ie, [["__scopeId", "data-v-c8b5edac"]]);
function de({ vertical: t, onNext: n, onPrev: a }) {
  if (!t) return {};
  const s = A(0), i = 200, v = 10;
  return {
    handleWheel: (b) => {
      b.preventDefault();
      const m = Date.now();
      if (m - s.value < i)
        return;
      s.value = m;
      const S = b.deltaY;
      Math.abs(S) < v || (S > 0 ? n() : a());
    }
  };
}
const ve = { class: "carousel-item-content" }, fe = {
  key: 2,
  class: "dots-container"
}, ye = ["onClick"], U = 500, he = {
  __name: "index",
  props: {
    items: {
      type: Array,
      required: !0,
      default: () => [],
      validator: (t) => t.length > 0
    },
    autoPlay: {
      type: Boolean,
      default: !1
    },
    autoPlayDelay: {
      type: Number,
      default: 3e3,
      validator: (t) => t >= 1e3
    },
    vertical: {
      type: Boolean,
      default: !1
    },
    controls: {
      type: Array,
      default: () => [],
      validator: (t) => t.every((n) => ["arrows", "dots"].includes(n))
    }
  },
  setup(t) {
    const n = t, a = A(0), s = A(!1);
    let i = null;
    const v = d(() => {
      if (!n.items.length) return [];
      const f = n.items[n.items.length - 1], M = n.items[0];
      return [f, ...n.items, M].map((u, y) => (typeof u == "object" && (y === 0 ? u.index = n.items.length - 1 : y === n.items.length - 1 ? u.index = 0 : u.index = y - 1), u));
    }), _ = d(() => a.value === -1 ? n.items.length - 1 : a.value === n.items.length ? 0 : a.value), b = d(() => ({
      transform: n.vertical ? `translateY(-${100 * (a.value + 1)}%)` : `translateX(-${100 * (a.value + 1)}%)`,
      transition: s.value ? `transform ${U}ms ease` : "none"
    })), m = (f = null) => {
      setTimeout(() => {
        s.value = !1, f !== null && (a.value = f);
      }, U);
    }, S = (f) => {
      s.value || f === a.value || (s.value = !0, a.value = f, m());
    }, Y = () => {
      s.value || (s.value = !0, a.value++, m(a.value === n.items.length ? 0 : null));
    }, x = () => {
      s.value || (s.value = !0, a.value--, m(a.value === -1 ? n.items.length - 1 : null));
    }, F = () => {
      W(), n.autoPlay && n.items.length > 1 && (i = setInterval(Y, n.autoPlayDelay));
    }, W = () => {
      i && (clearInterval(i), i = null);
    }, { handleWheel: $ } = de({
      vertical: n.vertical,
      onNext: Y,
      onPrev: x
    });
    return G(() => {
      n.autoPlay && n.items.length > 1 && F();
    }), J(() => {
      W();
    }), (f, M) => (r(), c("div", {
      class: P(["carousel-container", { vertical: t.vertical }]),
      onMouseenter: W,
      onMouseleave: F,
      onWheel: M[0] || (M[0] = (...u) => R($) && R($)(...u))
    }, [
      p("div", {
        class: "carousel-wrapper",
        style: q(b.value)
      }, [
        (r(!0), c(T, null, B(v.value, (u, y) => (r(), c("div", {
          class: "carousel-item",
          key: `slide-${y}`
        }, [
          z(f.$slots, "default", {
            item: u,
            index: u == null ? void 0 : u.index
          }, () => [
            p("div", ve, D((u == null ? void 0 : u.index) || u), 1)
          ], !0)
        ]))), 128))
      ], 4),
      t.controls.includes("arrows") ? (r(), V(O, {
        key: 0,
        type: "dark",
        round: "",
        class: "carousel-btn prev-btn",
        onClick: x
      }, {
        default: I(() => [
          w(D(t.vertical ? "↑" : "←"), 1)
        ]),
        _: 1
      })) : k("", !0),
      t.controls.includes("arrows") ? (r(), V(O, {
        key: 1,
        type: "dark",
        round: "",
        class: "carousel-btn next-btn",
        onClick: Y
      }, {
        default: I(() => [
          w(D(t.vertical ? "↓" : "→"), 1)
        ]),
        _: 1
      })) : k("", !0),
      t.controls.includes("dots") ? (r(), c("div", fe, [
        (r(!0), c(T, null, B(t.items, (u, y) => (r(), c("div", {
          key: `dot-${y}`,
          class: P(["dot", { active: _.value === y }]),
          onClick: (j) => S(y)
        }, null, 10, ye))), 128))
      ])) : k("", !0)
    ], 34));
  }
}, pe = /* @__PURE__ */ L(he, [["__scopeId", "data-v-6556c78e"]]), De = {
  __name: "index",
  props: {
    // 间距大小
    size: {
      type: [Number, String],
      default: "small"
    },
    // 排列方向
    direction: {
      type: String,
      default: "horizontal",
      validator: (t) => ["horizontal", "vertical"].includes(t)
    },
    // 对齐方式
    alignment: {
      type: String,
      default: "center",
      validator: (t) => ["start", "end", "center", "baseline"].includes(t)
    },
    // 是否自动换行
    wrap: {
      type: Boolean,
      default: !1
    }
  },
  setup(t) {
    const n = K(), a = t, s = d(() => {
      const v = {
        small: "8px",
        medium: "16px",
        large: "24px"
      };
      return typeof a.size == "number" ? `${a.size}px` : v[a.size] || v.small;
    }), i = d(() => ({
      display: "flex",
      flexDirection: a.direction === "vertical" ? "column" : "row",
      flexWrap: a.wrap ? "wrap" : "nowrap",
      alignItems: a.alignment,
      gap: s.value
    }));
    return d(() => ({
      flex: "0 0 auto"
    })), d(() => Object.keys(n).length || 1), (v, _) => (r(), c("div", {
      class: "space",
      style: q(i.value)
    }, [
      z(v.$slots, "default")
    ], 4));
  }
};
export {
  O as Button,
  me as Calendar,
  De as Space,
  pe as Swiper
};
