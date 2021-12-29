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
                  <img
                    v-else
                    src="../static/image-1.png"
                    alt="Photo de profil par défaut"
                  />
                </v-avatar>

                <div class="ml-3" color="black">
                  {{ post.User.firstName }}
                </div>
              </template>
              <v-spacer></v-spacer>

              <!-- ZONE 3 PETITS POINTS MENU SUPPRIMER ET MODIFIER -->
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
            <v-img :src="post.image" height="600"> </v-img>

            <v-card-title class="white mb-4">
              "{{ post.message }}"</v-card-title
            >

            <!-- AFFICHE LES COMMENTAIRES EXISTANT ET LES "AJOUTER NOUVEAUX" -->
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
                ><v-icon>mdi-comment</v-icon
                ><span>{{ post.Comments.length }} </span></v-btn
              >
            </div>
            <v-card-title v-if="displayAllComment" class="grey lighten-4">
              <v-list v-for="comment in post.Comments" :key="comment.id">
                <v-list-item>
                  <v-list-item-avatar>
                    <img
                      v-if="comment.User.photo != null"
                      :src="comment.User.photo"
                      alt="Photo de l'utilisateur qui a commenté"
                    />
                    <img
                      v-else
                      src="../static/image-1.png"
                      alt="Photo de profil par defaut"
                    />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ comment.firstName }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ comment.message }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-title>

            <div v-if="displayNewComment" class="px-5 white">
              <v-textarea
                class=""
                clearable
                clear-icon="mdi-close-circle"
              ></v-textarea>
              <v-btn class="mb-3">Poster</v-btn>
            </div>
            <v-btn class="mb-4" @click="debug()">Debug</v-btn>
            <v-divider></v-divider>
          </v-card>

          <!-- DIALOG POUR MODIFIER ET SUPPRIMER POST -->

          <v-dialog v-model="dialogPost" max-width="650px">
            <ModifyPost v-bind:post-in-modification="postInModification" />
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
      commentCounter: 0,
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
    debug() {
      console.log(this.posts);
      console.log(this.posts.comments);
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
    showCommentCount() {
      this.commentCounter = comment.length;
    },
  },
};
</script>

<style></style>
