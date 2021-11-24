<template>
  <nav>
    <v-app-bar flat app>
      <v-app-bar-nav-icon
        class="grey--text"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <nuxt-link to="/"
          ><span class="font-weight-light">Groupo</span
          ><span>MANIA</span></nuxt-link
        >
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- <v-btn text color="grey">
        <span>Se connecter</span>
        <v-icon class="ml-3">mdi-login</v-icon>
      </v-btn>
      <v-btn text color="grey">
        <span>S'enregistrer</span>
        <v-icon class="ml-3">mdi-login</v-icon>
      </v-btn> -->

      <v-list
        v-if="isLogged"
        class="d-flex justify-center"
        color="grey lighten-4"
      >
        <v-list-item
          v-for="link in loggedIn"
          :key="link.text"
          router
          :to="link.route"
        >
          <v-list-item-content>
            <v-list-item-title class="grey--text">
              {{ link.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list v-else class="d-flex justify-center" color="grey lighten-4">
        <v-list-item
          v-for="link in notLoggedIn"
          :key="link.text"
          router
          :to="link.route"
        >
          <v-list-item-content>
            <v-list-item-title class="grey--text">
              {{ link.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-app-bar>

    <v-navigation-drawer
      width="400px"
      v-model="drawer"
      temporary
      app
      class="primary"
    >
      <v-list>
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
        {
          icon: 'mdi-account',
          text: 'Team',
          route: '/team',
        },
      ],

      loggedIn: [
        {
          text: 'Se déconnecter',
          route: '/login',
        },
        {
          text: "S'enregistrer",
          route: '/signup',
        },
      ],
      notLoggedIn: [
        {
          text: 'Se connecter',
          route: '/login',
        },
        {
          text: "S'enregistrer",
          route: 'signup',
        },
      ],
    };
  },
  computed: {
    isLogged() {
      return this.$store.state.user !== null;
    },
  },
};
</script>

<style>
.nuxt-link-active {
  text-decoration: none;
}
</style>
