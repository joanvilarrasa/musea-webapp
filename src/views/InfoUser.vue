<template>
    <div id="form">
    <form v-on:submit.prevent="put">
    <div class="row">
         <div class="col-25">
         </div>
        <div class="col-25">
            <v-img lazy-src="" max-height="150" max-width="250" :src="user.profilePic"></v-img>
        </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="fname">Username:</label>
      </div>
      <div class="col-25">
        <label for="fname">{{this.$route.params.userId}}</label>
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="fname">Premium:</label>
      </div>
      <div class="col-25">
        <label for="fname">{{this.user.premium}}</label>
      </div>
    </div>
     <div class="row">
      <div class="col-25">
        <label for="fname">Points:</label>
      </div>
      <div class="col-25">
        <label for="fname">{{this.user.points}}</label>
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="fname">Full Name:</label>
      </div>
      <div class="col-25">
        <input type="text" id="score" name="score" v-bind:placeholder="this.user.name" v-model="form.name">
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="fname">Bio:</label>
      </div>
      <div class="col-25">
        <input type="text" id="score" name="score" v-bind:placeholder="this.user.bio" v-model="form.bio">
      </div>
    </div>
    <button class="submit">Editar User</button>
  </form><br><br>
  
    </div>


</template>

<script >
import { DataProvider } from "@/data-providers/_Index.js"

export default ({
    name: "InfoUser",
    data(){
        return{
            user: [],
            form: {
                name: '',
                bio: '',
            }
        }
    },
    methods: {
        obtenir_user: function(user_id){
            DataProvider("USERS", "USER_INFO", user_id).then((res) => {
                console.log(res)
                this.user = res.user;
            })
            console.log(this.user)

        },
        put: function(){        
            let params = [ this.form, this.user.userId]
            DataProvider("USERS", "USER_EDIT",  params).then((res) => {
                    console.log(res)
                    if(res!=null){
                      this.$router.push({ name: "Usuaris"})
                    }
                })
        
        }
    },
    mounted() {
        this.obtenir_user(this.$route.params.userId);
    }

    
})
</script>

<style >
input[type=text], select, textarea{
  width: 70%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
}

/* Style the label to display next to the inputs */
label {
  padding: 10px 12px 12px 0;
  display: inline-block;
}

/* Style the submit button */
.submit {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  float: left;
}
#form{
 margin-top: 25px;
 }

/* Style the container */
.container {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}

/* Floating column for labels: 25% width */
.col-25 {
  float: left;
  width: 25%;
  margin-top: 6px;
}

/* Floating column for inputs: 75% width */
.col-75 {
  float: left;
  width: 75%;
  margin-top: 6px;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}


</style>