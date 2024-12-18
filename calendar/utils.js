// 按时间戳排序
export function sortByTimeStamp(eventList) {
  return eventList.sort((a, b) => {
    // 先按开始时间排序
    const startDiff = a.start - b.start;
    if (startDiff !== 0) {
      return startDiff;
    }
    // 开始时间相同时按结束时间排序
    return b.end - a.end;
  });
}

// 将日期列表按周分割
export function splitDatesByWeek(dates) {
  const result = [];
  for (let i = 0; i < dates.length; i += 7) {
    result.push(dates.slice(i, i + 7));
  }
  return result;
}

// 获取日期列表
export const getMonthDateList = (year, month) => {
  // 获取当月第一天是星期几
  const firstDayOfMonth = new Date(
    `${year}-${String(month).padStart(2, "0")}-01`
  ).getDay();
  // 获取当月最后一天
  const lastDayOfMonth = new Date(year, month, 0).getDate();
  // 获取上月最后一天
  const lastDayOfLastMonth = new Date(year, month - 1, 0).getDate();

  // 计算年月
  const prevYear = month === 1 ? year - 1 : year;
  const prevMonth = month === 1 ? 12 : month - 1;
  const nextYear = month === 12 ? year + 1 : year;
  const nextMonth = month === 12 ? 1 : month + 1;

  const dateList = [];
  // 添加上月日期
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    dateList.push(
      `${prevYear}-${String(prevMonth).padStart(2, "0")}-${String(
        lastDayOfLastMonth - i
      ).padStart(2, "0")}`
    );
  }
  // 添加本月日期
  for (let i = 1; i <= lastDayOfMonth; i++) {
    dateList.push(
      `${year}-${String(month).padStart(2, "0")}-${String(i).padStart(2, "0")}`
    );
  }
  // 添加下月日期,补齐到42天(6周)
  for (let i = 1; dateList.length < 42; i++) {
    dateList.push(
      `${nextYear}-${String(nextMonth).padStart(2, "0")}-${String(i).padStart(
        2,
        "0"
      )}`
    );
  }
  return dateList;
};
/* 















*/
// 获取日期的ISO格式字符串(YYYY-MM-DD)
const getISODateString = (date) => {
  return new Date(date).toISOString().split("T")[0];
};

// 计算两个日期之间的天数
export const getDaysBetweenDates = (startDate, endDate) => {
  return (
    Math.floor(
      (new Date(endDate) - new Date(startDate)) / (24 * 60 * 60 * 1000)
    ) + 1
  );
};

// 获取当天的事件列表
export const getCurrentDateEvents = (
  currentDate,
  weekStart,
  weekEnd,
  sortList
) => {
  const memoizedISODate = new Map();
  const getISODate = (date) => {
    if (!memoizedISODate.has(date)) {
      memoizedISODate.set(date, getISODateString(date));
    }
    return memoizedISODate.get(date);
  };

  return sortList
    .filter((event) => {
      const eventStartDate = getISODate(event.start);
      const eventEndDate = getISODate(event.end);
      return eventStartDate <= currentDate && eventEndDate >= currentDate;
    })
    .map((event) => {
      const eventStartDate = getISODateString(event.start);
      const eventEndDate = getISODateString(event.end);
      const startDate = eventStartDate < weekStart ? weekStart : eventStartDate;
      const endDate = eventEndDate > weekEnd ? weekEnd : eventEndDate;
      const days = getDaysBetweenDates(startDate, endDate);
      return { ...event, days };
    });
};

/**
 * 设置事件的显示属性
 * @param {Object} event - 事件对象
 * @param {string} currentDate - 当前日期
 * @param {string} weekStart - 本周开始日期
 * @param {string} weekEnd - 本周结束日期
 * @param {number} dayIndex - 当前日期在本周的索引(0-6)
 * @param {number} dateIndex - 当前日期在整个日期列表中的索引
 * @param {Array<string>} dateList - 整个日期列表
 * @param {Object} eventDistribution - 事件分布对象
 * @param {Array<Object>} currentDateEvents - 当前日期的所有事件
 */
export const setEventDisplayProperties = (
  event,
  {
    currentDate,
    weekStart,
    weekEnd,
    dayIndex,
    dateIndex,
    dateList,
    eventDistribution,
    currentDateEvents,
  }
) => {
  // 获取前一天日期及其相同ID的事件
  const prevDate = dateIndex > 0 ? dateList[dateIndex - 1] : null; // 获取前一天的日期,如果是第一天则为null
  const prevEvent = prevDate
    ? eventDistribution[prevDate]?.find((e) => e.id === event.id)
    : null; // 获取前一天相同ID的事件

  // 计算事件垂直位置
  // 如果前一天有相同事件则使用相同的index,否则根据当前日期事件列表中的位置计算
  // 计算事件垂直位置
  if (prevEvent?.index !== undefined) {
    // 如果前一天有相同事件，使用相同的index
    event.index = prevEvent.index;
  } else {
    // 获取当前已使用的所有索引
    const usedIndexes = currentDateEvents
      .filter((e) => e.index !== undefined)
      .map((e) => e.index);

    // 找到最小的未使用索引
    let index = 0;
    while (usedIndexes.includes(index)) {
      index++;
    }
    event.index = index;
  }

  // 获取事件起止日期的ISO格式字符串
  const startDate = getISODateString(event.start);
  const endDate = getISODateString(event.end);

  // 设置事件显示属性
  event.isStartDay = startDate === currentDate; // 是否是事件开始日期
  event.isFirstDay = dayIndex === 0 || event.isStartDay; // 是否是本周第一天或事件开始日期
  event.isCrossingPreviousWeek = startDate < weekStart; // 事件是否跨越上一周
  event.isCrossingNextWeek = endDate > weekEnd; // 事件是否跨越下一周
};

// 处理颜色透明度
export const handleColorOpacity = (color, opacity = 1) => {
  const getRGBA = (r, g, b) => `rgba(${r}, ${g}, ${b}, ${opacity})`;

  if (color.startsWith("rgba")) {
    const [r, g, b] = color.match(/[\d.]+/g);
    return getRGBA(r, g, b);
  }

  if (color.startsWith("rgb")) {
    const [r, g, b] = color.match(/\d+/g);
    return getRGBA(r, g, b);
  }

  if (color.startsWith("#")) {
    const hex = color
      .replace("#", "")
      .padEnd(6, color.length === 4 ? color[1] : "");
    const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
    return getRGBA(r, g, b);
  }

  return color;
};
