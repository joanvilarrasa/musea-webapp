<template>
  <div class="Exposition">
    <h1>Obres Page</h1>
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
                <tr v-for="obra in this.orbes" :key="obra.id">
                    <!--<router-link :to="{ name: 'obraInfo', params: { id_museu: museum.id }}"> </router-link>-->
                    <td> {{obra.name}}  </td>
                    <td> Under Construction </td>
                    <td><v-img lazy-src="https://picsum.photos/id/11/10/6" max-height="150" max-width="250" src="https://museaimages1.s3.amazonaws.com/vialactea.jfif"></v-img></td>
                </tr>
            </tbody>  
        </table>
    
    </v-simple-table>
    <button class="submit">
        <router-link :to="{ name: 'AddObra', params: { id_museu: this.$route.params.id_museu, id_expo: this.$route.params.id_exposition}}">
        Add Obra
        </router-link>
    </button>
    </v-app>
    
  </div>
</template>

<script>
import { DataProvider } from "@/data-providers/_Index.js"
 

export default {
    name: "obres",
    data(){
        return{
            obres: [],
        }
    },
    methods: {
        obtenir_expos: function(id_museu, id_exposition){
            let ids = [id_museu , id_exposition]
            DataProvider("MUSEUMS", "OBRES", ids).then((res) => {

                this.obres = res.works;
                console.log(this.obres)
            })

        }

    },
    mounted() {
        
        this.obtenir_expos(this.$route.params.id_museu, this.$route.params.id_exposition);
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