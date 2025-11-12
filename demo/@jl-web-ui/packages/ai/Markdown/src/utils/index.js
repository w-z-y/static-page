// 如果当前行中包含中文字符（通过正则 /[\u4e00-\u9fa5]/ 检查），并且该行包含星号 *，则进一步判断是否包含中文括号（（ 或 ））或中文引号（“ 或 ”）。
// 如果包含，则分别用 processChineseDelimiters 函数处理加粗（**）和斜体（*）的情况，将星号包裹的内容限定在中文括号或引号内进行处理。
// 这样做的目的是为了更好地兼容中文语境下的 Markdown 语法，避免中文标点与 Markdown 星号语法冲突导致渲染异常。
export function processChineseContent(content) {
  // This function is used to process the response content before the response content is rendered.
  const lines = content.split('\n');
  const processedLines = lines.map((line) => {
    if (/[\u4e00-\u9fa5]/.test(line)) {
      if (line.includes('*')) {
        // 中文括号
        if (/（|）/.test(line)) {
          line = processChineseDelimiters(line, '**', '（', '）');
          line = processChineseDelimiters(line, '*', '（', '）');
        }
        // 中文引号
        if (/“|”/.test(line)) {
          line = processChineseDelimiters(line, '**', '“', '”');
          line = processChineseDelimiters(line, '*', '“', '”');
        }
      }
    }
    return line;
  });
  content = processedLines.join('\n');

  return content.trim();
}

// 判断字符是否为中文汉字
function isChineseChar(char) {
  return /\p{Script=Han}/u.test(char);
}

// 处理中文分隔符（如括号、引号）内的 Markdown 星号语法，避免与中文标点冲突
function processChineseDelimiters(line, symbol, leftSymbol, rightSymbol) {
  // 对 symbol 进行转义，防止正则匹配出错
  const escapedSymbol = escapeRegExp(symbol);
  // 构造正则，匹配未被转义的星号包裹内容，且前后带有字符
  const regex = new RegExp(`(.?)(?<!${escapedSymbol})(${escapedSymbol})([^${escapedSymbol}]+)(${escapedSymbol})(?!${escapedSymbol})(.)`, 'g');
  // 替换匹配到的内容
  return line.replace(regex, (match, l, left, content, right, r) => {
    // 判断内容是否以左分隔符开头且前面是中文，或以右分隔符结尾且后面是中文
    const result = (content.startsWith(leftSymbol) && l && l.length > 0 && isChineseChar(l[l.length - 1])) || (content.endsWith(rightSymbol) && r && r.length > 0 && isChineseChar(r[0]));
    if (result) {
      // 如果满足条件，则在分隔符外侧加空格，避免渲染异常
      return `${l} ${left}${content}${right} ${r}`;
    } else {
      // 否则返回原始匹配内容
      return match;
    }
  });
}

// 对正则表达式中的特殊字符进行转义，避免在构造正则时出错
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// 反转义 HTML 实体，将 HTML 字符串中的实体字符还原为原始字符
export function unescapeHtml(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.documentElement.textContent;
}

// 将字符串形式的 JS 对象解析为对象
function parseJsObject(jsString) {
  return new Function(`return ${jsString}`)();
}

// 解析非标准 JSON 字符串，支持注释、单引号、尾逗号等容错
export function parseNonStandardJSON(jsonStr) {
  // 预处理非标准内容
  jsonStr = jsonStr
    .replace(/\/\/.*$/gm, '') // 单行注释
    .replace(/\/\*[\s\S]*?\*\//g, '') // 多行注释
    .replace(/'([^']*)'/g, '"$1"') // 单引号转双引号
    .replace(/,\s*([}\]])/g, '$1') // 尾随逗号
    // 容错
    .replace(/,\s*\.\.\./g, ''); // 过滤 , ... 的情况

  return parseJsObject(jsonStr);
}
