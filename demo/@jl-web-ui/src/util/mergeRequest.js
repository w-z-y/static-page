import request from './request';

// 合并参数的辅助函数，将字符串逗号拆分成数组
function splitCommaString(val) {
  return typeof val === 'string' && val.includes(',')
    ? val
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    : val;
}

// 合并参数的主逻辑
function mergeParams(a, b) {
  // 字符串转数组再合并
  if (typeof a === 'string' && typeof b === 'string') {
    if (a.includes(',') || b.includes(',')) {
      // 都有逗号，拆分后合并
      return Array.from(
        new Set([
          ...(Array.isArray(splitCommaString(a)) ? splitCommaString(a) : [a]),
          ...(Array.isArray(splitCommaString(b)) ? splitCommaString(b) : [b]),
        ])
      );
    } else {
      // 都没有逗号，直接两个值合成数组
      return a === b ? a : [a, b];
    }
  }
  // 字符串（带逗号）和数组
  if (typeof a === 'string' && a.includes(',') && Array.isArray(b)) {
    return Array.from(new Set([...(Array.isArray(splitCommaString(a)) ? splitCommaString(a) : [a]), ...b]));
  }
  if (typeof b === 'string' && b.includes(',') && Array.isArray(a)) {
    return Array.from(new Set([...a, ...(Array.isArray(splitCommaString(b)) ? splitCommaString(b) : [b])]));
  }
  // 一个字符串一个数组
  if (typeof a === 'string' && Array.isArray(b)) {
    return Array.from(new Set([a, ...b]));
  }
  if (typeof b === 'string' && Array.isArray(a)) {
    return Array.from(new Set([...a, b]));
  }
  // 如果两个都是数组，合并去重
  if (Array.isArray(a) && Array.isArray(b)) {
    return Array.from(new Set([...a, ...b]));
  }
  // 如果都是对象，则递归合并
  if (a && typeof a === 'object' && b && typeof b === 'object') {
    let r = { ...a };
    for (const k in b) {
      r[k] = k in r ? mergeParams(r[k], b[k]) : b[k];
    }
    return r;
  }
  // 其他情况直接用b
  return b;
}

function mergeRequestParams(oldConfig, newConfig) {
  let merged = { ...oldConfig };
  if (newConfig.data || merged.data) merged.data = mergeParams(merged.data || {}, newConfig.data || {});

  if (newConfig.params || merged.params) merged.params = mergeParams(merged.params || {}, newConfig.params || {});
  Object.keys(newConfig).forEach((k) => k !== 'data' && k !== 'params' && (merged[k] = newConfig[k]));
  return merged;
}

const getRequestId = (c) => `${c.url}-${c.method ? c.method.toLowerCase() : 'get'}`;
const pendingRequests = {};
const DELAY = 10;
const isParamsInUrlLocal = (c) => ['get', 'delete'].includes((c.method || 'get').toLowerCase());

// 将数组（只有基本类型）转为逗号字符串，否者原样返回
function arrayToCommaStringLocal(obj) {
  if (Array.isArray(obj)) return obj.every((i) => typeof i !== 'object') ? Array.from(new Set(obj)).join(',') : obj;
  if (obj && typeof obj === 'object') {
    let r = {};
    for (const k in obj) r[k] = arrayToCommaStringLocal(obj[k]);
    return r;
  }
  return obj;
}

const mergeRequest = (config) =>
  new Promise((resolve, reject) => {
    const id = getRequestId(config);
    if (!pendingRequests[id]) {
      pendingRequests[id] = {
        config: config,
        handlers: [],
        timer: null,
      };
    } else {
      // 合并参数
      pendingRequests[id].config = mergeRequestParams(pendingRequests[id].config, config);
      // 清除旧的定时器
      if (pendingRequests[id].timer) clearTimeout(pendingRequests[id].timer);
    }
    // 存当前的 resolve/reject
    pendingRequests[id].handlers.push({ resolve, reject });

    pendingRequests[id].timer = setTimeout(() => {
      const pending = pendingRequests[id];
      const { config: latestConfig, handlers } = pending || {};
      let finalConfig = { ...latestConfig };
      if (isParamsInUrlLocal(finalConfig) && finalConfig.params) finalConfig.params = arrayToCommaStringLocal(finalConfig.params);

      // 清空handlers（一次合并的跑完要清空handlers）
      pending.handlers = [];

      request(finalConfig)
        .then((res) => {
          handlers.forEach((h) => h.resolve(res));
        })
        .catch((err) => {
          handlers.forEach((h) => h.reject(err));
        })
        .finally(() => {
          delete pendingRequests[id];
        });
    }, DELAY);
  });

export default mergeRequest;
