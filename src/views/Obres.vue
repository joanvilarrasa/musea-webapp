<template>
  <div class="Obres">
    <h1>Obres Page</h1>
    <v-app>
    <v-simple-table dark
    class="elevation-1">
    
        <table>
            <thead>
                <tr>
                    <th>Nom Obres</th> 
                    <th>Autor</th> 
                    <th> Puntuació </th> 
                    <th> Imatge </th> 
                </tr>
            </thead>
            <tbody>
                <tr v-for="obra in this.obres" :key="obra.id">
                    <!--<router-link :to="{ name: 'obraInfo', params: { id_museu: museum.id }}"> </router-link>-->
                    <td> {{obra.title}}  </td>
                    <td> {{obra.author}} </td>
                    <td> {{obra.score}} </td>
                    <td><v-img lazy-src="" max-height="100" max-width="150" :src="obra.image"></v-img></td>
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
                console.log(res)
                this.obres = res.exposition.works;
                
            })

        }

    },
    mounted() {
        
        this.obtenir_expos(this.$route.params.id_museu, this.$route.params.id_exposition);
    }
}

</script>

<style >
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