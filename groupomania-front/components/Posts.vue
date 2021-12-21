<template>
  <v-main class="card">
    <v-container>
      <v-row justify="center">
        <v-spacer></v-spacer>
        <v-col>
          <v-card v-for="post in posts" :key="post.id" width="600" class="my-4">
            <v-card-title class="blue-grey lighten-5">
              <v-avatar size="56">
                <img
                  v-if="post.User.photo"
                  :src="post.User.photo"
                  alt="Photo de profil"
                />
                <img v-else src="../static/image-1.png" />
              </v-avatar>
              <div class="ml-3" color="black">
                {{ post.User.firstName }}
              </div>
              <v-spacer></v-spacer>
              <v-menu
                bottom
                left
                origin="right top"
                transition="scale-transition"
              >
                <template
                  v-if="isLogged === true"
                  v-slot:activator="{ on, attrs }"
                >
                  <v-btn dark icon v-bind="attrs" v-on="on">
                    <v-icon color="red">mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list
                  v-if="
                    (isLogged === true &&
                      $store.state.user.id === post.User.id) ||
                    (isLogged === true && $store.state.user.admin === true)
                  "
                  class="d-flex flex-column"
                >
                  <v-btn plain @click="deletePost(post.id)"
                    ><v-icon>mdi-delete</v-icon> Supprimer le post</v-btn
                  >

                  <v-btn plain class="mt-3" @click="getOnePost(post.id)"
                    ><v-icon>mdi-pencil</v-icon> Modifier le post</v-btn
                  >
                </v-list>
                <v-list v-else>
                  <p>
                    Vous ne pouvez pas supprimer ou modifier ce post car vous
                    n'en etes pas l'auteur
                  </p>
                </v-list>
              </v-menu>
            </v-card-title>
            <v-img :src="post.image" height="600">
              <v-app-bar flat color="rgba(0, 0, 0, 0)">
                <v-spacer></v-spacer>

                <!-- <v-btn color="white" icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn> -->
              </v-app-bar>
            </v-img>

            <v-card-text class="blue-grey lighten-5">
              <div>
                <p>
                  Votre message : {{ post.message }} <br />
                  L'id du post est le : {{ post.id }} <br />

                  L'id de la personne qui a posté est le : {{ post.User.id }}
                </p>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      <v-btn @click="testButton" color="red" class="mt-5">DEBUG</v-btn>
    </v-container>
  </v-main>
</template>

<script>
import getPosts from '../plugins/getPosts';

export default {
  name: 'Posts',

  data: () => {
    return {
      errorMessage: null,
      notLogged: 'Droit insuffisant',
    };
  },
  beforeMount() {
    this.getAllPosts();
  },
  computed: {
    posts: function () {
      console.log('ZE STORE', this.$store.state.posts);
      return this.$store.state.posts;
    },
    isLogged() {
      return this.$store.getters.isLogged;
    },
  },
  methods: {
    testButton() {
      console.log('TEST BUTTON', this.$store.state);
    },
    async getAllPosts() {
      try {
        const res = await getPosts.wall(this.$axios, this.$store);
        let data = res;

        this.$store.dispatch('getPosts', data);
      } catch (error) {
        this.errorMessage = error.res.data.error;
      }
    },

    deletePost(id) {
      console.log('lalallalala', id);
      try {
        this.$store.dispatch('deletePost', id);
        this.$router.push('/');
      } catch (error) {
        console.log('Le bug est ici, cherche');
      }
    },
    getOnePost(id) {
      try {
        this.$router.push(`posts/modifyPost` + id);
      } catch (error) {
        console.log('Erreur 404', error);
      }
    },
  },
};
</script>

<style></style>
