<template>
  <div class="museums">
    <h1>Museums Page</h1>
    <v-app>
    <v-simple-table dark
    class="elevation-1">
    
        <table>
            <thead>
                <tr>
                    <th>Nom Museu</th>
                    <th> Adreça </th>
                    <th> Ciutat </th>
                    <th> Pais </th>
                    <th> Nombre d'obres </th> 
                    <th> Imatge </th> 
                </tr>
            </thead>
            <tbody>
                <tr v-for="museum in this.museums" :key="museum.id">
                    <td> {{museum.name}} </td>
                    <td> {{museum.address}} </td>
                    <td> {{museum.city}} </td>
                    <td> {{museum.country}} </td>
                    <td> Under Construction </td>
                    <td><v-img lazy-src="https://picsum.photos/id/11/10/6" max-height="150" max-width="250" src="https://museaimages1.s3.amazonaws.com/vialactea.jfif"></v-img></td>
                </tr>
            </tbody>  
        </table>
    
    </v-simple-table>
    <button class="submit">
        <router-link to="/museums/add">
        Add Museum
        </router-link>
    </button>
    </v-app>
    
  </div>
</template>

<script>
import { DataProvider } from "@/data-providers/_Index.js"
 

export default {
    name: "museums",
    data(){
        return{
            museums: [],
        }
    },
    methods: {
        obtenir_museums: function(){

            DataProvider("MUSEUMS", "MUSEUMS", {}).then((res) => {
                this.museums = res.museums;
                console.log(this.museums)
            })

        }

    },
    mounted() {
        this.obtenir_museums();
    }
}

</script>

<style scoped>
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