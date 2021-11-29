<template>
  <div>
    <v-row v-if="isLogged === true" justify="space-around">
      <v-card
        width="800"
        flat
        class="text-left ma-3 d-flex flex-column justify-center space-around"
      >
        <v-responsive class="pt-4 text-center">
          <v-avatar size="100">
            <img src="../static/image-1.png" alt="anon" />
          </v-avatar>
        </v-responsive>
        <v-card-text>
          <div class="grey--text mb-3">
            Prénom : {{ $store.state.user.firstName }}
          </div>
          <div class="grey--text mb-3">
            Nom : {{ $store.state.user.lastName }}
          </div>
          <div class="grey--text mb-3">
            Email : {{ $store.state.user.email }}
          </div>
          <div class="d-flex flex-column">
            <label for="bio" class="mb-5">A propos de moi :</label>
            <textarea name="bio" id="bio" cols="30" rows="10">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, aliquid? Distinctio, quasi, labore doloribus recusandae inventore nam animi reprehenderit deserunt, possimus assumenda quos. Laudantium odio voluptate molestiae optio perspiciatis dolore!
          </textarea
            >
          </div>
        </v-card-text>
      </v-card>
    </v-row>
    <div v-if="isLogged === false">
      <p>Veuillez vous <nuxt-link to="/login">connecter</nuxt-link></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profil',
  data() {
    return {};
  },
  methods: {
    logOut() {
      this.$store.dispatch('logOut');
      setTimeout(() => {
        this.$router.push('/');
      }, 1000);
    },
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    isLogged() {
      return this.$store.getters.isLogged;
    },
  },
};
</script>

<style scoped></style>
