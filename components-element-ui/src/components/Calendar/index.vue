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
        <span v-for="(day, index) in weekDays" :key="index">
          {{ day }}
          <button v-if="viewType === 'week' && isToday(displayDates[0][index])" class="today-button">今</button>
        </span>
      </div>
      <div class="weeks" v-for="(week, weekIndex) in displayDates" :key="weekIndex">
        <div class="day" v-for="(date, dateIndex) in week" :key="dateIndex" :class="{ 'is-today': isToday(date) }">
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

<script>
import { getISODate } from '../../utils/dateUtil.js'
import Button from '../Button'

Date.prototype.getISODate = function () {
  return getISODate(this)
}

export default {
  name: "MyCalendar",
  components: { Button },
  props: {
    date: {
      type: Date,
      default: () => new Date()
    },
    weekStartsOnSunday: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      currentDate: this.date || new Date(),
      viewType: 'month'
    }
  },
  computed: {
    weekDays() {
      const dayNames = this.weekStartsOnSunday
        ? ['日', '一', '二', '三', '四', '五', '六']
        : ['一', '二', '三', '四', '五', '六', '日']

      if (this.viewType === 'week') {
        return this.displayDates[0].map(date => {
          return `${date.getDate()}日 (${dayNames[date.getDay()]})`
        })
      }
      return dayNames
    },
    currentYearMonth() {
      const date = this.currentDate
      return `${date.getFullYear()}年${date.getMonth() + 1}月`
    },
    currentWeek() {
      const date = this.currentDate
      const startOfYear = new Date(date.getFullYear(), 0, 1)
      const days = this.getDaysBetween(startOfYear, date)
      return Math.ceil((days + startOfYear.getDay() + 1) / 7)
    },
    isCurrentMonthOrWeek() {
      const today = new Date()
      const current = this.currentDate

      if (this.viewType === 'month') {
        return today.getFullYear() === current.getFullYear() &&
          today.getMonth() === current.getMonth()
      }

      const startOfYear = new Date(today.getFullYear(), 0, 1)
      const todayWeek = Math.ceil((today - startOfYear) / (7 * 24 * 60 * 60 * 1000))
      const currentWeek = Math.ceil((current - startOfYear) / (7 * 24 * 60 * 60 * 1000))

      return today.getFullYear() === current.getFullYear() && todayWeek === currentWeek
    },
    currentMonth() {
      return this.currentDate.getMonth() + 1
    },
    displayDates() {
      const dates = this.viewType === 'month' ? this.getMonthDates() : this.getWeekDates()

      if (this.viewType === 'month') {
        return Array.from({ length: dates.length / 7 }, (_, i) =>
          dates.slice(i * 7, (i + 1) * 7)
        )
      }

      return [dates]
    }
  },
  methods: {
    getDaysBetween(start, end) {
      return Math.floor((end - start) / (24 * 60 * 60 * 1000))
    },
    adjustWeekDay(day) {
      return !this.weekStartsOnSunday && day === 0 ? 6 : (this.weekStartsOnSunday ? day : day - 1)
    },
    isToday(date) {
      const today = new Date()
      return date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate()
    },
    getMonthDates() {
      const date = this.currentDate
      const year = date.getFullYear()
      const month = date.getMonth()
      const firstDay = new Date(year, month, 1)
      const lastDay = new Date(year, month + 1, 0)

      const dates = []
      const firstDayWeek = this.adjustWeekDay(firstDay.getDay())

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
    },
    getWeekDates() {
      const date = this.currentDate
      const day = this.adjustWeekDay(date.getDay())

      return Array.from({ length: 7 }, (_, i) => {
        const newDate = new Date(date)
        newDate.setDate(date.getDate() - day + i)
        return newDate
      })
    },
    handleDateChange(amount, unit) {
      const newDate = new Date(this.currentDate)
      if (unit === 'month') {
        newDate.setMonth(newDate.getMonth() + amount)
      } else {
        newDate.setDate(newDate.getDate() + amount * 7)
      }
      this.currentDate = newDate
    },
    handlePrevious() {
      this.handleDateChange(-1, this.viewType === 'month' ? 'month' : 'week')
    },
    handleNext() {
      this.handleDateChange(1, this.viewType === 'month' ? 'month' : 'week')
    },
    backToday() {
      this.currentDate = new Date()
    },
    toggleView() {
      this.viewType = this.viewType === 'month' ? 'week' : 'month'
    }
  }
}
</script>

<style scoped lang="scss">
@use './index.scss';
</style>