import { createApp, ref, computed } from "../../lib/vue3.min.js";
import {
  sortByTimeStamp,
  handleColorOpacity,
  splitDatesByWeek,
  getMonthDateList,
  getCurrentDateEvents,
  setEventDisplayProperties,
} from "./utils.js";
import { events } from "./event.js";


import Calendar from '../../components/Calendar/index.js';

// 事件悬浮状态 Hook
function useEventHover() {
  const hoveredEvent = ref(null);

  function handleMouseEnter(event) {
    hoveredEvent.value = event;
  }

  function handleMouseLeave() {
    hoveredEvent.value = null;
  }

  return {
    hoveredEvent,
    handleMouseEnter,
    handleMouseLeave
  }
}

// 事件样式 Hook
function useEventStyle(calendarConfig, hoveredEvent) {
  // 计算事件的基础样式
  const baseEventStyle = computed(() => ({
    cursor: "pointer",
    position: "absolute",
    boxSizing: "border-box",
    padding: `0 ${calendarConfig.paddingX}px`,
    height: `${calendarConfig.height}px`,
  }));

  // 计算事件的位置相关样式
  const positionStyle = computed(() => (event) => {
    const height = calendarConfig.height;
    const top = event.index * (height + calendarConfig.marginY);
    const marginLeft = event.isCrossingPreviousWeek ? 0 : calendarConfig.marginX;
    const width = `calc(${event.days * 100}% - ${marginLeft}px - ${event.isCrossingNextWeek ? 0 : calendarConfig.marginX}px)`;
    return {
      top: `${top}px`,
      marginLeft: `${marginLeft}px`,
      width,
    };
  });

  // 计算事件的边框和圆角样式
  const borderStyle = computed(() => (event) => {
    const borderLeft = event.isStartDay ? `10px solid ${event.color}` : "none";
    const borderLeftRadius = event.isCrossingPreviousWeek ? 0 : calendarConfig.borderRadius;
    const borderRightRadius = event.isCrossingNextWeek ? 0 : calendarConfig.borderRadius;
    const borderRadius = `${borderLeftRadius}px ${borderRightRadius}px ${borderRightRadius}px ${borderLeftRadius}px`;
    return {
      borderLeft,
      borderRadius,
    };
  });

  // 计算事件的背景颜色
  const backgroundStyle = computed(() => (event) => {
    const isHighlighted = hoveredEvent.value && event.id === hoveredEvent.value?.id;
    return {
      backgroundColor: isHighlighted
        ? handleColorOpacity(event.color, 0.8)
        : handleColorOpacity(event.color, 0.4),
    };
  });

  const eventStyle = computed(() => (event) => {
    return {
      ...baseEventStyle.value,
      ...positionStyle.value(event),
      ...borderStyle.value(event),
      ...backgroundStyle.value(event),
    };
  });

  return {
    eventStyle
  }
}

// 事件数据处理 Hook
function useEventData(year, month) {
  // 事件列表
  const eventList = ref(events);
  // 获取月份的日期列表
  const dateList = getMonthDateList(year, month);

  // 将日期列表按周分割
  const splitDateList = splitDatesByWeek(dateList);
  // 将事件列表按时间戳排序
  const sortList = sortByTimeStamp(eventList.value);

  // 按日期分配事件
  const eventDistribution = {};
  // 遍历每周
  splitDateList.forEach((week, weekIndex) => {
    const weekStart = week[0];
    const weekEnd = week[week.length - 1];
    week.forEach((currentDate, dayIndex) => {
      const dateIndex = weekIndex * 7 + dayIndex;
      const currentDateEvents = getCurrentDateEvents(
        currentDate,
        weekStart,
        weekEnd,
        sortList
      );
      currentDateEvents.forEach((event) => {
        setEventDisplayProperties(event, {
          currentDate,
          weekStart,
          weekEnd,
          dayIndex,
          dateIndex,
          dateList,
          eventDistribution,
          currentDateEvents,
        });
      });
      eventDistribution[currentDate] = currentDateEvents;
    });
  });

  return {
    splitDateList,
    eventDistribution,
  }
}

const app = createApp({
  components: {
    Calendar
  },
  setup() {
    // 事件配置
    const calendarConfig = {
      height: 26, // 事件高度
      marginX: 10, // 事件左右间距
      paddingX: 10, // 容器内边距
      marginY: 4, // 事件上下间距
      borderRadius: 12, // 事件圆角
    };

    const { hoveredEvent, handleMouseEnter, handleMouseLeave } = useEventHover();
    const { eventStyle } = useEventStyle(calendarConfig, hoveredEvent);
    const { splitDateList, eventDistribution } = useEventData(2024, 12);

    console.log("🌷 sortId", eventDistribution);

    return {
      splitDateList,
      eventDistribution,
      eventStyle,
      handleMouseEnter,
      handleMouseLeave,
    };
  },
});

app.mount("#app");
