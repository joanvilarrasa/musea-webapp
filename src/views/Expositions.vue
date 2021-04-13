<template>
  <div class="Exposition">
    <h1>Expositions Page</h1>
    <v-app>
    <v-simple-table dark
    class="elevation-1">
    
        <table>
            <thead>
                <tr>
                    <th>Nom exposicio</th> |
                    <th> Nombre d'obres </th> | 
                    <th> Imatge </th> 
                </tr>
            </thead>
            <tbody>
                 <tr v-for="expo in this.expositions" :key="expo.id">
                    <td> <router-link :to="{ name: 'expositions', params: { id_museu: museum.id }}"> {{expo.name}} </router-link> </td>
                    <td> Under Construction </td>
                    <td><v-img lazy-src="https://picsum.photos/id/11/10/6" max-height="150" max-width="250" src="https://museaimages1.s3.amazonaws.com/vialactea.jfif"></v-img></td>
                </tr>
               
                
            </tbody>  
        </table>
    
    </v-simple-table>
    <button class="submit">
        <router-link :to="{ name: 'AddExpo', params: { id_museu: this.$route.params.id_museu }}">
        Add Expo
        </router-link>
    </button>
    </v-app>
    
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

                this.expositions = res.expositions;
                console.log(this.expositions)
            })

        }

    },
    mounted() {
       
        this.obtenir_expos(this.$route.params.id_museu);
    }
}

</script>

<style >
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