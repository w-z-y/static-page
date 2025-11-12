# ECharts 图表

ECharts 组件是基于 ECharts 库的 Vue 封装，用于创建各种类型的图表，包括折线图、柱状图、饼图、散点图等。支持响应式、主题配置、事件处理等功能。

## 基本用法

最基础的图表用法，通过`option`属性配置图表选项。
:::demo

```vue
<template>
  <jl-echarts :option="chartOption" style="height: 400px;"></jl-echarts>
</template>

<script>
export default {
  data() {
    return {
      chartOption: {
        title: {
          text: '基础折线图',
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
          },
        ],
      },
    };
  },
};
</script>
```

:::

## 柱状图

创建柱状图展示数据。
:::demo

```vue
<template>
  <jl-echarts :option="barOption" style="height: 400px;"></jl-echarts>
</template>

<script>
export default {
  data() {
    return {
      barOption: {
        title: {
          text: '月度销售数据',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        legend: {
          data: ['销售额', '利润'],
        },
        xAxis: {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: '销售额',
            type: 'bar',
            data: [120, 200, 150, 80, 70, 110],
          },
          {
            name: '利润',
            type: 'bar',
            data: [20, 40, 30, 15, 12, 25],
          },
        ],
      },
    };
  },
};
</script>
```

:::

## 饼图

创建饼图展示占比数据。
:::demo

```vue
<template>
  <jl-echarts :option="pieOption" style="height: 400px;"></jl-echarts>
</template>

<script>
export default {
  data() {
    return {
      pieOption: {
        title: {
          text: '用户分布',
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        series: [
          {
            name: '用户类型',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1048, name: '搜索引擎' },
              { value: 735, name: '直接访问' },
              { value: 580, name: '邮件营销' },
              { value: 484, name: '联盟广告' },
              { value: 300, name: '视频广告' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      },
    };
  },
};
</script>
```

:::

## 散点图

创建散点图展示数据分布。
:::demo

```vue
<template>
  <jl-echarts :option="scatterOption" style="height: 400px;"></jl-echarts>
</template>

<script>
export default {
  data() {
    return {
      scatterOption: {
        title: {
          text: '身高体重分布',
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            return `身高: ${params.data[0]}cm<br/>体重: ${params.data[1]}kg`;
          },
        },
        xAxis: {
          type: 'value',
          name: '身高 (cm)',
          scale: true,
        },
        yAxis: {
          type: 'value',
          name: '体重 (kg)',
          scale: true,
        },
        series: [
          {
            name: '身高体重',
            type: 'scatter',
            data: [
              [170, 65],
              [180, 75],
              [165, 55],
              [175, 70],
              [185, 80],
              [160, 50],
              [190, 85],
              [155, 45],
              [195, 90],
              [150, 40],
            ],
            symbolSize: 10,
            itemStyle: {
              color: '#409eff',
            },
          },
        ],
      },
    };
  },
};
</script>
```

:::

## 动态数据更新

可以动态更新图表数据。

:::demo

```vue
<template>
  <div>
    <jl-button @click="updateData" style="margin-bottom: 10px" primary>更新数据</jl-button>
    <jl-echarts :option="dynamicOption" style="height: 400px;"></jl-echarts>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dynamicOption: {
        title: {
          text: '动态数据图表',
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true,
          },
        ],
      },
    };
  },
  methods: {
    updateData() {
      // 生成新的随机数据
      const newData = Array.from({ length: 7 }, () => Math.floor(Math.random() * 1000) + 500);
      this.dynamicOption.series[0].data = newData;
    },
  },
};
</script>
```

:::

## 多系列图表

创建包含多个数据系列的图表。

:::demo

```vue
<template>
  <jl-echarts :option="multiSeriesOption" style="height: 400px;"></jl-echarts>
</template>

<script>
export default {
  data() {
    return {
      multiSeriesOption: {
        title: {
          text: '多系列数据对比',
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: ['系列A', '系列B', '系列C'],
        },
        xAxis: {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: '系列A',
            type: 'line',
            data: [120, 132, 101, 134, 90, 230],
          },
          {
            name: '系列B',
            type: 'line',
            data: [220, 182, 191, 234, 290, 330],
          },
          {
            name: '系列C',
            type: 'line',
            data: [150, 232, 201, 154, 190, 330],
          },
        ],
      },
    };
  },
};
</script>
```

:::

## 自定义配置

可以自定义图表的样式和行为。

:::demo

```vue
<template>
  <jl-echarts :option="customOption" :loading="loading" :loading-options="loadingOptions" style="height: 400px;"> </jl-echarts>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      loadingOptions: {
        text: '数据加载中...',
        color: '#409eff',
        textColor: '#000',
        maskColor: 'rgba(255, 255, 255, 0.8)',
        zlevel: 0,
      },
      customOption: {
        title: {
          text: '自定义配置图表',
          textStyle: {
            color: '#409eff',
            fontSize: 16,
          },
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(50, 50, 50, 0.9)',
          borderColor: '#409eff',
          textStyle: {
            color: '#fff',
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisLine: {
            lineStyle: {
              color: '#409eff',
            },
          },
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#409eff',
            },
          },
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true,
            lineStyle: {
              color: '#409eff',
              width: 3,
            },
            itemStyle: {
              color: '#409eff',
              borderColor: '#fff',
              borderWidth: 2,
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(64, 158, 255, 0.3)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(64, 158, 255, 0.1)',
                  },
                ],
              },
            },
          },
        ],
      },
    };
  },
  mounted() {
    // 模拟数据加载
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  },
};
</script>
```

:::

## 组合图表

可以创建包含多种图表类型的组合图表。

:::demo

```vue
<template>
  <jl-echarts :option="comboOption" style="height: 500px;"></jl-echarts>
</template>

<script>
export default {
  data() {
    return {
      comboOption: {
        title: {
          text: '组合图表示例',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999',
            },
          },
        },
        legend: {
          data: ['蒸发量', '降水量', '平均温度'],
        },
        xAxis: [
          {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisPointer: {
              type: 'shadow',
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: '水量',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: '{value} ml',
            },
          },
          {
            type: 'value',
            name: '温度',
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: '{value} °C',
            },
          },
        ],
        series: [
          {
            name: '蒸发量',
            type: 'bar',
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
          },
          {
            name: '降水量',
            type: 'bar',
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
          },
          {
            name: '平均温度',
            type: 'line',
            yAxisIndex: 1,
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
          },
        ],
      },
    };
  },
};
</script>
```

:::

### Attributes

| 参数   | 说明             | 类型   | 可选值              | 默认值 |
| ------ | ---------------- | ------ | ------------------- | ------ |
| option | ECharts 配置选项 | object | —                   | {}     |
| width  | 图表宽度         | string | 任意合法 CSS 宽度值 | 100%   |
| height | 图表高度         | string | 任意合法 CSS 高度值 | 400px  |
