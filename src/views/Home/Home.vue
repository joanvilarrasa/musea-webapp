<template src="./Home.html"></template>

<script>
import { DataProvider } from '@/data-providers/_Index.js';

// Components
import AppBarChart from '@/components/AppBarChart/AppBarChart.vue';

export default {
    name: 'Home',
    components: {
      AppBarChart,
    },
    data: () => ({
        chartData: {
            xcategories: [],
            series: [],
        },
        totalChartData: {
            totalMuseums: 0,
            totalExpositions: 0,
            totalPieces: 0,
            totalUsers: 0,
        }
    }),
    methods: {
        getTotals: function(){
            DataProvider("MUSEUMS", "MUSEUMS").then((res) => {
                this.totalChartData.totalMuseums = res.museums.length;
                res.museums.forEach(museum => {
                    this.totalChartData.totalExpositions += museum.expositions.length;
                    museum.expositions.forEach((expo) => {
                        let ids = [museum._id , expo];                     
                        DataProvider("MUSEUMS", "OBRES", ids).then((res) => {
                            this.totalChartData.totalPieces += res.exposition.works.length;
                            this.chartData = this.buildChartData(this.totalChartData);
                        })
                    })
                });
            })
            DataProvider("USERS", "USERS").then((res) => {
                this.totalChartData.totalUsers += res.users.length;
            })
        },
        buildChartData: function(totalsData) {
            let newChartData = {
                xcategories: ["Museus", "Exposicions", "Obres", "Usuaris"],
                series: [{
                    name: 'total',
                    data: [totalsData.totalMuseums, totalsData.totalExpositions, totalsData.totalPieces, totalsData.totalUsers]
                }]
            }
            return newChartData;
        }
    },
    mounted() {
        this.getTotals();
    }
}
</script>

<style lang="scss" src="./Home.scss"></style>