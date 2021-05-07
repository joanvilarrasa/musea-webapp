<template>
    <div class="view-container">
        <div class="table-container">
            <v-simple-table fixed-header light
            class="elevation-1">
                
                <table>
                    <thead>
                        <tr>
                            <th>Pregunta</th>
                            <th> Resposta 1: </th>
                            <th> Resposta 2: </th>
                            <th> Resposta 3: </th>
                            <th> Resposta 4: </th>
                            <th> Points: </th>
                            <th> Imatge: </th>
                            <!--<th> Manage </th>-->
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="quizz in this.quizzes" :key="quizz._id">
                            <td> {{quizz.question.ca }} </td>
                            <td> {{ quizz.answers[0].ca}} </td>
                            <td> {{ quizz.answers[1].ca }} </td> 
                            <td> {{ quizz.answers[2].ca }} </td>
                            <td> {{ quizz.answers[3].ca }} </td>
                            <td> {{ quizz.points}}</td>
                            <td><v-img lazy-src="" max-height="100" max-width="200" :src="quizz.image"></v-img></td>
                            <!--<td> <button class="delete" @click="esborrarQuizz(quizz._id)"> <router-link :to="{ name: 'Quizzes'}"><v-img :src="require('../assets/delete-icon.png')"   width ="25px" height="25px"/></router-link></button> <button class="delete"> <router-link :to="{ name: 'EditQuizz', params: { id_quizz: quizz._id, quiz_pregunta: quizz.question, points: quizz.points}}"> <v-img :src="require('../assets/images.png')"   width ="25px" height="25px"/> </router-link></button> </td>-->
                        </tr>
                    </tbody>  
                </table>
            </v-simple-table>
            <button class="submit">
                <router-link to="/quizzes/add">
                Add Quizz
                </router-link>
            </button>
        </div>
    </div>
</template>

<script>
import { DataProvider } from "@/data-providers/_Index.js"
//https://www.npmjs.com/package/vue-qr

export default {
    name: "quizzes",
    data(){
        return{
            quizzes: null,
        }
    },
    methods: {
        obtenir_quizzes: function(){
            DataProvider("QUIZZES", "QUIZZES", {}).then((res) => {
                this.quizzes = res.quizzes;
            })
        },
        esborrarQuizz: function(id_quizz){
            DataProvider("QUIZZES", "QUIZZES_DELETE", id_quizz).then((res) => {
                this.obtenir_quizzes();
            })
        }
    },
    mounted() {
        this.obtenir_quizzes();
    }
}

</script>

<style>
table {
   overflow: visible;
  width: 100%;
  border: 20px solid white;
  
}
td {
    width: 20%;
}
th {
  border: 1px solid white;
  height: 5px;
}
.submit {
  background-color:rgb(106, 118, 171);
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  float: left;
}
</style>