<template>
  <v-main class="card">
    <v-container>
      <v-row justify="center">
        <v-spacer></v-spacer>

        <v-col>
          <pre>{{ postInModification }}</pre>

          <pre>{{ postUserInformation }}</pre>

          <v-card
            outlined
            color="transparent"
            v-for="post in posts"
            :key="post.id"
            width="600"
            class="my-4"
          >
            <v-card-title class="white mb-n2">
              <template>
                <v-avatar
                  v-if="isLogged"
                  @click="getUserInformation(post)"
                  size="56"
                >
                  <img
                    v-if="post.User.photo"
                    :src="post.User.photo"
                    alt="Photo de profil"
                  />
                  <img v-else src="../static/image-1.png" />
                </v-avatar>
                <v-avatar v-else size="56">
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
              </template>
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
                    <v-icon color="black">mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list
                  v-if="
                    (isLogged && $store.state.user.id === post.User.id) ||
                    (isLogged && $store.state.user.admin)
                  "
                  class="d-flex flex-column"
                >
                  <v-btn plain @click="deletePost(post.id)"
                    ><v-icon>mdi-delete</v-icon> Supprimer le post</v-btn
                  >
                  <template>
                    <v-btn plain @click="editPost(post)" class="mt-3"
                      ><v-icon>mdi-pencil</v-icon> Modifier le post</v-btn
                    >
                  </template>
                </v-list>

                <v-card v-else>
                  <v-card-text>
                    Vous ne pouvez pas supprimer ou modifier ce post car vous
                    n'en etes pas l'auteur
                  </v-card-text>
                </v-card>
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

            <v-card-title class="white mb-4">
              "{{ post.message }}"</v-card-title
            >

            <v-card-title v-if="displayAllComment" class="grey lighten-4">
              <div class="d-flex">
                <v-avatar size="35" class="">
                  <img
                    v-if="post.User.photo"
                    :src="post.User.photo"
                    alt="Photo de profil"
                  />
                  <img v-else src="../static/image-1.png" />
                </v-avatar>
                <div class="">
                  <v-card-text class="mt-n5">
                    <span class="font-weight-bold">
                      {{ post.User.firstName }} </span
                    ><br />
                    {{ post.message }}
                  </v-card-text>
                </div>
              </div>

              <v-card-text></v-card-text>
            </v-card-title>

            <div>
              <v-btn
                plain
                color="black"
                @click="displayNewComment = !displayNewComment"
                ><v-icon>mdi-comment-plus</v-icon></v-btn
              >
              <v-btn
                plain
                color="black"
                @click="displayAllComment = !displayAllComment"
                ><v-icon>mdi-comment</v-icon></v-btn
              >
            </div>

            <div v-if="displayNewComment" class="px-5 white">
              <v-textarea
                class=""
                clearable
                clear-icon="mdi-close-circle"
              ></v-textarea>
              <v-btn class="mb-3">Poster</v-btn>
            </div>
          </v-card>
          <v-divider></v-divider>

          <v-dialog v-model="dialogPost" max-width="650px">
            <ModifyPost />
          </v-dialog>
          <v-dialog v-model="dialogUser" max-width="650px">
            <PostUser />
          </v-dialog>
        </v-col>

        <v-spacer></v-spacer>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import getPosts from '../plugins/getPosts';

export default {
  name: 'Posts',

  data: () => {
    return {
      message: '',
      file: '',
      dialogPost: false,
      dialogUser: false,
      rules: {
        required: (value) => !!value || 'Required.',
      },
      postInModification: undefined,
      postUserInformation: undefined,
      errorMessage: null,
      displayNewComment: false,
      displayAllComment: false,
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
    user() {
      return this.$store.getters.user;
    },
    isLogged() {
      return this.$store.getters.isLogged;
    },
  },

  methods: {
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
      } catch (error) {
        console.log('Le bug est ici, cherche');
      }
    },

    editPost(post) {
      // Ouvrir le dialog //
      this.postInModification = post;
      this.dialogPost = true;
      console.log(this.post);
    },
    getUserInformation(post) {
      this.postUserInformation = post;
      this.dialogUser = true;
      console.log(this.post);
    },
    toggleNewComment() {
      this.displayNewComment = true;
    },
    toggleAllComment() {
      this.displayAllComment = true;
    },
  },
};
</script>

<style></style>
