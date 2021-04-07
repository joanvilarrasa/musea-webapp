<template>
  <div class="obres">
    <h1>Obres Page</h1>
    <p> {{this.obres}} </p>
  </div>
</template>

<script>


export default {
    name: "obres",
    data(){
        return{
            obres: [],
        }
    },
    methods: {
        obtenir_obres: function(){
            let url="https://aplication-api.herokuapp.com/museums/"
            //var self = this;
            this.obres=[];
            
            return new Promise((resolve) => {
                this.get(url)
                    .then(function (response) {

                        self.obres = response
                        resolve(self.obres);
                    })
                    .catch(function (error) {
                        console.log(error);
                        resolve();
                    });
            });

        }

    }
}


</script>