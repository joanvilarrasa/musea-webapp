<template src="./Login.html"></template>

<script>
import { DataProvider } from '@/data-providers/_Index.js';

export default {
    name: 'Login',
    data: () => ({
      valid: false,
      email: null,
      password: null,
      emailRules: [
        v => !!v || 'Email is required',
        v => validateEmail(v) || 'Example john@doe.com',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length > 5) || 'Password must be at least 5 characters',
      ],
    }),
    methods: {
      loginFunction() {
        DataProvider("AUTH", "LOGIN", { username: this.email, password: this.password }).then((res) => {
          // put the user in vuex???
          this.$router.push('/');
        }).catch(error => {
          cosnole.log(error)
        })
      }

    },
}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
</script>

<style lang="scss" src="./Login.scss"></style>