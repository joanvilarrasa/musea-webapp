<template>
  <div id="app">
    <v-card v-if="$route.name != 'Login'" class="overflow-hidden">
      <v-app-bar color="#6A76AB" dark dense>
        <v-toolbar-title>MUSEA ADMIN</v-toolbar-title>
        <template v-slot:extension>
          <v-tabs align-with-title>
            <v-tab link to="/"><v-icon class="tab-menu-icon">mdi-home</v-icon>Home</v-tab>
            <v-tab link to="/usuaris"><v-icon class="tab-menu-icon">mdi-account</v-icon>Users</v-tab>
            <v-tab link to="/museums"><v-icon class="tab-menu-icon">mdi-bank</v-icon>Museums</v-tab>
            <v-tab link to="/obres"><v-icon class="tab-menu-icon">mdi-palette</v-icon>Obres</v-tab>
          </v-tabs>
        </template>
        <v-spacer></v-spacer>
        <v-btn icon @click="logoutFunction">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-app-bar>
    </v-card>
    <div class="app-container">
      <router-view/>
    </div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100vh;
}
.tab-menu-icon {
  margin-right: 0.5rem;
}
.app-container {
  display: flex;
  flex-grow: 1;
  width: 100%;
  overflow: hidden;
  background: rgb(240, 240, 250);
}

.view-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}

.table-container{
  align-self: flex-start;
  width: 100%;
  flex-grow: 1;
}
</style>

<script>
import AuthStore from '@/store-cold/auth/index.js';

export default {
  data: () => ({
    drawer: false,
    group: null,
  }),
  methods: {
    logoutFunction() {
      AuthStore.clearAuthData();
      this.$router.push('/login');
    }
  }

}
</script>

