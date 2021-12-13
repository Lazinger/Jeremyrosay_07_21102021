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
                <v-spacer></v-spacer>

                <!-- <v-btn color="white" icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn> -->
                <v-menu
                  bottom
                  left
                  origin="right top"
                  transition="scale-transition"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn dark icon v-bind="attrs" v-on="on">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list class="d-flex flex-column">
                    <v-btn plain @click="deletePost(post.User.id)"
                      ><v-icon>mdi-delete</v-icon> Supprimer le post</v-btn
                    >
                    <p>{{ post.id }}</p>
                    <v-btn plain class="mt-3"
                      ><v-icon>mdi-pencil</v-icon> Modifier le post</v-btn
                    >
                  </v-list>
                </v-menu>
              </v-app-bar>
            </v-img>

            <v-card-text>
              <p>
                Votre message : {{ post.message }} <br />
                Votre id : {{ post.id }}
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
    deletePost() {
      this.$emit('deletePost', this.post.id);
    },
  },
};
</script>

<style></style>
