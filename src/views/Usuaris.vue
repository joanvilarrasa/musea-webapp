<template>
    <div class="view-container">
        <div class="table-container">
            <v-simple-table light fixed-header>
                <table>
                    <thead>
                        <tr>
                            <th> Username </th>
                            <th>Nom usuari</th>
                            <th> Premium </th>
                            <th> Likes </th>
                            <th> Favorites </th>
                            <th> Manage </th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="user in this.users"  >
                        <tr v-if="user.banDate == null"   v-bind:key="user.userId">
                            <td> <router-link :to="{ name: 'InfoUser', params: { userId: user.email }}"> {{user.userId}}</router-link> </td>
                            <td> {{user.name}} </td>
                            <td> {{user.premium}} </td>
                            <td> {{user.likes.length}} </td>
                            <td> {{user.favourites.length}} </td>
                            <td><button class="delete"> <router-link :to="{ name: 'InfoUser', params: { userId: user.email }}"> <v-img :src="require('../assets/images.png')"   width ="25px" height="25px"/> </router-link></button> <button @click="banejarUser(user.userId)"><v-img :src="require('../assets/block.png')" width ="25px" height="25px"/> </button> </td>
                        </tr>
                        <tr v-else  class="banned" v-bind:key="user.userId">
                            <td class="banned"> <router-link :to="{ name: 'InfoUser', params: { userId: user.email }}"> {{user.userId}}</router-link> </td>
                            <td class="banned"> {{user.name}} </td>
                            <td class="banned"> {{user.premium}} </td>
                            <td class="banned"> {{user.likes.length}} </td>
                            <td class="banned"> {{user.favourites.length}} </td>
                            <td class="banned"> <button class="delete"> <router-link :to="{ name: 'InfoUser', params: { userId: user.email }}"> <v-img :src="require('../assets/images.png')"   width ="25px" height="25px"/> </router-link></button> <button @click="DesbanejarUser(user.userId)"><v-img :src="require('../assets/tick-icon.png')" width ="25px" height="25px"/> </button> </td>
                        </tr>

                        </template>

                    </tbody>  
                </table>
            </v-simple-table>     
        </div>
    </div>
</template>

<script>
import { DataProvider } from "@/data-providers/_Index.js"
 

export default {
    name: "users",
    data(){
        return{
            users: [],
        }
    },
    methods: {
        obtenir_users: function(){
            let aux = []
            let date = new Date()
            date.setTime(date.getTime() + ( 60 * 1000))
            DataProvider("USERS", "USERS", {}).then((res) => {
                aux = res.users;
                this.users = [];
                for(let i in aux){
                    DataProvider("USERS", "USER_INFO", aux[i].email).then((res) => {
                       let banDate = new Date(res.user.banDate)
                       if (banDate<=date){
                           res.user.banDate=null;
                       }
                       this.users.push(res.user)
                    })
                }
            })
        },
         banejarUser:  function(id_user){
            DataProvider("USERS", "USER_BAN", id_user).then((res) => {
                console.log(res)
            })
             this.obtenir_users();
        },
        DesbanejarUser:  function(id_user){
            DataProvider("USERS", "USER_UNBAN", id_user).then((res) => {
                console.log(res)
            })
            this.obtenir_users();
        },

    },
    mounted() {
        this.obtenir_users();
    }
}

</script>

<style scoped>
.banned{
    background-color:rgb(175, 175, 175)
    }


</style>
