<template>
  <div>
    <v-row v-if="isLogged === true" justify="space-around">
      <v-card
        width="800"
        flat
        class="text-left ma-3 d-flex flex-column justify-center space-around"
      >
        <client-only>
          <v-responsive v-if="user && user.photo" class="pt-4 text-center">
            <v-avatar size="100">
              <img :src="user.photo" alt="anon" />
            </v-avatar>
          </v-responsive>
          <v-responsive v-else class="pt-4 text-center">
            <v-avatar size="100">
              <img src="../static/image-1.png" alt="anon" />
            </v-avatar>
          </v-responsive>
        </client-only>
        <v-btn @click="togglePhoto">Modifier image profil</v-btn>

        <client-only>
          <div v-if="updatePhoto" class="d-flex justify-center mt-5">
            <label for="image" class="mr-3"></label>
            <input
              @change="uploadImage"
              type="file"
              accept="image/png, image/jpeg,
                    image/bmp, image/gif"
              ref="file"
              name="image"
              class="input-group--focused"
            />
          </div>
        </client-only>

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

          <v-responsive v-if="displayAboutMe">
            <div
              class="d-flex flex-column justify-space-between"
              max-width="70%"
            >
              Ta bio:
              <div>
                <!-- <span>{{ user?.aboutMe }}</span> -->
              </div>
            </div>
            <v-btn
              @click="toggleAboutMe"
              class="ma-2"
              outlined
              small
              fab
              color="indigo"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
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

          <div class="d-flex flex-column">
            <client-only>
              <div>
                <v-card-text v-if="options" class="font-weight-light">
                  <br />
                  <div class="danger-alert" v-html="errorMessage" />
                  <div class="danger-alert" v-html="messageRetour" />

                  <div class="d-flex justify-center">
                    <v-btn @click="onSubmit(user.id)" :disabled="!isValid"
                      >Envoyer</v-btn
                    >
                  </div>
                </v-card-text>
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
      options: false,
      displayAboutMe: true,
      errorMessage: null,
      messageRetour: null,
      isValid: true,
      newAboutMe: '',
      aboutMeRules: [(v) => v.length <= 400 || 'Max 400 caractères'],
    };
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
      }, 1000);
    },
    onSubmit() {
      const formData = new FormData();

      formData.append('aboutMe', this.newAboutMe);
      if (this.file !== null) {
        formData.append('image', this.file);
      }
      this.$store.dispatch('getUserById', this.user.id);
      this.$store.dispatch('updateAccount', formData);
      this.updateAboutMe = false;
      this.updatePhoto = false;
      this.options = false;
      this.displayAboutMe = true;
      this.displayPhoto = true;
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
