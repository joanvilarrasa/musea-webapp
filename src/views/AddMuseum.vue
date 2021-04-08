<template>
<div id="form">
    <form v-on:submit.prevent="post">
    <div class="row">
      <div class="col-25">
        <label for="fname">Nom Museu:</label>
      </div>
      <div class="col-25">
        <input type="text" id="name" name="name" placeholder="Museum Name.." v-model="form.name">
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="lname">País:</label>
      </div>
      <div class="col-25">
        <input type="text" id="country" name="country" placeholder="Country of the museum.." v-model="form.country">
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="lname">Ciutat:</label>
      </div>
      <div class="col-25">
        <input type="text" id="city" name="city" placeholder="City of the museum.." v-model="form.city">
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="lname">Adreça:</label>
      </div>
      <div class="col-25">
        <input type="text" id="address" name="address" placeholder="Address of the museum.." v-model="form.address">
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="subject">Descripció Català:</label>
      </div>
    <div class="col-25">
        <textarea id="cat" name="cat" placeholder="Description in Catalan" style="height:70px" v-model="form.cat"></textarea>
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="subject">Descripció Castellà:</label>
      </div>
    <div class="col-25">
        <textarea id="cast" name="cast" placeholder="Description in Spanish" style="height:70px" v-model="form.cast"></textarea>
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="subject">Descripció Anglès:</label>
      </div>
    <div class="col-25">
        <textarea id="eng" name="eng" placeholder="Description in English" style="height:70px" v-model="form.eng"></textarea>
      </div>
    </div>
    <button class="submit">Crear Museu</button>
  </form>
</div>
</template>


<script>
//import { DataProvider } from "@/data-providers/_Index.js"

export default {
    name: "AddMuseum",
    data() {
        return{
            form: {
                name: '',
                country: '',
                city: '',
                address: '',
                cat: '',
                cast: '',
                eng: '',
            }
        }
    },
    methods: {
        post: function(){
            var json_form=JSON.stringify(this.form);
            console.log(json_form)
            //let params = 
           /* DataProvider("MUSEUMS_CREATE", "MUSEUMS", params).then((res) => {
                    this.status = res;
                    console.log(this.status)
                })*/
        }
  }
    

}
    
</script>

<style>
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