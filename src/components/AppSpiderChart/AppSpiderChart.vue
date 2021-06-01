<template src="./AppSpiderChart.html"></template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
    name: 'AppSpiderChart',
    components: {
      apexcharts: VueApexCharts,
    },
    props: {
      chartData: Object,
    },
    data: () => ({
      chartOptions: {
        chart: {
          id: 'basic-bar'
        },
        xaxis: {
          categories: []
        },
        fill: {
          opacity: 0.3,
          type: 'solid',
          colors: ["blue"]
        },
        stroke: {
          show: true,
          width: 3,
          colors: ["blue"],
          dashArray: 0
        },
        yaxis: {
          show: false,
        },
        markers: {
          size: 5,
          hover: {
            size: 10
          },
          colors: ["blue"],
        },
      },
      series: []
    }),
    watch: {
      chartData: function () {
        this.refresh_chart_data();
      },
    },
    methods: {
      refresh_chart_data: function() {
        let newChartOptions = JSON.parse(JSON.stringify(this.chartOptions));
        newChartOptions.xaxis.categories = this.chartData.xcategories;
        this.chartOptions = newChartOptions;
        this.series = this.chartData.series;
      }
    },
    mounted() {
      this.refresh_chart_data();
    }
}
</script>

<style lang="scss" src="./AppSpiderChart.scss"></style>