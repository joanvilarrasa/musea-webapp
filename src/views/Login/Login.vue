<template src="./Login.html"></template>

<script>
import { DataProvider } from '@/data-providers/_Index.js';

export default {
    name: 'Login',
    data: () => ({
      valid: false,
      username: null,
      password: null,
      usernameRules: [
        v => !!v || 'Username is required',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length > 5) || 'Password must be at least 5 characters',
      ],
    }),
    methods: {
      loginFunction() {
        DataProvider("AUTH", "LOGIN", { username: this.username, password: this.password }).then((res) => {
          this.$router.push('/');
        }).catch(error => {
          cosnole.log(error)
        })
      }

    },
}
</script>

<style lang="scss" src="./Login.scss"></style>