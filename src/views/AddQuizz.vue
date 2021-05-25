<template>
<div id="form">
    
    <form v-on:submit.prevent="post">
    <div class="row">
      <div class="col-25">
        <label for="fname">Pregunta:</label>
      </div>
      <div class="col-25">
        <input type="text" id="name" name="name" placeholder="Català.." v-model="form.question.ca">
      </div>
      <div class="col-25">
        <input type="text" id="name" name="name" placeholder="Castellà.." v-model="form.question.es">
      </div>
      <div class="col-25">
        <input type="text" id="name" name="name" placeholder="Anglès.." v-model="form.question.en">
      </div>
    </div>
    <div class="row">
      
      <div class="col-25">
        <input type="checkbox" id="correcte" name="Correcte" v-model="answer1.correct">
        <label for="lname">Resposta 1:</label>
      </div>
       <div class="col-25">
        <input type="text" id="name" name="name" placeholder="Català.." v-model="answer1.ca">
      </div>
      <div class="col-25">
        <input type="text" id="name" name="name" placeholder="Castellà.." v-model="answer1.es">
      </div>
      <div class="col-25">
        <input type="text" id="name" name="name" placeholder="Anglès.." v-model="answer1.en">
      </div>
      
    </div>
     <div class="row">
      <div class="col-25">
        <input type="checkbox" id="correcte" name="Correcte" v-model="answer2.correct">
        <label for="lname">Resposta 2:</label>
      </div>
       <div class="col-25">
        <input type="text" id="name" name="name" placeholder="Català.." v-model="answer2.ca">
      </div>
      <div class="col-25">
        <input type="text" id="name" name="name" placeholder="Castellà.." v-model="answer2.es">
      </div>
      <div class="col-25">
        <input type="text" id="name" name="name" placeholder="Anglès.." v-model="answer2.en">
      </div>
    </div>
    <div class="row">
      <div class="col-25">
          <input type="checkbox" id="correcte" name="Correcte" v-model="answer3.correct">
        <label for="lname">Resposta 3:</label>
      </div>
       <div class="col-25">
        <input type="text" id="name" name="name" placeholder="Català.." v-model="answer3.ca">
      </div>
      <div class="col-25">
        <input type="text" id="name" name="name" placeholder="Castellà.." v-model="answer3.es">
      </div>
      <div class="col-25">
        <input type="text" id="name" name="name" placeholder="Anglès.." v-model="answer3.en">
      </div>
    </div>
    <div class="row">
      <div class="col-25">
          <input type="checkbox" id="correcte" name="Correcte" v-model="answer4.correct">
        <label for="lname">Resposta 4:</label>
      </div>
       <div class="col-25">
        <input type="text" id="name" name="name" placeholder="Català.." v-model="answer4.ca">
      </div>
      <div class="col-25">
        <input type="text" id="name" name="name" placeholder="Castellà.." v-model="answer4.es">
      </div>
      <div class="col-25">
        <input type="text" id="name" name="name" placeholder="Anglès.." v-model="answer4.en">
      </div>
    </div>
     <div class="row">
      <div class="col-25">
        <label for="lname">Points:</label>
      </div>
       <div class="col-25">
        <input type="text" id="points" name="points" placeholder="Punts de la pregunta.." v-model="form.points">
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
    <button class="submit">Crear Museu</button>
  </form><br><br>
  <div v-if="this.status.name != undefined">
    Museu creat correctament
  </div>  
</div>
</template>


<script>
import { DataProvider } from "@/data-providers/_Index.js"
import { Uploader } from '@/S3Uploader.js'

export default {
    name: "AddQuizz",
    data() {
      return{
          form: {
            question: {
              ca: '',
              es: '',
              en: '',
            },
            points: '',
            answers: [],                
            image: '',
          },
          answer1:{
            ca: '',
            es: '',
            en: '',
            correct: false,
          },
          answer2:{
            ca: '',
            es: '',
            en: '',
            correct: false,
          },
          answer3:{
            ca: '',
            es: '',
            en: '',
            correct: false,
          },
          answer4:{
            ca: '',
            es: '',
            en: '',
            correct: false,
          },
          status: [],
          image_aux: null,
      }
    },
    methods: {
        post: function(){
          this.form.points=parseFloat(this.form.points)
          this.form.answers=[];
          this.form.answers.push(this.answer1)
          this.form.answers.push(this.answer2)
          this.form.answers.push(this.answer3)
          this.form.answers.push(this.answer4)
          console.log(this.form)
          if(this.image_aux!=null){
            let uploader= new Uploader();
            const data = {
              contentType: this.image_aux.type,
              fileName: this.image_aux.name,
              file: this.image_aux             
            }
            uploader.uploadImage(data, "/quizzes").then((res)=>{
              console.log(res)
              this.form.image=res.Location
              console.log(this.form.image)
               let params = this.form;
              DataProvider("QUIZZES", "QUIZZES_CREATE", params).then((res) => {
                  this.status = res;
                  console.log(this.status)
                  
                  this.$router.push({ name: "Quizzes"})
                  
              })
            })
          }
          else{
             let params = this.form;
              DataProvider("QUIZZES", "QUIZZES_CREATE",  params).then((res) => {
                  this.status = res;
                  console.log(this.status)
                  
                  this.$router.push({ name: "Quizzes"})
                  
              })
          }
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
  width: 90%;
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
.col-15 {
  float: left;
  width: 15%;
  margin-top: 6px;
}
.col-10 {
  float: left;
  width: 10%;
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
 margin-left: 10%;
 }

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}



</style>