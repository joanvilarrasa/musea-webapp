<template>
<div id="form">
    <form v-on:submit.prevent="put">
    <div class="row">
      <div class="col-25">
        <label for="fname">Titol:</label>
      </div>
      <div class="col-25">
        <label for="fname">{{this.$route.params.expo_nom}}</label>
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="fname">Room:</label>
      </div>
      <div class="col-25">
        <input type="text" id="score" name="score" placeholder="Type of the masterpiece..." v-model="form.room">
      </div>
    </div>
 <div class="row">
      <div class="col-25">
        <label for="subject">Descripció Català:</label>
      </div>
    <div class="col-25">
        <textarea id="ca" name="ca" placeholder="Description in Catalan" style="height:70px" v-model="form.ca"></textarea>
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="subject">Descripció Castellà:</label>
      </div>
    <div class="col-25">
        <textarea id="es" name="es" placeholder="Description in Spanish" style="height:70px" v-model="form.es"></textarea>
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="subject">Descripció Anglès:</label>
      </div>
    <div class="col-25">
        <textarea id="en" name="en" placeholder="Description in English" style="height:70px" v-model="form.en"></textarea>
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="subject">Foto:</label>
      </div>
    <div class="col-25">
          <input type="file" accept="image/*" id="foto">
      </div>
    </div>
    <button class="submit">Editar Expo</button>
  </form><br><br>
  
</div>
</template>


<script>
import { DataProvider } from "@/data-providers/_Index.js"

export default {
    name: "ExpoEdit",
    data() {
        return{
            form: {
                room: '',
                ca: '',
                es: '',
                en: '',
                img: '',
            },
            status: [],
            S3: [],
        }
    },
    methods: {
        put: function(){        
            let params = [ this.form, this.$route.params.id_museu, this.$route.params.id_exposition]
            DataProvider("MUSEUMS", "EXPO_EDIT",  params).then((res) => {
                    this.status = res;
                    if(this.status!=null){
                      this.$router.push({ name: "exposition",  params: { id_museu: this.$route.params.id_museu }})
                    }
                })
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