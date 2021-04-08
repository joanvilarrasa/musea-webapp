<template src="./Login.html"></template>

<script>
//import { DataProvider } from '../../data-providers/index.js';

export default {
    name: 'Login',
    data: () => ({
      username: null,
      password: null,
      usernameRules: [
        //v => !!v || 'Username is required',
      ],
      passwordRules: [
        //v => !!v || 'Password is required',
        //v => (v && v.length > 5) || 'Password must be at least 5 characters',
      ],
    }),
    methods: {
      /* 
        user: test@test.com
        pass: testPass
      */
      loginFunction() {
      //  // Call the api
      //  const { username, password } = this
      //  DataProvider("AUTH", "LOGIN", { username, password }).then(() => {
      //    this.$router.push('/');
      //  });
      //  this.signInUser({ username, password }).then(() => {
      //    //this.$router.push('/');
      //  }).catch((err) => {
      //    this.errorPopup = true;
      //    setTimeout(this.closeDialog, 5000);
      //  })
        alert("trying to log in");
      }

    },
}
</script>

<style lang="scss" src="./Login.scss"></style>