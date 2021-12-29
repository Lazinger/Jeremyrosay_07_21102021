<template>
  <div>
    <v-row v-if="isLogged === true" justify="space-around">
      <v-card
        width="800"
        class="text-left ma-3 d-flex flex-column justify-center space-around"
        elevation="5"
      >
        <v-card-title class="mx-auto">Voici ta page profil</v-card-title>
        <v-divider></v-divider>
        <client-only>
          <v-responsive class="pt-4 text-center">
            <v-avatar size="100px">
              <img v-if="user.photo" :src="user.photo" alt="anon" />
              <img
                v-else
                src="../static/image-1.png"
                alt="Image de profil par défaut"
              />
            </v-avatar>
          </v-responsive>
        </client-only>
        <v-responsive class="d-flex ml-4">
          <div>
            <input
              @change="uploadImage"
              type="file"
              accept="image/png, image/jpeg,
                    image/bmp, image/gif"
              ref="file"
              name="image"
              class="mt-5"
            />
          </div>
        </v-responsive>

        <v-card-text>
          <div class="black--text mb-3">Prénom : {{ user.firstName }}</div>
          <div class="black--text mb-3">Nom : {{ user.lastName }}</div>
          <div class="black--text mb-3">Email : {{ user.email }}</div>

          <v-responsive>
            <div
              class="d-flex flex-column justify-space-between"
              max-width="70%"
            >
              <div class="black--text mb-3">
                Ton histoire :
                <span class="grey--text mb-3">
                  {{ user.aboutMe }}
                </span>
                <v-btn
                  @click="toggleAboutMe"
                  class="ma-2"
                  outlined
                  x-small
                  fab
                  color="indigo"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </div>
            </div>
          </v-responsive>
          <v-textarea
            v-if="updateAboutMe"
            label="Ecris ici"
            v-model="newAboutMe"
            :rules="aboutMeRules"
            solo
            name="input-7-4"
            class="input-group--focused bio"
          >
          </v-textarea>
          <v-divider></v-divider>
          <div class="d-flex flex-column mt-4">
            <client-only>
              <div class="d-flex justify-center">
                <v-btn @click="onSubmit(user.id)" :disabled="!isValid"
                  >Envoyer</v-btn
                >
              </div>
            </client-only>
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
    return {
      updateAboutMe: false,
      updatePhoto: false,
      displayAboutMe: true,
      displayPhoto: true,
      options: false,
      errorMessage: null,
      messageRetour: null,
      isValid: true,
      newAboutMe: '',
      aboutMeRules: [(v) => v.length <= 400 || 'Max 400 caractères'],
      file: '',
    };
  },
  beforeMount() {
    this.$store.dispatch('getUserById');
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    isLogged() {
      return this.$store.getters.isLogged;
    },
  },
  methods: {
    togglePhoto() {
      this.updatePhoto = true;
      this.options = true;
      this.displayPhoto = false;
    },
    toggleAboutMe() {
      this.updateAboutMe = true;
      this.displayAboutMe = false;
      this.options = true;
    },
    uploadImage() {
      const file = this.$refs.file.files[0];
      this.file = file;
      console.log(this.file);
    },
    logOut() {
      this.$store.dispatch('logOut');
      setTimeout(() => {
        this.$router.push('/');
      }, 1500);
    },

    onSubmit(userId) {
      console.log('userID', userId);
      const formData = new FormData();

      formData.append('aboutMe', this.newAboutMe);
      if (this.file !== null) {
        formData.append('image', this.file);
      }
      // this.$store.dispatch('getUsers');
      // this.$store.dispatch('getUserById', userId);
      console.log('formdata', formData);
      this.$store.dispatch('updateAccount', formData);
      // this.$store.dispatch('getUserById', userId);

      this.updateAboutMe = false;
      this.updatePhoto = false;
      this.options = false;
      this.displayAboutMe = true;
      this.displayPhoto = true;
    },
  },
};
</script>

<style scoped></style>
