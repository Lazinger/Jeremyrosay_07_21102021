<template>
  <v-container fluid>
    <v-row justify="center">
      <v-form>
        <v-card v-if="isLogged === true">
          <v-card-title>
            <span class="text-h5">Ajouter un post</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row class="d-flex">
                <v-col cols="12" sm="6" md="12">
                  <div>
                    <input
                      @change="uploadImage"
                      type="file"
                      accept="image/png, image/jpeg,
                    image/bmp, image/gif"
                      ref="file"
                      name="image"
                      class="input-group--focused mt-5"
                    />
                  </div>
                </v-col>
                <v-col cols="12" sm="6" md="12">
                  <v-textarea
                    name="input-1-3"
                    label="Message"
                    v-model="message"
                    :rules="[rules.required]"
                    auto-grow
                    class="input-group--focused"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
            <small>*indique que c'est obligatoire</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Fermer
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="onSubmit()"
              :disabled="!isValid"
            >
              Soumettre
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-card v-else>
          <v-card-title>Vous n'êtes pas connecté.</v-card-title>
          <v-card-text
            >Vous possédez deja un compte ? Cliquez
            <NuxtLink to="/login">ici</NuxtLink> pour vous connecter.
            <br />Sinon cliquez <NuxtLink to="/signup">ici</NuxtLink> pour vous
            inscrire</v-card-text
          >
        </v-card>
      </v-form>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      isValid: true,
      file: '',
      message: '',
      rules: {
        required: (value) => !!value || 'Required.',
      },
    };
  },
  computed: {
    isLogged() {
      return this.$store.getters.isLogged;
    },
    messageRetour() {
      return this.$store.getters.message;
    },
    errorMessage() {
      return this.$store.getters.error;
    },
  },

  methods: {
    uploadImage() {
      const file = this.$refs.file.files[0];
      this.file = file;
    },
    onSubmit() {
      const formData = new FormData();
      formData.append('message', this.message);
      if (this.file !== null) {
        formData.append('image', this.file);
      }
      console.log(this.message);
      console.log(this.file);

      this.$store.dispatch('createPost', formData);
    },
  },
};
</script>

<style></style>
