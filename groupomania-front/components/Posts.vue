<template>
  <div class="card">
    <v-container>
      <v-row justify="space-around">
        <client-only>
          <v-card v-for="post in posts" :key="post.id" width="600" class="my-4">
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
            <v-img
              src="https://img-19.ccm2.net/WNCe54PoGxObY8PCXUxMGQ0Gwss=/480x270/smart/d8c10e7fd21a485c909a5b4c5d99e611/ccmcms-commentcamarche/20456790.jpg"
              height="200"
            >
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
  name: 'Cards',
  data: () => {
    return {
      errorMessage: null,
    };
  },
  computed: {
    async beforeMount() {
      const before = await this.wall();
      return before;
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
        console.log('data', data);
        this.$store.dispatch('getPosts', data);
        console.log('storeStatePosts', this.$store.state.posts);
      } catch (error) {}
    },
  },
};
</script>

<style></style>
