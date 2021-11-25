<template>
  <div>
    <v-row justify="space-around">
      <v-card
        width="800"
        flat
        class="text-center ma-3 d-flex flex-column justify-center space-around"
      >
        <v-responsive class="pt-4">
          <v-avatar size="100">
            <img src="../static/image-1.png" alt="anon" />
          </v-avatar>
        </v-responsive>
        <v-card-text>
          <div class="grey--text mb-3">
            Firstname : hello {{ user.firstName }}
          </div>
          <div class="grey--text mb-3">LastName :</div>
          <div class="grey--text mb-3">Email :</div>
          <div class="d-flex flex-column">
            <label for="bio" class="mb-5">Ma bio</label>
            <textarea name="bio" id="bio" cols="30" rows="10">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, aliquid? Distinctio, quasi, labore doloribus recusandae inventore nam animi reprehenderit deserunt, possimus assumenda quos. Laudantium odio voluptate molestiae optio perspiciatis dolore!
          </textarea
            >
          </div>
        </v-card-text>
      </v-card>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'Profil',
  data() {
    return {};
  },
  methods: {
    async getUser() {
      const user = localStorage.getItem('userSession');
      console.log(user);
    },
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
};
</script>

<style></style>
