<template>
    <div class="view-container">
        <div class="table-container">
            <v-simple-table dark class="elevation-1">
                <table>
                    <thead>
                        <tr>
                            <th>Nom Obres</th> 
                            <th>Autor</th> 
                            <th> Tipus</th> 
                            <th> Puntuació </th> 
                            <th> Imatge </th> 
                            <th> Manage </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="obra in this.obres" :key="obra.id">
                            <td> {{obra.title}}  </td>
                            <td> {{obra.author}} </td>
                            <td> {{obra.type}} </td>
                            <td> {{obra.score}} </td>
                            <td><v-img lazy-src="" max-height="100" max-width="200" :src="obra.image"></v-img></td>
                            <td> <button class="delete" v-on:click="esborrarObra(obra._id)"> <v-img :src="require('../assets/delete-icon.png')"   width ="25px" height="25px"/></button> <button class="delete"> <router-link :to="{ name: 'ObraEdit', params: { id_obra: obra._id, obra_titol: obra.title, obra_autor: obra.author, obra_tipus: obra.type}}"> <v-img :src="require('../assets/images.png')"   width ="25px" height="25px"/> </router-link></button> </td>
                        </tr>
                    </tbody>  
                </table>
            
            </v-simple-table>
            <button class="submit">
                <router-link :to="{ name: 'AddObra', params: { id_museu: this.$route.params.id_museu, id_expo: this.$route.params.id_exposition}}">
                Add Obra
                </router-link>
            </button>
        </div>
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
        obtenir_obres: function(id_museu, id_exposition){
            let ids = [id_museu , id_exposition]
            DataProvider("MUSEUMS", "OBRES", ids).then((res) => {
                console.log(res)
                this.obres = res.exposition.works;
                
            })

        },
        esborrarObra: function(id_obra){
            let ids =  [id_obra, this.$route.params.id_museu, this.$route.params.id_exposition]
            DataProvider("MUSEUMS", "OBRA_DELETE", ids).then((res) => {
                console.log(res)
                //this.obres=res.exposition.works;
                this.obtenir_obres(this.$route.params.id_museu, this.$route.params.id_exposition);

            })

        },
        

    },
    mounted() {
        
        this.obtenir_obres(this.$route.params.id_museu, this.$route.params.id_exposition);
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
.delete {
  background-color: #bdbdbd;
  color: black;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  float: center;
}
</style>