import { ref, computed } from "../../lib/vue3.min.js";

export default {
    name: 'Calendar',
    template: `
    <div class="calendar">
      <div class="calendar-header">
        <button @click="handlePrevious">&lt;</button>
        <span>{{ currentYearMonth }}{{ viewType === 'week' ? ' 第' + currentWeek + '周' : '' }}</span>
        <button @click="handleNext">&gt;</button>
        <button @click="backToday">今天</button>
        <button @click="toggleView">
          {{ viewType === 'month' ? '周视图' : '月视图' }}
        </button>
      </div>
      
      <div class="calendar-body">
        <div class="weekdays">
          <span>日</span>
          <span>一</span>
          <span>二</span>
          <span>三</span>
          <span>四</span>
          <span>五</span>
          <span>六</span>
        </div>
        
        <div class="weeks" v-for="week in displayDates">
          <div class="day" v-for="date in week" :class="{ 'is-today': isToday(date) }">
            <!-- 日期头部插槽 -->
            <div class="day-header">
              <slot name="day-header" :date="date">
                {{ date.getDate() }}
              </slot>
            </div>
            <!-- 日期内容插槽 -->
            <div class="day-body">
              <slot name="day-body" :date="date">
              </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
    `,
    setup() {
        // 当前日期
        const currentDate = ref(new Date());
        // 视图类型 month/week
        const viewType = ref('month');

        // 计算当前年月
        const currentYearMonth = computed(() => {
            const year = currentDate.value.getFullYear();
            const month = currentDate.value.getMonth() + 1;
            return `${year}年${month}月`;
        });

        // 计算当前是第几周
        const currentWeek = computed(() => {
            const date = currentDate.value;
            const startOfYear = new Date(date.getFullYear(), 0, 1);
            const days = Math.floor((date - startOfYear) / (24 * 60 * 60 * 1000));
            const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7);
            return weekNumber;
        });

        // 判断是否是今天
        const isToday = (date) => {
            const today = new Date();
            return date.getFullYear() === today.getFullYear() &&
                date.getMonth() === today.getMonth() &&
                date.getDate() === today.getDate();
        };

        // 获取当月所有日期
        // 扩展Date对象添加dateString属性
        const extendDateWithString = (date) => {
            Object.defineProperty(date, 'dateString', {
                get() {
                    return `${this.getFullYear()}-${this.getMonth()+1}-${this.getDate()}`
                }
            });
            return date;
        };

        const getMonthDates = () => {
            const year = currentDate.value.getFullYear();
            const month = currentDate.value.getMonth();
            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);

            const dates = [];
            const firstDayWeek = firstDay.getDay();

            // 补充上月日期
            for (let i = 0; i < firstDayWeek; i++) {
                dates.unshift(extendDateWithString(new Date(year, month, -i)));
            }

            // 当月日期
            for (let i = 1; i <= lastDay.getDate(); i++) {
                dates.push(extendDateWithString(new Date(year, month, i)));
            }

            // 补充下月日期
            const remaining = 42 - dates.length;
            for (let i = 1; i <= remaining; i++) {
                dates.push(extendDateWithString(new Date(year, month + 1, i)));
            }

            return dates;
        };

        // 获取当前周日期
        const getWeekDates = () => {
            const today = currentDate.value;
            const day = today.getDay();
            const week = [];

            // 获取本周的7天
            for (let i = 0; i < 7; i++) {
                const date = new Date(today);
                date.setDate(today.getDate() - day + i);
                week.push(extendDateWithString(date));
            }

            return week;
        };

        // 显示的日期数据
        const displayDates = computed(() => {
            const dates = viewType.value === 'month' ? getMonthDates() : getWeekDates();
            if (viewType.value === 'month') {
                const weeks = [];
                for (let i = 0; i < dates.length; i += 7) {
                    weeks.push(dates.slice(i, i + 7));
                }
                return weeks;
            }
            return [dates];
        });

        // 处理上一个时间段
        const handlePrevious = () => {
            const newDate = new Date(currentDate.value);
            if (viewType.value === 'month') {
                newDate.setMonth(newDate.getMonth() - 1);
            } else {
                newDate.setDate(newDate.getDate() - 7);
            }
            currentDate.value = newDate;
        };

        // 处理下一个时间段
        const handleNext = () => {
            const newDate = new Date(currentDate.value);
            if (viewType.value === 'month') {
                newDate.setMonth(newDate.getMonth() + 1);
            } else {
                newDate.setDate(newDate.getDate() + 7);
            }
            currentDate.value = newDate;
        };

        // 返回今天
        const backToday = () => {
            currentDate.value = new Date();
        };

        // 切换视图
        const toggleView = () => {
            viewType.value = viewType.value === 'month' ? 'week' : 'month';
        };

        return {
            currentYearMonth,
            currentWeek,
            displayDates,
            viewType,
            handlePrevious,
            handleNext,
            backToday,
            toggleView,
            isToday
        };
    }
}
