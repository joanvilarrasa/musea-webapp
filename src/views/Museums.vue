<template>
    <div class="view-container">
        <div class="table-container">
            <v-simple-table fixed-header light>
                
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
                            <th> QR</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="museum in this.museums" :key="museum.id">
                            <td> <router-link :to="{ name: 'expositions', params: { id_museu: museum._id }}" replace> {{museum.name}} </router-link> </td>
                            <td> {{museum.address}} </td>
                            <td> {{museum.city}} </td>
                            <td> {{museum.country}} </td>
                            <td> {{museum.expositions.length }} </td>
                            <td><v-img lazy-src="" max-height="100" max-width="200" :src="museum.image"></v-img></td>
                            <td> <button class="delete" @click="esborrarMuseu(museum._id)"> <router-link :to="{ name: 'Museums'}"><v-img :src="require('../assets/delete-icon.png')"   width ="25px" height="25px"/></router-link></button> <button class="delete"> <router-link :to="{ name: 'MuseumEdit', params: { id_museu: museum._id, museum_nom: museum.name, museum_city: museum.city, museum_adresss: museum.address, museum_country: museum.country}}"> <v-img :src="require('../assets/images.png')"   width ="25px" height="25px"/> </router-link></button> </td>
                            <td> <vue-qr :text="museum._id"  qid="museum_qr" :size="100" ></vue-qr></td>
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
import VueQr from 'vue-qr'
 //https://www.npmjs.com/package/vue-qr

export default {
    name: "museums",
    components:{
        VueQr,
    },
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

<style >
table {
    overflow: visible;
    width: 100%;
    background-color:rgb(206, 216, 253);
  
}
td {
    width: 15%;
    border-top: 1px solid rgb(10, 10, 10);
    background-color:rgb(206, 216, 253);
}
th {
  height: 20px;
  background-color:rgb(206, 216, 253);
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