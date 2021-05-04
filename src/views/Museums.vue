<template>
    <div class="view-container">
        <div class="table-container">
            <v-simple-table dark
            class="elevation-1">
                
                <table>
                    <thead>
                        <tr>
                            <th>Nom Museu</th>
                            <th> Adreça </th>
                            <th> Ciutat </th>
                            <th> Pais </th>
                            <th> Nombre d'exposicions </th>
                            <th> Imatge </th>
                            <th> Manage </th> 
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="museum in this.museums" :key="museum.id">
                            <td> <router-link :to="{ name: 'expositions', params: { id_museu: museum._id }}" replace> {{museum.name}} </router-link> </td>
                            <td> {{museum.address}} </td>
                            <td> {{museum.city}} </td>
                            <td> {{museum.country}} </td>
                            <td> {{museum.expositions.length }} </td>
                            <td><v-img lazy-src="" max-height="150" max-width="250" :src="museum.image"></v-img></td>
                            <td> <button class="delete" @click="esborrarMuseu(museum._id)">  <router-link :to="{ name: 'Museums'}"><v-img :src="require('../assets/delete-icon.png')"   width ="25px" height="25px"/></router-link></button> <button class="delete"> <router-link :to="{ name: 'MuseumEdit', params: { id_museu: museum._id, museum_nom: museum.name, museum_city: museum.city, museum_adresss: museum.address, museum_country: museum.country}}"> <v-img :src="require('../assets/images.png')"   width ="25px" height="25px"/> </router-link></button> </td>
                        </tr>
                    </tbody>  
                </table>
            </v-simple-table>
            <button class="submit">
                <router-link to="/museums/add">
                Add Museum
                </router-link>
            </button>
        </div>
    </div>
</template>

<script>
import { DataProvider } from "@/data-providers/_Index.js"

 

export default {
    name: "museums",
    data(){
        return{
            museums: null,
        }
    },
    methods: {
        obtenir_museums: function(){
            DataProvider("MUSEUMS", "MUSEUMS", {}).then((res) => {
                this.museums = res.museums;
            })

        },
        esborrarMuseu: function(id_museu){
            
            DataProvider("MUSEUMS", "MUSEUMS_DELETE", id_museu).then((res) => {
                this.obtenir_museums();
            })
        }

    },
    mounted() {
        this.obtenir_museums();
    }
}

</script>

<style>
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