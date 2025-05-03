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
    mention: mention,
  },
  marks: {
    // em: {
    //   parseDOM: [{ tag: "i" }, { tag: "em" }, { style: "font-style=italic" }],
    //   toDOM() {
    //     return ["em", 0];
    //   },
    // },
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
    // underline: {
    //   parseDOM: [{ tag: "u" }],
    //   toDOM() {
    //     return ["u", 0];
    //   },
    // },
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
    // link: {
    //   attrs: {
    //     href: {},
    //     title: { default: null },
    //   },
    //   inclusive: false,
    //   parseDOM: [
    //     {
    //       tag: "a[href]",
    //       getAttrs(dom) {
    //         if (typeof dom === "string") {
    //           return false;
    //         }
    //         return {
    //           href: dom.getAttribute("href"),
    //           title: dom.getAttribute("title"),
    //         };
    //       },
    //     },
    //   ],
    //   toDOM(mark) {
    //     const { href, title } = mark.attrs;
    //     return ["a", { href, title, target: "_blank" }, 0];
    //   },
    // },
  },
});
