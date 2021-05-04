<template>
    <div class="view-container">
        <div class="table-container">
            <v-simple-table dark class="elevation-1">
                <table>
                    <thead>
                        <tr>
                            <th>Nom exposicio</th> 
                            <th> Nombre d'obres </th> 
                            <th> Sala </th> 
                            <th> Imatge </th>
                            <th> Manage </th> 
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="expo in this.expositions" :key="expo._id">
                            <td> <router-link :to="{ name: 'obres', params: { id_exposition: expo._id }}"> {{expo.name}} </router-link> </td>
                            <td> {{expo.works.length}} </td>
                            <td> {{expo.room}} </td>
                            <td><v-img lazy-src="" max-height="100" max-width="150" :src="expo.image"></v-img></td>
                            <td> <button class="delete" @click="esborrarExpo(expo._id)"> <v-img :src="require('../assets/delete-icon.png')"   width ="25px" height="25px"/> </button> <button class="delete"> <router-link :to="{ name: 'ExpoEdit', params: { id_exposition: expo._id, expo_nom: expo.name}}"> <v-img :src="require('../assets/images.png')"   width ="25px" height="25px"/> </router-link></button></td>
                        </tr>
                    </tbody>  
                </table>
            
            </v-simple-table>
            <button class="submit">
                <router-link :to="{ name: 'AddExpo', params: { id_museu: this.$route.params.id_museu }}">
                Add Expo
                </router-link>
            </button>
        </div>
    </div>
</template>

<script>
import { DataProvider } from "@/data-providers/_Index.js"
 

export default {
    name: "expositions",
    data(){
        return{
            expositions: [],
        }
    },
    methods: {
        obtenir_expos: function(id_museu){
            
            DataProvider("MUSEUMS", "EXPOSITIONS", id_museu).then((res) => {
                console.log(res)
                this.expositions = res.museum.expositions;
                //console.log(this.expositions)
            })

        },
        esborrarExpo: function(id_expo){
            console.log(id_expo)
            let ids =  [id_expo, this.$route.params.id_museu]
            DataProvider("MUSEUMS", "EXPO_DELETE", ids).then((res) => {
                console.log(res)
                this.obtenir_expos(this.$route.params.id_museu);
            })
            
             
        }

    },
    mounted() {
       
        this.obtenir_expos(this.$route.params.id_museu);
    }
}

</script>

<style scoped>
table {
   
  width: 100%;

  border: 1px solid white;
}
td {
    width: 20%;
}
th {
  border: 1px solid white;
  height: 15px;
}
.submit {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  float: left;
}
</style>