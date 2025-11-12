function footnotePlugin() {
  return {
    name: 'footnote',
    level: 'inline',
    start(src) {
      var m = src.match(/\[+i:/);
      return m ? m.index : undefined;
    },
    tokenizer(src) {
      const match = src.match(/^(\[+i:(\d+)\])/);
      if (match) {
        return {
          type: 'footnote',
          raw: match[1],
          text: match[2],
        };
      }
      return;
    },
  };
}

export default function() {
  return {
    extensions: [footnotePlugin()],
  };
}
