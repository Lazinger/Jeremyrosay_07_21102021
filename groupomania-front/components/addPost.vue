<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" temporary max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn text color="blue" dark v-bind="attrs" v-on="on">
          Ajouter un post
        </v-btn>
      </template>
      <v-card v-if="isLogged === true">
        <v-card-title>
          <span class="text-h5">Ajouter un post</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
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
          <NuxtLink to="/login" setTimeOut="1500">ici</NuxtLink> pour vous
          connecter. <br />Sinon cliquez
          <NuxtLink to="/signup">ici</NuxtLink> pour vous inscrire</v-card-text
        >
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
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
      this.$store.dispatch('createPost', formData);
      this.$router.push('/');
    },
  },
};
</script>

<style></style>
