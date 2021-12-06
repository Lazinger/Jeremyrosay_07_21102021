<template>
  <div class="card">
    <v-container>
      <v-row justify="space-around">
        <v-card width="600">
          <v-img
            height=""
            src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
          >
            <v-app-bar flat color="rgba(0, 0, 0, 0)">
              <v-card-title class="white--text mt-8">
                <v-avatar size="56">
                  <!-- <img
                    v-if="post.User.photo"
                    :src="post.User.photo"
                    alt="Photo de profil"
                  /> -->
                  <!-- <img
                    v-else-if="
                      post.User.photo === null &&
                      post.User.id === $store.state.user.id
                    "
                    src="../static/image-1.png"
                  /> -->
                </v-avatar>
                <p class="ml-3">John Doe</p>
              </v-card-title>

              <v-spacer></v-spacer>

              <v-btn color="white" icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-app-bar>
          </v-img>

          <v-card-text>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora,
              consequatur eveniet! Minima ut, recusandae obcaecati amet sed
              enim. Consequatur magnam numquam nisi minus ea delectus officia
              ipsa repellendus sequi quia.
            </p>
          </v-card-text>
          <v-btn @click="wall"></v-btn>
        </v-card>
      </v-row>
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
  methods: {
    async wall() {
      try {
        const res = await getPosts.wall(this.$axios, this.$store);
        console.log('response', res);
        let data = res;
        console.log('data', data);
        this.$store.dispatch('getPosts', data.posts);
      } catch (error) {}
    },
  },
  computed: {},
};
</script>

<style></style>
