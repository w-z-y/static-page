function footnotePlugin() {
  return {
    name: 'interpolation',
    level: 'inline',
    start(src) {
      return src.match(/\{\{/)?.index;
    },
    tokenizer(src) {
      const match = src.match(/^(\{\{(.*)\}\})/);
      if (match) {
        return {
          type: 'interpolation',
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
