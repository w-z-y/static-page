<template>
  <div class="my-echarts" ref="chart" :style="{ width, height }"></div>
</template>

<script>
import echarts from 'echarts'
import COM_PREFIX from '@jl/web-ui/src/config';

export default {
  name: COM_PREFIX + 'Echarts',
  props: {
    option: { type: Object, required: true },
    width: { type: String, default: '100%' },
    height: { type: String, default: '400px' },
  },
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.initChart();
  },
  watch: {
    option: {
      handler(newVal) {
        if (this.chart && newVal) {
          this.chart.setOption(newVal, true);
        }
      },
      deep: true,
    },
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
      this.chart = null;
    }
  },
  methods: {
    initChart() {
      if (this.chart) {
        this.chart.dispose();
      }
      this.chart = echarts.init(this.$refs.chart);
      if (this.option) {
        this.chart.setOption(this.option, true);
      }

      // 监听窗口尺寸变化
      window.addEventListener('resize', this.resizeChart);

      // 监听容器尺寸变化
      this.resizeObserver = new ResizeObserver(() => {
        this.resizeChart();
      });
      this.resizeObserver.observe(this.$refs.chart);
    },
    resizeChart() {
      if (this.chart) {
        this.chart.resize();
      }
    },
  },
  destroyed() {
    // 移除窗口尺寸监听
    window.removeEventListener('resize', this.resizeChart);

    // 移除容器尺寸监听
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }

    if (this.chart) {
      this.chart.dispose();
      this.chart = null;
    }
  },
};
</script>
<style lang="scss" scoped>
.my-echarts {
  min-width: 400px;
}
</style>
