import { createApp, ref, computed } from "../../lib/vue3.min.js";
import Calendar from '../../components/Calendar/index.js';
import { events } from "./event.js";

const app = createApp({
    components: {
        Calendar
    },
    setup() {
        const eventList = ref([]);
        setTimeout(() => {
            eventList.value = events;
        }, 10);

        const eventDistribution = ref({});
        const processWeekEvents = computed(() => (week) => {
            const sortedEvents = sortEventsByTime(eventList.value);
            const weekStart = week[0];
            const weekEnd = week[week.length - 1];
            const distribution = {};
            
            week.forEach((currentDate, dayIndex) => {
                const currentDateEvents = getCurrentDateEvents(
                    currentDate,
                    weekStart,
                    weekEnd,
                    sortedEvents
                );
                currentDateEvents.forEach((event) => {
                    setEventDisplayProperties(event, {
                        currentDate,
                        weekStart,
                        weekEnd,
                        dayIndex,
                        distribution,
                        currentDateEvents,
                    });
                });
                distribution[currentDate] = currentDateEvents;
            });
            
            eventDistribution.value = distribution;
            return [];
        });

        return {
            eventList,
            processWeekEvents
        };
    },
});

app.mount("#app");

/**
 * 设置事件的显示属性
 */
export function setEventDisplayProperties(
    event,
    {
        currentDate,
        weekStart,
        weekEnd,
        dayIndex,
        distribution,
        currentDateEvents,
    }
) {
    // 计算事件垂直位置
    const usedIndexes = currentDateEvents
        .filter((e) => e.index !== undefined)
        .map((e) => e.index);

    let index = 0;
    while (usedIndexes.includes(index)) {
        index++;
    }
    event.index = index;

    // 获取事件起止日期的ISO格式字符串
    const startDate = new Date(event.start).toISOString().split("T")[0];
    const endDate = new Date(event.end).toISOString().split("T")[0];

    // 设置事件显示属性
    event.isStartDay = startDate === currentDate;
    event.isFirstDay = dayIndex === 0 || event.isStartDay;
    event.isCrossingPreviousWeek = startDate < weekStart;
    event.isCrossingNextWeek = endDate > weekEnd;
}

/**
 * 获取当天的事件列表
 */
export function getCurrentDateEvents(currentDate, weekStart, weekEnd, sortList) {
    const getISODate = (date) => new Date(date).toISOString().split("T")[0];

    return sortList
        .filter((event) => {
            const eventStartDate = getISODate(event.start);
            const eventEndDate = getISODate(event.end);
            return eventStartDate <= currentDate && eventEndDate >= currentDate;
        })
        .map((event) => {
            const eventStartDate = getISODate(event.start);
            const eventEndDate = getISODate(event.end);
            const startDate = eventStartDate < weekStart ? weekStart : eventStartDate;
            const endDate = eventEndDate > weekEnd ? weekEnd : eventEndDate;
            const days = Math.floor((new Date(endDate) - new Date(startDate)) / (24 * 60 * 60 * 1000)) + 1;
            return { ...event, days };
        });
}

/**
 * 对事件列表按时间进行排序
 */
export function sortEventsByTime(eventList) {
    return eventList.sort((a, b) => {
        const startDiff = a.start - b.start;
        return startDiff || b.end - a.end;
    });
}