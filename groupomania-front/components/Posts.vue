<template>
  <div class="card">
    <v-container>
      <v-row justify="space-around">
        <client-only>
          <v-card v-for="post in posts" :key="post.id" width="500" class="my-4">
            <v-card-title>
              <v-avatar size="56">
                <img
                  v-if="post.User.photo"
                  :src="post.User.photo"
                  alt="Photo de profil"
                />
                <img v-else src="../static/image-1.png" />
              </v-avatar>
              <p class="ml-3" color="black">
                {{ post.User.firstName }}
              </p>
            </v-card-title>
            <v-img :src="post.image" height="500">
              <v-app-bar flat color="rgba(0, 0, 0, 0)">
                <v-card-title class="mt-8"> </v-card-title>

                <v-spacer></v-spacer>

                <v-btn color="white" icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </v-app-bar>
            </v-img>

            <v-card-text>
              <p>
                {{ post.message }}
              </p>
            </v-card-text>
          </v-card>
        </client-only>
      </v-row>
      <v-btn @click="wall" color="red" class="mt-5"
        >Je genere les messages</v-btn
      >
    </v-container>
  </div>
</template>

<script>
import getPosts from '../plugins/getPosts';
export default {
  name: 'Posts',
  data: () => {
    return {
      errorMessage: null,
    };
  },
  computed: {
    beforeMount() {
      this.wall();
    },
    posts: function () {
      console.log('ZE STORE', this.$store.state.posts);
      return this.$store.state.posts;
    },
  },
  methods: {
    async wall() {
      try {
        const res = await getPosts.wall(this.$axios, this.$store);
        let data = res;

        this.$store.dispatch('getPosts', data);
      } catch (error) {}
    },
  },
};
</script>

<style></style>
