function findMatchingClosingTag(src, openTag, closeTag) {
  let depth = 1;
  let index = openTag.length;
  while (depth > 0 && index < src.length) {
    if (src.startsWith(openTag, index)) {
      depth++;
    } else if (src.startsWith(closeTag, index)) {
      depth--;
    }
    if (depth > 0) {
      index++;
    }
  }
  return depth === 0 ? index + closeTag.length : -1;
}

function parseAttributes(tag) {
  const attributes = {};
  const attrRegex = /(\w+)="(.*?)"/g;
  let match;
  while ((match = attrRegex.exec(tag)) !== null) {
    attributes[match[1]] = match[2];
  }
  return attributes;
}

function detailsTokenizer(src) {
  const detailsRegex = /^<details(\s+[^>]*)?>\n/;
  const summaryRegex = /^<summary>(.*?)<\/summary>\n/;

  const detailsMatch = detailsRegex.exec(src);
  if (detailsMatch) {
    const endIndex = findMatchingClosingTag(src, '<details', '</details>');
    if (endIndex === -1) return;

    const fullMatch = src.slice(0, endIndex);
    const detailsTag = detailsMatch[0];
    const attributes = parseAttributes(detailsTag); // Parse attributes from <details>

    let content = fullMatch.slice(detailsTag.length, -10).trim(); // Remove <details> and </details>
    let summary = '';

    const summaryMatch = summaryRegex.exec(content);
    if (summaryMatch) {
      summary = summaryMatch[1].trim();
      content = content.slice(summaryMatch[0].length).trim();
    }

    return {
      type: 'details',
      raw: fullMatch,
      summary: summary,
      text: content,
      attributes: attributes,
    };
  }
}

function detailsStart(src) {
  return src.match(/^<details>/) ? 0 : -1;
}

function detailsRenderer(token) {
  const attributesString = token.attributes
    ? Object.entries(token.attributes)
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ')
    : '';

  return `<details ${attributesString}>
  ${token.summary ? `<summary>${token.summary}</summary>` : ''}
  ${token.text}
  </details>`;
}

function detailsExtension() {
  return {
    name: 'details',
    level: 'block',
    start: detailsStart,
    tokenizer: detailsTokenizer,
    renderer: detailsRenderer,
  };
}

export default function(options = {}) {
  return {
    extensions: [detailsExtension(options)],
  };
}
