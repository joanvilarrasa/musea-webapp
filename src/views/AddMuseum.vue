<template>
  <div class="view-container">
    <div id="form">
        
        <form v-on:submit.prevent="post">
        <div class="row">
          <div>
            <label for="fname">Nom Museu:</label>
          </div>
          <div>
            <input type="text" id="name" name="name" placeholder="Museum Name.." v-model="form.name">
          </div>
        </div>
        <div class="row">
          <div>
            <label for="lname">País:</label>
          </div>
          <div>
            <input type="text" id="country" name="country" placeholder="Country of the museum.." v-model="form.country">
          </div>
        </div>
        <div class="row">
          <div>
            <label for="lname">Ciutat:</label>
          </div>
          <div>
            <input type="text" id="city" name="city" placeholder="City of the museum.." v-model="form.city">
          </div>
        </div>
        <div class="row">
          <div>
            <label for="lname">Adreça:</label>
          </div>
          <div>
            <input type="text" id="address" name="address" placeholder="Address of the museum.." v-model="form.address">
          </div>
        </div>
        <div class="row">
          <div>
            <label for="subject">Descripció Català:</label>
          </div>
        <div>
            <textarea id="ca" name="ca" placeholder="Description in Catalan" style="height:70px" v-model="form.ca"></textarea>
          </div>
        </div>
        <div class="row">
          <div>
            <label for="subject">Descripció Castellà:</label>
          </div>
        <div>
            <textarea id="es" name="es" placeholder="Description in Spanish" style="height:70px" v-model="form.es"></textarea>
          </div>
        </div>
        <div class="row">
          <div>
            <label for="subject">Descripció Anglès:</label>
          </div>
        <div>
            <textarea id="en" name="en" placeholder="Description in English" style="height:70px" v-model="form.en"></textarea>
          </div>
        </div>
        <div class="row">
          <div>
            <label for="subject">Foto:</label>
          </div>
        <div>
              <input type="file" accept="image/*" id="foto" v-on:input="previewFile($event)" >
          </div>
        </div>
        <button class="submit">Crear Museu</button>
      </form><br><br>
      <div v-if="this.status.name != undefined">
        Museu creat correctament
      </div>
    </div>
  </div>
</template>


<script>
import { DataProvider } from "@/data-providers/_Index.js"
//import { Uploader } from "@/S3Uploader.js"

export default {
    name: "AddMuseum",
    data() {
        return{
            img_read: "",
            form: {
                name: '',
                country: '',
                city: '',
                address: '',
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
        post:  function(){
            //let Uploader= new Uploader();
            //let link_img = Uploader.upload(this.form.img)

            //this.SW.addPhoto("/museums")
            //aconseguirlink
            //this.form.img=link a s3
            let params = this.form;
            DataProvider("MUSEUMS", "MUSEUMS_CREATE",  params).then((res) => {
                    this.status = res;
                    console.log(this.status)
                    if(this.status.name!=null){
                      this.$router.push({ name: "Museums"})
                    }
                })
        },
        previewFile: function(event) {
          var selectedFile = event.target.files[0];
          var reader = new FileReader();
          console.log(selectedFile)
          this.img_read = reader.readAsDataURL(selectedFile);
          console.log(reader)
          
          console.log(this.img_read)
        }
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
#form{
 margin-top: 25px;
 }

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}



</style>