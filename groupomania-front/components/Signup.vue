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
                <v-form v-model="isValid">
                  <v-text-field
                    id="firstName"
                    prepend-icon="mdi-account "
                    name="firstName"
                    label="Prénom"
                    type="text"
                    :rules="firstNameRules"
                    v-model="firstName"
                    required
                  ></v-text-field>
                  <v-text-field
                    id="lastName"
                    prepend-icon="mdi-account "
                    name="lastName"
                    label="Nom"
                    type="text"
                    :rules="lastNameRules"
                    v-model="lastName"
                    required
                  ></v-text-field>
                  <v-text-field
                    id="email"
                    prepend-icon="mdi-account "
                    name="email"
                    label="Adresse mail"
                    type="text"
                    :rules="emailRules"
                    error-count="2"
                    v-model="email"
                    required
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    prepend-icon="mdi-lock"
                    name="password"
                    label="Mot de passe"
                    type="password"
                    :rules="passwordRules"
                    error-count="5"
                    v-model="password"
                    required
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" :disabled="!isValid" @click="signup()"
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
export default {
  name: 'Signup',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      isValid: true,
      emailRules: [
        (v) => !!v || "L'email est obligatoire",
        (v) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "L'email doit être valide",
      ],
      firstNameRules: [
        (v) => !!v || 'Prénom requis',
        (v) => v.length <= 30 || 'Entre 3 et 30 caractères, sans symboles',
      ],
      lastNameRules: [
        (v) => !!v || 'Nom requis',
        (v) => v.length <= 30 || 'Entre 3 et 30 caractères, sans symboles',
      ],
      passwordRules: [
        (v) => !!v || 'Mot de passe requis',
        (v) =>
          (v && v.length >= 5) ||
          'Le mot de passe doit avoir plus de 5 caractères',
        (v) => /(?=.*[A-Z])/.test(v) || 'Il doit posseder une majsucule',
        (v) => /(?=.*\d)/.test(v) || 'Doit avoir un nombre',
        (v) => /([!@$%])/.test(v) || 'Doit avoir un caractère spécial [!@#$%]',
      ],
    };
  },
  methods: {
    async signup() {
      try {
        const res = await this.$axios.$post('/signup', {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
        });
        this.$toast('Register OK');
        this.$router.push('/');
      } catch (error) {
        this.$toast.error('Register fail');
      }
    },
  },
};
</script>

<style></style>
