<template>
  <div class="jl-cycle-select flex items-center" style="gap: 10px">
    <jl-form.select :options="planCycleOptions" v-model="internalValue[internalProps.cycle]"></jl-form.select>

    <el-date-picker
      value-format="yyyy-MM-dd"
      :clearable="false"
      placeholder="请选择"
      v-if="['NO_REPEAT'].includes(internalValue[internalProps.cycle])"
      v-model="internalValue[internalProps.date]"
      type="date">
    </el-date-picker>

    <jl-form.select
      multiple
      v-if="['YEARLY'].includes(internalValue[internalProps.cycle])"
      :options="monthOptions"
      v-model="internalValue[internalProps.month]"></jl-form.select>

    <jl-form.select
      multiple
      v-if="['WEEKLY'].includes(internalValue[internalProps.cycle])"
      :options="weekOptions"
      v-model="internalValue[internalProps.week]"></jl-form.select>

    <jl-form.select
      multiple
      v-if="['YEARLY', 'MONTHLY'].includes(internalValue[internalProps.cycle])"
      :options="dayOptions"
      v-model="internalValue[internalProps.day]"></jl-form.select>

    <el-time-select
      ref="timeSelectRef"
      style="width: 150px"
      :clearable="false"
      placeholder="请选择"
      v-model="internalValue[internalProps.time]"
      :picker-options="timeSelectPickerOptions">
    </el-time-select>
  </div>
</template>
<script>
import COM_PREFIX from '@jl/web-ui/src/config';
import modelMixin from '@jl/web-ui/src/mixin/model';
import jlFormSelect from '../select/index.vue';

const PLAN_CYCLE_DEFAULT_PROPS = {
  cycle: 'cycle',

  month: 'month',
  date: 'date',
  week: 'week',
  day: 'day',
  time: 'time',
};
export default {
  name: COM_PREFIX + 'Form.PlanCycle',
  mixins: [modelMixin],
  components: {
    'jl-form.select': jlFormSelect,
  },
  props: {
    value: { type: Object, default: () => {} },
    props: { type: Object, default: () => PLAN_CYCLE_DEFAULT_PROPS },

    timeSelectPickerOptions: {
      type: Object,
      default: () => {
        return {
          start: '00:00',
          step: '00:15',
          end: '24:00',
        };
      },
    },
  },
  computed: {
    internalProps() {
      return {
        ...PLAN_CYCLE_DEFAULT_PROPS,
        ...this.props,
      };
    },
    monthOptions() {
      return Array.from({ length: 12 }, (_, index) => ({
        label: `${index + 1}月`,
        value: `${index + 1}`,
      }));
    },
    dayOptions() {
      return Array.from({ length: 31 }, (_, index) => ({
        label: `${index + 1}号`,
        value: `${index + 1}`,
      }));
    },
  },
  data() {
    return {
      planCycleOptions: [
        {
          label: '不重复',
          value: 'NO_REPEAT',
        },
        {
          label: '每天',
          value: 'DAILY',
        },
        {
          label: '每周',
          value: 'WEEKLY',
        },
        {
          label: '每月',
          value: 'MONTHLY',
        },
        {
          label: '每年',
          value: 'YEARLY',
        },
      ],
      weekOptions: [
        {
          label: '周一',
          value: '1',
        },
        {
          label: '周二',
          value: '2',
        },
        {
          label: '周三',
          value: '3',
        },
        {
          label: '周四',
          value: '4',
        },
        {
          label: '周五',
          value: '5',
        },
        {
          label: '周六',
          value: '6',
        },
        {
          label: '周日',
          value: '7',
        },
      ],
    };
  },
};
</script>
