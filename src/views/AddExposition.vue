<template>
<div id="form">
    <form v-on:submit.prevent="post">
    <div class="row">
      <div class="col-25">
        <label for="fname">Nom Expo:</label>
      </div>
      <div class="col-75">
        <input type="text" id="name" name="name" placeholder="Exposition Name.." v-model="form.name">
      </div>
    </div> 
    <div class="row">
      <div class="col-25">
        <label for="subject">Room:</label>
      </div>
    <div class="col-75">
        <input type="text" id="room" name="name" placeholder="Room of the exposition.." v-model="form.room">
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="subject">Descripció Català:</label>
      </div>
    <div class="col-75">
        <textarea id="ca" name="ca" placeholder="Description in Catalan" style="height:70px" v-model="form.ca"></textarea>
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="subject">Descripció Castellà:</label>
      </div>
    <div class="col-75">
        <textarea id="es" name="es" placeholder="Description in Spanish" style="height:70px" v-model="form.es"></textarea>
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="subject">Descripció Anglès:</label>
      </div>
    <div class="col-75">
        <textarea id="en" name="en" placeholder="Description in English" style="height:70px" v-model="form.en"></textarea>
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="subject">Foto:</label>
      </div>
    <div class="col-75">
        <input type="file" accept="image/*" id="img" v-on:input="previewFile($event)" >
      </div>
    </div>
    <button class="submit">Crear Exposition</button>
    </form>
  </div>
</template>


<script>
import { DataProvider } from "@/data-providers/_Index.js"
import { Uploader } from '@/S3Uploader.js'

export default {
    name: "AddExpo",
    data() {
        return{
            form: {
                name: '',              
                room: '',
                ca:'',
                es: '',
                en: '',
                image: '',
            },
            status: [],
            image_aux: null,
        }
    },
    methods: {
        post: function(){
            let uploader= new Uploader();
            const data = {
              contentType: this.image_aux.type,
              fileName: this.image_aux.name,
              file: this.image_aux             
            }
            uploader.uploadImage(data, "/expositions").then((res)=>{
              this.form.image=res.Location
              console.log(this.form.image) 
              let params = [ this.form,
                              this.$route.params.id_museu]
              DataProvider("MUSEUMS", "EXPO_CREATE",  params).then((res) => {
                      this.status = res;
                      console.log(this.status)
                      if(this.status!=null)
                      this.$router.push({ name: "expositions",  params: { id_museu: this.$route.params.id_museu}})
                  })
            })
        },
         previewFile: function(event) {
          this.image_aux= event.target.files[0];
          
          console.log(this.image_aux)
          
        },

       
        
    }
    

}
    
</script>

<style scoped>
input[type=text], select, textarea{
  width: 70%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
}
#form{
 margin-top: 25px;
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