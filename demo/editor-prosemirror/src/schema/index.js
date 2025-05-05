import { Schema } from "prosemirror-model";
import mention from "./mention";

export const schema = new Schema({
  nodes: {
    doc: {
      content: "block+",
    },
    paragraph: {
      content: "inline*",
      group: "block",
      attrs: {
        align: { default: "left" },
      },
      parseDOM: [
        {
          tag: "p",
        },
      ],
      toDOM() {
        return ["p", 0];
      },
    },
    text: {
      group: "inline",
    },
    image: {
      inline: true,
      attrs: {
        src: {},
        alt: { default: null },
        title: { default: null },
        width: { default: null },
        height: { default: null },
      },
      group: "inline",
      draggable: true,
      parseDOM: [
        {
          tag: "img[src]",
          getAttrs(dom) {
            console.log("dom", dom.getAttribute("width"));
            if (typeof dom === "string") {
              return false;
            }
            return {
              src: dom.getAttribute("src"),
              alt: dom.getAttribute("alt"),
              title: dom.getAttribute("title"),
              width: dom.getAttribute("width"),
              height: dom.getAttribute("height"),
            };
          },
        },
      ],
      toDOM(node) {
        const { src, alt, title, width, height } = node.attrs;
        return ["img", { src, alt, title, width, height }];
      },
    },
    mention: {
      inline: true,
      group: "inline",
      attrs: {
        id: { default: null }, // 用户ID
        name: { default: "" }, // 用户名
      },
      toDOM: (node) => [
        "span",
        { class: "mention", "data-user-id": node.attrs.id },
        `@${node.attrs.name}`,
      ],
      parseDOM: [
        {
          tag: "span.mention",
          getAttrs: (dom) => {
            return {
              id: dom.getAttribute("data-user-id"),
              name: dom.textContent.slice(1), // 去掉 @ 符号
            };
          },
        },
      ],
    },
  },
  marks: {
    em: {
      parseDOM: [{ tag: "i" }, { tag: "em" }, { style: "font-style=italic" }],
      toDOM() {
        return ["em", 0];
      },
    },
    strong: {
      parseDOM: [
        { tag: "strong" },
        {
          tag: "b",
          getAttrs: (node) =>
            typeof node !== "string" &&
            node.style.fontWeight !== "normal" &&
            null,
        },
        {
          style: "font-weight",
          getAttrs: (value) =>
            typeof value === "string" &&
            /^(bold(er)?|[5-9]\d{2,})$/.test(value) &&
            null,
        },
      ],
      toDOM() {
        return ["strong", 0];
      },
    },
    underline: {
      parseDOM: [{ tag: "u" }],
      toDOM() {
        return ["u", 0];
      },
    },

    // color: {
    //   attrs: {
    //     color: {},
    //   },
    //   parseDOM: [
    //     {
    //       tag: "span",
    //       getAttrs: (dom) => {
    //         if (typeof dom === "string") {
    //           return false;
    //         }
    //         const { color } = dom.style;
    //         if (!color) {
    //           return false;
    //         }
    //         return {
    //           color,
    //         };
    //       },
    //     },
    //   ],
    //   toDOM(mark) {
    //     const { color } = mark.attrs;
    //     return ["span", { style: `color: ${color}` }, 0];
    //   },
    // },
    // size: {
    //   attrs: {
    //     fontSize: {},
    //   },
    //   parseDOM: [
    //     {
    //       tag: "span",
    //       getAttrs: (dom) => {
    //         if (typeof dom === "string") {
    //           return false;
    //         }
    //         const { fontSize } = dom.style;
    //         if (!fontSize) {
    //           return false;
    //         }
    //         return {
    //           fontSize,
    //         };
    //       },
    //     },
    //   ],
    //   toDOM(mark) {
    //     const { fontSize } = mark.attrs;
    //     return ["span", { style: `font-size: ${fontSize}` }, 0];
    //   },
    // },
    link: {
      attrs: {
        href: {},
        title: { default: null },
      },
      inclusive: false,
      parseDOM: [
        {
          tag: "a[href]",
          getAttrs(dom) {
            if (typeof dom === "string") {
              return false;
            }
            return {
              href: dom.getAttribute("href"),
              title: dom.getAttribute("title"),
            };
          },
        },
      ],
      toDOM(mark) {
        const { href, title } = mark.attrs;
        return ["a", { href, title, target: "_blank" }, 0];
      },
    },
  },
});
