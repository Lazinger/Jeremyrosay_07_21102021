<template>
  <div>
    <v-container>
      <v-row justify="space-around">
        <v-card
          width="800"
          flat
          class="text-center ma-3 d-flex justify-center space-around"
        >
          Hello c'est moi
        </v-card>
      </v-row>
    </v-container>
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
};
</script>

<style></style>
