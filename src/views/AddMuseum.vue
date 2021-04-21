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
    <button class="submit">Crear Museu</button>
  </form><br><br>
  <div v-if="this.status.name != undefined">
    Museu creat correctament
  </div>
</div>
</template>


<script>
import { DataProvider } from "@/data-providers/_Index.js"

export default {
    name: "AddMuseum",
    data() {
        return{
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
        post: function(){

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
    }
/*
        addPhoto: function(albumName) {
          var files = document.getElementById("foto").files;
          if (!files.length) {
            return alert("Please choose a file to upload first.");
          }
          var file = files[0];
          var fileName = file.name;
          var albumPhotosKey = encodeURIComponent(albumName) + "/";

          var photoKey = albumPhotosKey + fileName;

          // Use S3 ManagedUpload class as it supports multipart uploads
              var upload = new AWS.S3.ManagedUpload({
                params: {
                  Bucket: albumBucketName,
                  Key: photoKey,
                  Body: file
                }
              });

              var promise = upload.promise();

              promise.then(
                function(data) {
                  alert("Successfully uploaded photo.");
                  viewAlbum(albumName);
                },
                function(err) {
                  return alert("There was an error uploading your photo: ", err.message);
                }
              );
    }
  },
  mounted() {*/
      /*let recaptchaScript = document.createElement('script')
      recaptchaScript.setAttribute('src', 'https://sdk.amazonaws.com/js/aws-sdk-v3.js')
      document.head.appendChild(recaptchaScript)
      let recaptchaScript2 = document.createElement('script')
      recaptchaScript2.setAttribute('src', './s3_photoExample.js')
      document.head.appendChild(recaptchaScript2)
      var albumBucketName = "museaimages1";
      var bucketRegion = "us-east-1";
      var IdentityPoolId = "musea";

      AWS.config.update({
        region: bucketRegion,
        credentials: new AWS.CognitoIdentityCredentials({
          IdentityPoolId: IdentityPoolId
        })
      });

      this.S3 = new AWS.S3({
        apiVersion: "2006-03-01",
        params: { Bucket: albumBucketName }
      });*/
  
  
    

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