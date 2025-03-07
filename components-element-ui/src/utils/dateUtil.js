/**
 * 获取ISO格式的日期字符串
 * @param {Date} date - 日期对象
 * @returns {string} - ISO格式的日期字符串
 */
export const getISODate = (date) => {
    const d = new Date(date);
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
        .toISOString()
        .split("T")[0];
};

export const now = new Date();

export const oneDay = 3600 * 1000 * 24;

export function getDate(days) {
  const date = new Date();
  date.setTime(date.getTime() + oneDay * days);
  return date;
}