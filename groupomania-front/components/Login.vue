<template>
  <v-app id="login">
    <v-main>
      <v-container>
        <v-layout justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="red lighten-2">
                <v-toolbar-title>Se connecter</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form v-model="isValid">
                  <v-text-field
                    prepend-icon="mdi-account "
                    name="email"
                    label="Adresse mail"
                    type="text"
                    :rules="[(v) => !!v || 'Email requis']"
                    v-model="email"
                    required
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    prepend-icon="mdi-lock"
                    name="password"
                    label="Mot de passe"
                    type="password"
                    :rules="[(v) => !!v || 'Mot de passe requis']"
                    v-model="password"
                    required
                  ></v-text-field>
                </v-form>
                <div class="danger-alert" v-html="message" />
              </v-card-text>
              <!-- <div class="danger-alert" v-html="errorMessage" /> -->

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="red lighten-2"
                  class="white--text"
                  :disabled="!isValid"
                  @click.prevent="login()"
                  >Envoyer</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import userAuthentication from '../plugins/userAuthentication';
export default {
  name: 'Login',

  data() {
    return {
      email: '',
      password: '',
      isValid: true,
      errorMessage: null,
      message: null,
    };
  },
  methods: {
    async login() {
      try {
        const res = await userAuthentication.login(
          this.$axios,
          {
            email: this.email,
            password: this.password,
          },
          this.$store,
          this.$toast
        );
        let data = res;
        this.$store.dispatch('setToken', data.token);
        this.$store.dispatch('setUser', data.user);
        this.$store.dispatch('getUserById', data.user.id);
        this.$router.push('/profil');
      } catch (error) {
        this.$toast.error('Echec lors de la connection au compte');
      }
    },
  },
};
</script>

<style></style>
