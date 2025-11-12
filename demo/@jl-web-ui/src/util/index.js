/* 

  通用的一些方法

*/

// 将数字，数组，字符串转成对应的px
export function handlePxValue(value) {
  // 匹配以字母或%结尾的单位（任意长度），常见css单位已覆盖
  const unitReg = /[a-z%]+$/i;

  const convertToPx = (item) => {
    if (typeof item === 'number') {
      return `${item}px`;
    }
    if (typeof item === 'string') {
      const trimmed = item.trim();
      // 已包含单位则直接返回
      if (unitReg.test(trimmed)) {
        return trimmed;
      }
      // 否则加px
      return trimmed + 'px';
    }
    return '';
  };

  if (Array.isArray(value)) {
    return value.map(convertToPx).join(' ');
  }
  return convertToPx(value) || '';
}

// 判断是否是对象
export function isObject(obj) {
  return obj !== null && typeof obj === 'object' && !Array.isArray(obj);
}

// 根据props.value进行分组
export function groupDataByPropsValue(data, props) {
  const { value, label, formatter } = props;
  const groupMap = {};
  data.forEach((item) => {
    const groupValue = item[value];
    const nameValue = item[label];
    if (!groupMap[groupValue]) {
      groupMap[groupValue] = {
        label: nameValue, // 动态键名
        value: groupValue, // 动态键名
        children: [],
      };
    }
    const formattedItem = formatter ? formatter(item) : { ...item }; // 默认直接展开所有字段
    groupMap[groupValue].children.push(formattedItem);
  });

  return Object.values(groupMap);
}

// 分片处理大数据
export function processInChunks(data, process /* 处理过程 */, chunkSize = 1000, callback /* 处理完后的回调 */) {
  let index = 0;
  function doChunk() {
    const chunkEnd = Math.min(index + chunkSize, data.length);
    while (index < chunkEnd) {
      process(data[index], index, data);
      index++;
    }
    if (index < data.length) {
      setTimeout(doChunk, 0);
    } else if (callback) {
      callback();
    }
  }
  doChunk();
}

// 睡眠
export function sleep(time = 200) {
  return new Promise((resolve) => setTimeout(() => resolve(), time));
}

// 转成kebab-case格式
export const toKebabCase = (str) => str.replace(/([A-Z])/g, (match, _, offset) => (offset === 0 ? match.toLowerCase() : '-' + match.toLowerCase()));

// 节流
export function throttle(func, delay = 0) {
  let prev = Date.now();
  return function () {
    const context = this;
    const args = arguments;
    const now = Date.now();
    if (now - prev >= delay) {
      func.apply(context, args);
      prev = Date.now();
    }
  };
}

// 防抖
export function debounce(fn, delay) {
  let timer = null;
  function debounced() {
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  }
  debounced.cancel = function () {
    clearTimeout(timer);
    timer = null;
  };
  return debounced;
}

const loadedCDNMap = new Map();
export function loadCDN(src, type = 'js') {
  if (!src) return Promise.reject(new Error('@jl/web-ui:CDN资源地址不能为空'));
  const key = `${type}:${src}`;
  if (loadedCDNMap.has(key)) return loadedCDNMap.get(key);

  if (type === 'js' || type === 'css') {
    const preload = document.createElement('link');
    preload.rel = 'preload';
    preload.as = type === 'js' ? 'script' : 'style';
    preload.href = src;
    document.head.appendChild(preload);
  }

  const tag = type === 'js' ? 'script' : type === 'css' ? 'link' : '';
  const selector = type === 'js' ? `script[src="${src}"]` : type === 'css' ? `link[rel="stylesheet"][href="${src}"]` : '';
  const attrs = type === 'js' ? { type: 'text/javascript', src, async: true } : type === 'css' ? { rel: 'stylesheet', href: src } : null;

  const promise = new Promise((resolve, reject) => {
    if (!tag || !attrs) return reject(new Error('@jl/web-ui:不支持的CDN资源类型'));
    let exist = document.querySelector(selector);
    if (exist) {
      if (exist.hasAttribute('data-loaded')) return resolve();
      exist.addEventListener('load', resolve);
      exist.addEventListener('error', reject);
      return;
    }
    let el = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => (el[k] = v));
    el.setAttribute('data-loaded', 'true');
    el.onload = resolve;
    el.onerror = reject;
    document.head.appendChild(el);
  });
  loadedCDNMap.set(key, promise);
  return promise;
}

// 根据链接下载
export function download(url) {
  const a = document.createElement('a');
  a.href = url;
  a.download = '测试语音.wav';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// 用于触发自定义事件
export function customEvent(event, params, isSelf) {
  if (window.__SINGLE_SPA__ || isSelf) {
    window.dispatchEvent(
      new CustomEvent(event, {
        detail: params,
      })
    );
  } else {
    // iframe调用(子通知主)
    const newParams = {
      type: event,
      ...params,
    };
    window.top.postMessage(newParams, '*');
  }
}
/* 



  项目框架相关


*/
// 获取项目中的缓存
const STORAGEPREFIX = 'jnpf_';
const STORAGETYPE = typeof window !== 'undefined' && window.localStorage ? window.localStorage : {};
export function storageSet(obj) {
  for (let i in obj) {
    cacheItem(i, obj[i]);
  }

  function cacheItem(key, val) {
    key = STORAGEPREFIX + key;
    let valType = typeof val;
    if (val !== null) {
      var valConstructor = val.constructor;
    }
    if (valType === 'string' || valType === 'number' || valType === 'boolean') {
      if (valConstructor === String) {
        val = val + '|String';
      } else if (valConstructor === Number) {
        val = val + '|Number';
      } else if (valConstructor === Boolean) {
        val = val + '|Boolean';
      }
      STORAGETYPE.setItem && STORAGETYPE.setItem(key, val);
    } else if (valType === 'object') {
      if (val === null) {
        val = JSON.stringify(val) + '|Null';
        STORAGETYPE.setItem && STORAGETYPE.setItem(key, val);
      } else {
        if (valConstructor === Array) {
          val = JSON.stringify(val) + '|Array';
        } else if (valConstructor === Object) {
          val = JSON.stringify(val) + '|Object';
        }
        STORAGETYPE.setItem && STORAGETYPE.setItem(key, val);
      }
    }
  }
}
export function storageGet(key) {
  key = STORAGEPREFIX + key;
  let keyName = (STORAGETYPE.getItem && STORAGETYPE.getItem(key)) || '';
  if (keyName === null) {
    return null;
  }
  let valArr = keyName.split('|');
  let getDataType = valArr[valArr.length - 1];
  valArr.splice(valArr.length - 1, 1);
  let val = valArr.join('');
  if (getDataType === 'Number') {
    val = parseInt(val);
  } else if (getDataType === 'Boolean') {
    if (val === 'true') {
      val = true;
    } else {
      val = false;
    }
  } else if (getDataType === 'Array' || getDataType === 'Object' || getDataType === 'Null') {
    val = JSON.parse(val);
  }
  return val;
}
const messages = {
  zh: {},
  en: {},
  zhtw: {},
  indo: {},
};
export function getLanguage() {
  const chooseLanguage = storageGet('language');
  if (chooseLanguage) return chooseLanguage;
  let language = '';
  if (typeof navigator !== 'undefined' && (navigator.language || navigator.browserLanguage)) {
    language = (navigator.language || navigator.browserLanguage).toLowerCase();
  }
  if (language.indexOf('tw') > -1) return 'zhtw';
  const locales = Object.keys(messages);
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale;
    }
  }
  return 'zh';
}

// 从一个数组中找出另一个数组不存在的元素
export function arrayDiff(arr1, arr2) {
  // 返回 arr1 中不在 arr2 中的元素组成的新数组
  return arr1.filter((item) => !arr2.includes(item));
}

// 判断是否为空
export function isEmpty(val) {
  return val === undefined || val === null || val === '';
}

// 判断是否不为空
export function isNotEmpty(val) {
  return val !== undefined && val !== null && val !== '';
}
