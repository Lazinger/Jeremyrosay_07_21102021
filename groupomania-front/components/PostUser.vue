<template>
  <v-card>
    <v-card-title>
      <!-- <v-avatar>
        <img :src="post.User.photo" alt="" />
      </v-avatar> -->
      <span class="text-h5 ml-5">{{ post }}</span>
    </v-card-title>
    <v-card-text> A propos de {{ post }} : </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn
        v-if="$store.state.user.admin"
        color="blue darken-1"
        text
        @click="deleteAccount(post.User.id)"
      >
        Supprimer le compte
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => {
    return {};
  },
  computed: {
    post() {
      return this.$store.getters.post;
    },
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    deleteAccount(id) {
      this.$store.dispatch('deleteAccount', id);
      if (this.$store.state.user.admin != true) {
        this.$store.dispatch('logOut');
      }
    },
  },
};
</script>

<style></style>
