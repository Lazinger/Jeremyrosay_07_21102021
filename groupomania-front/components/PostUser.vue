<template>
  <v-card>
    <v-card-title>
      <v-avatar>
        <img :src="user.photo" alt="" />
      </v-avatar>
      <span class="text-h5 ml-5">{{ user.firstName }}</span>
    </v-card-title>
    <v-card-text>
      A propos de {{ user.firstName }} :
      {{ user.aboutMe }}
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn color="blue darken-1" text @> Sauvegarder </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => {
    return {};
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {},
};
</script>

<style></style>
