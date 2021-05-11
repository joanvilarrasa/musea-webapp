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
        totalChartData: {
            xcategories: [],
            series: [],
        },
        museumsChartData: {
            xcategories: [],
            series: [],
        },
        totalData: {
            totalMuseums: 0,
            totalExpositions: 0,
            totalPieces: 0,
            totalUsers: 0,
            totalQuizzes: 0,
        },
        museumsRepo: [],
        expositionsRepo: [],
        piecesRepo: [],
        usersRepo: [],
        quizzesRepo: [],
    }),
    methods: {
        getTotals: function(){
            DataProvider("MUSEUMS", "MUSEUMS").then((res) => {
                this.totalData.totalMuseums = res.museums.length;
                res.museums.forEach(museum => {
                    this.museumsRepo.push(museum);
                    this.totalData.totalExpositions += museum.expositions.length;
                    museum.expositions.forEach((expo) => {
                        let ids = [museum._id , expo];                     
                        DataProvider("MUSEUMS", "OBRES", ids).then((res) => {
                            this.expositionsRepo.push(res.exposition)
                            this.totalData.totalPieces += res.exposition.works.length;
                            this.totalChartData = this.buildTotalChartData(this.totalData);
                            res.exposition.works.forEach(piece => {
                                this.piecesRepo.push(piece);
                            });
                        })
                    })
                });
                DataProvider("USERS", "USERS").then((res) => {
                    this.totalData.totalUsers += res.users.length;
                    res.users.forEach((user) => {
                        this.usersRepo.push(user);
                        DataProvider("USERS", "USER_LIKES", user.username).then((res) => {
                            res.likes.forEach((p) => {
                                let likedPiece = this.piecesRepo.find(piece => piece._id == p.artworkId);
                                if(likedPiece != undefined) likedPiece.nLikes == undefined ? likedPiece.nLikes = 1 : likedPiece.nLikes++;
                            })
                        })
                        DataProvider("USERS", "USER_FAVS", user.username).then((res) => {
                            res.favourites.forEach((m) => {
                                let favMuseum = this.museumsRepo.find(museum => museum._id == m.museumId);
                                if(favMuseum != undefined) favMuseum.nFavs == undefined ? favMuseum.nFavs = 1 : favMuseum.nFavs++;
                            })
                            this.museumsChartData = this.buildMuseumsChartData(this.museumsRepo);
                        })
                        DataProvider("USERS", "USER_VISITED", user.username).then((res) => {
                            res.visited.forEach((m) => {
                                let visMuseum = this.museumsRepo.find(museum => museum._id == m.museumId);
                                if(visMuseum != undefined) visMuseum.nVis == undefined ? visMuseum.nVis = 1 : visMuseum.nVis++;
                            })
                            this.museumsChartData = this.buildMuseumsChartData(this.museumsRepo);
                        })
                    })
                })
            })
            DataProvider("QUIZZES", "QUIZZES").then((res) => {
                res.quizzes.forEach((q) => this.quizzesRepo.push(q));
                this.totalData.totalQuizzes += res.quizzes.length;
            })
        },
        buildTotalChartData: function(totalsData) {
            let newChartData = {
                xcategories: ["Museus", "Exposicions", "Obres", "Quizzes", "Usuaris"],
                series: [{
                    name: 'total',
                    data: [totalsData.totalMuseums, totalsData.totalExpositions, totalsData.totalPieces, totalsData.totalQuizzes, totalsData.totalUsers]
                }]
            }
            return newChartData;
        },
        buildMuseumsChartData: function(museumsData) {
            let newChartData = {
                xcategories: [],
                series: [
                    { name: 'Favs', data: [] },
                    { name: 'Visitas', data: [] }
                ]
            }
            museumsData.forEach((m) => {
                newChartData.xcategories.push(m.name);
                newChartData.series[0].data.push(m.nFavs != undefined ? m.nFavs : 0)
                newChartData.series[1].data.push(m.nVis != undefined ? m.nVis : 0)
            })
            return newChartData;
        }
    },
    mounted() {
        this.getTotals();
    }
}
</script>

<style lang="scss" src="./Home.scss"></style>