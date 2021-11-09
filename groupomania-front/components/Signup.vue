<template>
  <v-app id="signup">
    <v-main>
      <v-container>
        <v-layout justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Créer un compte</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    id="firstName"
                    prepend-icon="mdi-account "
                    name="firstName"
                    label="Prénom"
                    type="text"
                    v-model="firstName"
                  ></v-text-field>
                  <v-text-field
                    id="lastName"
                    prepend-icon="mdi-account "
                    name="lastName"
                    label="Nom"
                    type="text"
                    v-model="lastName"
                  ></v-text-field>
                  <v-text-field
                    id="email"
                    prepend-icon="mdi-account "
                    name="email"
                    label="Adresse mail"
                    type="text"
                    v-model="email"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    prepend-icon="mdi-lock"
                    name="password"
                    label="Mot de passe"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="signup()">Envoyer</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'Signup',
  data() {
    return {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
    };
  },
  methods: {
    signup() {
      axios.post('http://localhost:4000/signup', {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>

<style></style>
