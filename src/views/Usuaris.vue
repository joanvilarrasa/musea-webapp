<template>
    <div class="view-container">
        <div class="table-container">
            <v-simple-table dark>
                <table>
                    <thead>
                        <tr>
                            <th>Nom usuari</th>
                            <th> Username </th>
                            <th> Premium </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in this.users" :key="user.username">
                            <td> {{user.fullName}} </td>
                            <td> {{user.username}} </td>
                            <td> {{user.premium}} </td>
                        </tr>
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
            DataProvider("USERS", "USERS", {}).then((res) => {
                this.users = res.users;
            })
        }
    },
    mounted() {
        this.obtenir_users();
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

</style>