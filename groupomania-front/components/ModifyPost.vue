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
      </v-form>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ModifyPost',
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
  beforeMount() {
    let id = this.$route.params.id;
    this.$store.dispatch('getPostById', id);
  },
  computed: {
    post() {
      return this.$store.getters.post;
    },
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
};
</script>

<style></style>
