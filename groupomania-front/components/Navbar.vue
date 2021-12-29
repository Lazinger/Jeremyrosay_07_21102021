<template>
  <nav id="nav">
    <v-app-bar flat app>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon
        class="grey--text"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <nuxt-link to="/" class="font-weight-light">GroupoMANIA</nuxt-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn to="/newPost">Ajouter un post</v-btn>

      <div v-if="isLogged === true">
        <v-btn @click="logOut" text color="grey">
          Se déconnecter
          <v-icon class="ml-3">mdi-logout</v-icon>
        </v-btn>
      </div>

      <div v-if="isLogged === false">
        <v-btn to="/login" text color="grey">
          Se connecter
          <v-icon class="ml-3">mdi-login</v-icon>
        </v-btn>
        <v-btn to="/signup" text color="grey">
          S'enregistrer
          <v-icon class="ml-3">mdi-login</v-icon>
        </v-btn>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer
      width="400px"
      v-model="drawer"
      temporary
      app
      class="primary"
    >
      <v-layout column align-center>
        <v-row class="mt-5 text-center">
          <v-col cols="6">
            <v-avatar size="100">
              <img :src="user.photo" />
            </v-avatar>
          </v-col>
        </v-row>
      </v-layout>

      <div class="text-center" v-if="isLogged === true">
        <v-btn @click="logOut" small class="ma-1 mt-3" color="error">
          Se déconnecter
        </v-btn>
      </div>

      <v-list>
        <client-only>
          <v-list-item
            v-for="link in sideLinks"
            :key="link.text"
            router
            :to="link.route"
          >
            <v-list-item-action>
              <v-icon class="white--text">{{ link.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="white--text">
                {{ link.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </client-only>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,

      sideLinks: [
        {
          icon: 'mdi-view-dashboard',
          text: 'Accueil',
          route: '/',
        },
        {
          icon: 'mdi-folder',
          text: 'Mon profil',
          route: '/profil',
        },
      ],
    };
  },
  computed: {
    isLogged() {
      return this.$store.getters.isLogged;
    },
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch('logOut');
      setTimeout(() => {
        this.$router.push('/');
      }, 1000);
    },
  },
};
</script>

<style>
a {
  text-decoration: none;
}
</style>
