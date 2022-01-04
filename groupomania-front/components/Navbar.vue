<template>
  <nav id="nav">
    <v-app-bar flat app height="150" class="white">
      <v-app-bar-nav-icon
        class="white grey--text"
        color="white"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <div height="150" color="white">
        <v-toolbar-title color="white" class="whitetext-uppercase grey--text">
          <nuxt-link to="/" class="font-weight-light"
            ><img
              class="d-none d-sm-flex"
              src="../static/icon-left-font.svg"
              contain
              height="150"
              alt=""
            />
          </nuxt-link>
        </v-toolbar-title>
      </div>
      <v-spacer></v-spacer>
      <v-btn to="/newPost" plain color="red">
        <span class="font-weight-bold"> Ajouter un post </span>
      </v-btn>

      <div v-if="isLogged">
        <v-btn @click="logOut" class="d-none d-md-block" plain color="red">
          <span class="font-weight-bold"> Se déconnecter </span>
          <v-icon class="ml-3">mdi-logout</v-icon>
        </v-btn>
      </div>

      <div class="d-none d-md-block" v-if="isLogged === false">
        <v-btn to="/login" plain color="red">
          <span class="font-weight-bold"> Se connecter </span>
          <v-icon class="ml-3">mdi-login</v-icon>
        </v-btn>
        <v-btn to="/signup" plain color="red">
          <span class="font-weight-bold"> S'enregistrer </span>
          <v-icon class="ml-3">mdi-login</v-icon>
        </v-btn>
      </div>
    </v-app-bar>

    <v-navigation-drawer
      width="400px"
      v-model="drawer"
      temporary
      app
      class="red lighten-2"
    >
      <v-layout column align-center>
        <v-row class="mt-5 text-center">
          <v-col cols="6">
            <v-avatar size="100">
              <img v-if="isLogged && user.photo != null" :src="user.photo" />
              <img v-else src="../static/image-1.png" />
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

          <div v-if="isLogged === false">
            <v-list-item
              class="d-md-none"
              v-for="rlink in responsiveNotLoggedLinks"
              :key="rlink.text"
              router
              :to="rlink.route"
            >
              <v-list-item-action>
                <v-icon class="white--text">{{ rlink.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="white--text">
                  {{ rlink.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
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
      responsiveNotLoggedLinks: [
        {
          icon: 'mdi-login',
          text: 'Se Connecter',
          route: '/login',
        },
        {
          icon: 'mdi-login',
          text: "S'enregistrer",
          route: '/signup',
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
