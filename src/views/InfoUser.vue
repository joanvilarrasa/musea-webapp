<template>
    <div id="form">
    <form v-on:submit.prevent="put">
    <div class="row">
         <div class="col-25">
         </div>
        <div class="col-75">
            <v-img lazy-src="" max-height="150" max-width="250" :src="user.profilePic"></v-img>
        </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="fname">Username:</label>
      </div>
      <div class="col-75">
        <label for="fname">{{this.$route.params.userId}}</label>
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="fname">Premium:</label>
      </div>
      <div class="col-75">
        <label for="fname">{{this.user.premium}}</label>
      </div>
    </div>
     <div class="row">
      <div class="col-25">
        <label for="fname">Points:</label>
      </div>
      <div class="col-75">
        <label for="fname">{{this.user.points}}</label>
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="fname">Full Name:</label>
      </div>
      <div class="col-75">
        <input type="text" id="score" name="score" v-bind:placeholder="this.user.name" v-model="form.name">
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="fname">Bio:</label>
      </div>
      <div class="col-75">
        <input type="text" id="score" name="score" v-bind:placeholder="this.user.bio" v-model="form.bio">
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="fname">Canviar foto:</label>
      </div>
      <div class="col-75">
        <input type="file" accept="image/*" id="img" v-on:input="previewFile($event)" >
      </div>
    </div>
    <button class="submit">Editar User</button>
  </form><br><br>
  
    </div>


</template>

<script >
import { DataProvider } from "@/data-providers/_Index.js"
import { Uploader } from '@/S3Uploader.js'


export default ({
    name: "InfoUser",
    data(){
        return{
            user: [],
            form: {
                name: '',
                bio: '',
                profilePic: '',
            },
            image_aux: null,

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
          if(this.image_aux!=null){
             let uploader= new Uploader();
            const data = {
              contentType: this.image_aux.type,
              fileName: this.image_aux.name,
              file: this.image_aux             
            }
            uploader.uploadImage(data, "/users").then((res)=>{
              this.form.profilePic=res.Location
              console.log(this.form.profilePic) 
          
              let params = [ this.form, this.user.userId]
              DataProvider("USERS", "USER_EDIT",  params).then((res) => {
                      console.log(res)
                      if(res!=null){
                        this.$router.push({ name: "Usuaris"})
                      }
                  })
            })
          }
          else{
            let params = [ this.form, this.user.userId]
              DataProvider("USERS", "USER_EDIT",  params).then((res) => {
                      console.log(res)
                      if(res!=null){
                        this.$router.push({ name: "Usuaris"})
                      }
                  })
          }
        
        },
         previewFile: function(event) {
          this.image_aux= event.target.files[0];
          console.log(this.image_aux)
          
        },
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
  background-color: rgb(106, 118, 171);
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