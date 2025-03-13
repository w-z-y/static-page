/**
 * 获取ISO格式的日期字符串
 * @param {Date} date - 日期对象
 * @returns {string} - ISO格式的日期字符串
 */
export const getISODate = (date) => {
  const d = new Date(date);
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().split('T')[0];
};

export const now = new Date();

export const oneDay = 3600 * 1000 * 24;

export function getDate(days) {
  const date = new Date();
  date.setTime(date.getTime() + oneDay * days);
  return date;
}
/* 







      时间格式化









*/
// 定义格式化函数映射
const formatMap = {
  // 年份
  yyyy: (date) => date.getFullYear().toString(),
  yy: (date) => (date.getFullYear() % 100).toString().padStart(2, '0'),

  // 月份
  MM: (date) => (date.getMonth() + 1).toString().padStart(2, '0'),
  M: (date) => (date.getMonth() + 1).toString(),

  // 日期
  dd: (date) => date.getDate().toString().padStart(2, '0'),
  d: (date) => date.getDate().toString(),

  // 小时（24小时制）
  HH: (date) => date.getHours().toString().padStart(2, '0'),
  H: (date) => date.getHours().toString(),

  // 小时（12小时制）
  hh: (date) => {
    const hours = date.getHours() % 12 || 12;
    return hours.toString().padStart(2, '0');
  },
  h: (date) => {
    const hours = date.getHours() % 12 || 12;
    return hours.toString();
  },

  // 分钟
  mm: (date) => date.getMinutes().toString().padStart(2, '0'),
  m: (date) => date.getMinutes().toString(),

  // 秒
  ss: (date) => date.getSeconds().toString().padStart(2, '0'),
  s: (date) => date.getSeconds().toString(),

  // 上午/下午
  A: (date) => (date.getHours() >= 12 ? 'PM' : 'AM'),
  a: (date) => (date.getHours() >= 12 ? 'pm' : 'am'),
};

/**
 * 生成匹配格式符号的正则表达式
 * @param {Object} map 格式化函数映射
 * @returns {RegExp} 匹配格式符号的正则
 */
function createFormatRegex(map) {
  const keys = Object.keys(map).sort((a, b) => b.length - a.length);
  const escapedKeys = keys.map((key) => key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  return new RegExp(`(${escapedKeys.join('|')})`, 'g');
}

/**
 * 格式化时间
 * @param {string} formatStr 格式字符串（如 "yyyy-MM-dd HH:mm:ss"）
 * @param {Date||Number} date 时间对象
 * @param {Object} map 格式化函数映射
 * @returns {string} 格式化后的时间字符串
 */
export function formatTime(date, formatStr = 'yyyy-MM-dd HH:mm:ss', map = formatMap) {
  const dateObj = date instanceof Date ? date : new Date(date);
  if (isNaN(dateObj.getTime())) {
    return date;
  }
  const regex = createFormatRegex(map);
  return formatStr.replace(regex, (match) => {
    const formatter = map[match];
    return formatter ? formatter(dateObj) : match;
  });
}
