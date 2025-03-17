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

export function getOffsetDate(days) {
  const date = new Date();
  date.setTime(date.getTime() + oneDay * days);
  return date;
}
/* 







      时间格式化









*/
// 定义格式化函数映射
const formatMap = {
  'y+': (date, match) => (date.getFullYear() + '').substr(4 - match.length),
  'M+': (date, match) => pad(date.getMonth() + 1, match.length),
  'd+': (date, match) => pad(date.getDate(), match.length),
  'H+': (date, match) => pad(date.getHours(), match.length),
  'm+': (date, match) => pad(date.getMinutes(), match.length),
  's+': (date, match) => pad(date.getSeconds(), match.length),
  S: (date) => date.getMilliseconds(),
};

// 补零函数
function pad(num, len) {
  return ('00' + num).slice(-(len || 2));
}

/**
 * 格式化时间
 * @param {Date|number|string} date 时间
 * @param {string} fmt 格式字符串，默认'yyyy-MM-dd HH:mm:ss'
 * @returns {string} 格式化后的时间字符串
 */
export function formatTime(date, fmt = 'yyyy-MM-dd HH:mm:ss') {
  if (!date || date.toString().startsWith('NaN')) {
    return '';
  }

  const dateObj = new Date(date);

  for (let key in formatMap) {
    if (new RegExp('(' + key + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, formatMap[key](dateObj, RegExp.$1));
    }
  }

  return fmt;
}
