<template src="./Home.html"></template>

<script>
import { DataProvider } from '@/data-providers/_Index.js';

// Components
import AppBarChart from '@/components/AppBarChart/AppBarChart.vue';
import AppSpiderChart from '@/components/AppSpiderChart/AppSpiderChart.vue';

export default {
    name: 'Home',
    components: {
      AppBarChart,
      AppSpiderChart,
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
        piecesChartData: {
            xcategories: [],
            series: [],
        },
        usersChartData: {
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
                                let newPiece = JSON.parse(JSON.stringify(piece))
                                DataProvider("MUSEUMS", "OBRA_COMMENTS", piece._id).then((res) => {
                                    newPiece.nComments = res.comments.length
                                });
                                this.piecesRepo.push(newPiece);
                            });
                        })
                    })
                });
                DataProvider("USERS", "USERS").then((res) => {
                    this.totalData.totalUsers += res.users.length;
                    res.users.forEach((user) => {
                        DataProvider("USERS", "USER_INFO", user.email).then((res) => {
                            this.usersRepo.push(res.user);
                            res.user.likes.forEach((p) => {
                                let likedPiece = this.piecesRepo.find(piece => piece._id == p);
                                if(likedPiece != undefined) likedPiece.nLikes == undefined ? likedPiece.nLikes = 1 : likedPiece.nLikes++;
                            })
                            this.piecesChartData = this.buildPiecesChartData(this.piecesRepo);

                            res.user.favourites.forEach((m) => {
                                let favMuseum = this.museumsRepo.find(museum => museum._id == m);
                                if(favMuseum != undefined) favMuseum.nFavs == undefined ? favMuseum.nFavs = 1 : favMuseum.nFavs++;
                            })
                            this.museumsChartData = this.buildMuseumsChartData(this.museumsRepo);

                            res.user.visited.forEach((m) => {
                                let visMuseum = this.museumsRepo.find(museum => museum._id == m);
                                if(visMuseum != undefined) visMuseum.nVis == undefined ? visMuseum.nVis = 1 : visMuseum.nVis++;
                            })
                            this.museumsChartData = this.buildMuseumsChartData(this.museumsRepo);
                            this.usersChartData = this.buildUsersChartData(this.usersRepo);
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
        },
        buildPiecesChartData: function(piecesData) {
            let newChartData = {
                xcategories: [],
                series: [
                    { name: 'Likes', data: [] },
                    { name: 'Comments', data: [] },
                ]
            }
            piecesData.forEach((p) => {
                newChartData.xcategories.push(p.title);
                newChartData.series[0].data.push(p.nLikes != undefined ? p.nLikes : 0)
                newChartData.series[1].data.push(p.nComments != undefined ? p.nComments : 0)
            })
            return newChartData;
        },
        buildUsersChartData: function(usersData) {
            let newChartData = {
                xcategories: [],
                series: [
                    { name: 'Points', data: [] },
                    { name: 'Likes', data: [] },
                    { name: 'Favs', data: [] },
                    { name: 'Visited', data: [] },
                ]
            }
            let sortedUsersArray = usersData.sort(function (a, b) {
                return a.points > b.points;
            });
            for(let i=0; i<10; i++) {
                newChartData.xcategories.push(sortedUsersArray[i].userId);
                newChartData.series[0].data.push(sortedUsersArray[i].points != undefined ? sortedUsersArray[i].points : 0)
                newChartData.series[1].data.push(sortedUsersArray[i].likes.length != undefined ? sortedUsersArray[i].likes.length : 0)
                newChartData.series[2].data.push(sortedUsersArray[i].favourites.length != undefined ? sortedUsersArray[i].favourites.length : 0)
                newChartData.series[3].data.push(sortedUsersArray[i].visited.length != undefined ? sortedUsersArray[i].visited.length : 0)

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