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