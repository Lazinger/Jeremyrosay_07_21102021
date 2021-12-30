<template>
  <v-card>
    <pre>{{ postInModification }}</pre>
    <v-card-title>
      <span class="text-h5">Modifier votre post </span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
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
              label="Votre nouveau message"
              v-model="message"
              :rules="[rules.required]"
              auto-grow
              class="input-group--focused"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-container>
      <small>*indicates required field</small>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn
        color="blue darken-1"
        text
        @click="updatePost(postInModification.id)"
      >
        Sauvegarder
      </v-btn>

      <!-- <v-btn color="blue darken-1" text @click="debug()"> Debug </v-btn> -->
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => {
    return {
      file: '',
      message: '',
      rules: {
        required: (value) => !!value || 'Required.',
      },
    };
  },
  mounted: function () {
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been rendered
      console.log(this.postInModification);
      console.log('Je fonctionne');
      this.message = this.postInModification.message;
    });
  },
  props: ['postInModification'],
  methods: {
    debug() {
      console.log(this.postInModification);
      console.log('Je fonctionne');
    },
    updatePost(postId) {
      const formData = new FormData();
      if (this.message !== null) {
        formData.append('message', this.message);
      }
      formData.append('image', this.file);
      this.$store.dispatch('updatePost', postId, formData);
    },
    uploadImage() {
      const file = this.$refs.file.files[0];
      this.file = file;
    },
  },
  computed: {
    post() {
      return this.$store.getters.post;
    },
  },
};
</script>

<style></style>
