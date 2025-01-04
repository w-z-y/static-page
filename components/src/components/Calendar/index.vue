<template>
    <div class="calendar" :data-view="viewType">
      <div class="calendar-header">
        <Button @click="handlePrevious">&lt;</Button>
        <span>{{ currentYearMonth }}{{ viewType === 'week' ? ' 第' + currentWeek + '周' : '' }}</span>
        <Button @click="handleNext">&gt;</Button>
        <Button v-if="!isCurrentMonthOrWeek" @click="backToday">今天</Button>
        <Button @click="toggleView">
          {{ viewType === 'month' ? '周视图' : '月视图' }}
        </Button>
      </div>
      
      <div class="calendar-body" :data-month="currentMonth">
        <div class="weekdays">
          <span v-for="day in weekDays">
            {{ day }}
            <button v-if="viewType === 'week' && isToday(displayDates[0][weekDays.indexOf(day)])" 
                    class="today-button">今</button>
          </span>
        </div>
        <div class="weeks" v-for="week in displayDates">
          <div class="day" v-for="date in week" 
               :class="{ 'is-today': isToday(date) }">
            <div class="day-header" v-if="viewType === 'month'">
              <span>{{ date.getDate() }}</span>
              <button v-if="isToday(date)" class="today-button">今</button>
            </div>
            <div class="day-body">
              <slot :date="date"></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { getISODate } from '../../utils/dateUtil.js'
import Button from '../Button/index.vue'
Date.prototype.getISODate = function () {
    return getISODate(this)
}

const props = defineProps({
  date: {
    type: Date,
    default: () => new Date()
  },
  weekStartsOnSunday: {
    type: Boolean,
    default: true
  }
})

// 状态管理
const currentDate = ref(props.date || new Date())
const viewType = ref('month')

// 工具函数
const getDaysBetween = (start, end) => Math.floor((end - start) / (24 * 60 * 60 * 1000))

const adjustWeekDay = (day) => !props.weekStartsOnSunday && day === 0 ? 6 : (props.weekStartsOnSunday ? day : day - 1)

// 计算属性
const weekDays = computed(() => {
    const dayNames = props.weekStartsOnSunday
        ? ['日', '一', '二', '三', '四', '五', '六']
        : ['一', '二', '三', '四', '五', '六', '日']

    if (viewType.value === 'week') {
        return displayDates.value[0].map(date => {
            return `${date.getDate()}日 (${dayNames[date.getDay()]})`
        })
    }
    return dayNames
})

const currentYearMonth = computed(() => {
    const { value: date } = currentDate
    return `${date.getFullYear()}年${date.getMonth() + 1}月`
})

const currentWeek = computed(() => {
    const { value: date } = currentDate
    const startOfYear = new Date(date.getFullYear(), 0, 1)
    const days = getDaysBetween(startOfYear, date)
    return Math.ceil((days + startOfYear.getDay() + 1) / 7)
})

const isCurrentMonthOrWeek = computed(() => {
    const today = new Date()
    const { value: current } = currentDate

    if (viewType.value === 'month') {
        return today.getFullYear() === current.getFullYear() &&
            today.getMonth() === current.getMonth()
    }

    const startOfYear = new Date(today.getFullYear(), 0, 1)
    const todayWeek = Math.ceil((today - startOfYear) / (7 * 24 * 60 * 60 * 1000))
    const currentWeek = Math.ceil((current - startOfYear) / (7 * 24 * 60 * 60 * 1000))

    return today.getFullYear() === current.getFullYear() && todayWeek === currentWeek
})

const currentMonth = computed(() => currentDate.value.getMonth() + 1)

// 日期处理函数
const isToday = (date) => {
    const today = new Date()
    return date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate()
}

const getMonthDates = () => {
    const { value: date } = currentDate
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)

    const dates = []
    const firstDayWeek = adjustWeekDay(firstDay.getDay())

    // 补充上月日期
    for (let i = 0; i < firstDayWeek; i++) {
        dates.unshift(new Date(year, month, -i))
    }

    // 当月日期
    for (let i = 1; i <= lastDay.getDate(); i++) {
        dates.push(new Date(year, month, i))
    }

    // 补充下月日期
    const remaining = 42 - dates.length
    for (let i = 1; i <= remaining; i++) {
        dates.push(new Date(year, month + 1, i))
    }

    return dates
}

const getWeekDates = () => {
    const { value: date } = currentDate
    const day = adjustWeekDay(date.getDay())

    return Array.from({ length: 7 }, (_, i) => {
        const newDate = new Date(date)
        newDate.setDate(date.getDate() - day + i)
        return newDate
    })
}

const displayDates = computed(() => {
    const dates = viewType.value === 'month' ? getMonthDates() : getWeekDates()

    if (viewType.value === 'month') {
        return Array.from({ length: dates.length / 7 }, (_, i) =>
            dates.slice(i * 7, (i + 1) * 7)
        )
    }

    return [dates]
})

// 事件处理函数
const handleDateChange = (amount, unit) => {
    const newDate = new Date(currentDate.value)
    if (unit === 'month') {
        newDate.setMonth(newDate.getMonth() + amount)
    } else {
        newDate.setDate(newDate.getDate() + amount * 7)
    }
    currentDate.value = newDate
}

const handlePrevious = () => handleDateChange(-1, viewType.value === 'month' ? 'month' : 'week')
const handleNext = () => handleDateChange(1, viewType.value === 'month' ? 'month' : 'week')
const backToday = () => currentDate.value = new Date()
const toggleView = () => viewType.value = viewType.value === 'month' ? 'week' : 'month'
</script>

<style scoped lang="scss">
@use './index.scss';
</style>