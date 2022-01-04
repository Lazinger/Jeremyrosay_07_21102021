<template>
  <v-main class="card pt-1">
    <v-container>
      <v-row justify="center">
        <v-spacer></v-spacer>
        <v-col>
          <div class="text-center">
            <img
              src="../static/icon-above-font.png"
              alt=""
              contain
              transition="scale-transition"
              width="250"
            />
          </div>

          <v-card
            outlined
            color="transparent"
            v-for="post in posts"
            :key="post.id"
            max-width="600"
            class="my-4"
          >
            <v-card-title v-if="post.User" class="white mb-n2">
              <template>
                <v-avatar size="56">
                  <img
                    v-if="post.User.photo != null"
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
                <template v-if="isLogged" v-slot:activator="{ on, attrs }">
                  <v-btn dark icon v-bind="attrs" v-on="on">
                    <v-icon color="black">mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list
                  v-if="
                    (isLogged && $store.state.user.id === post.User.id) ||
                    (isLogged && $store.state.user.admin)
                  "
                  class="d-flex flex-column align-start"
                >
                  <v-btn
                    elevation="0"
                    @click="deletePost(post.id)"
                    class="white"
                    ><v-icon>mdi-delete</v-icon> Supprimer le post</v-btn
                  >

                  <template>
                    <v-btn elevation="0" @click="editPost(post)" class="white"
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
            <div class="d-flex justify-center">
              <v-img :src="post.image"> </v-img>
            </div>

            <v-card-title class="white mb-4">
              "{{ post.message }}"</v-card-title
            >

            <!-- AFFICHE LES COMMENTAIRES EXISTANT ET LES "AJOUTER NOUVEAUX" -->
            <div>
              <v-btn
                v-show="isLogged"
                plain
                color="black"
                @click="toggleDisplayNewComment(post.id)"
                ><v-icon>mdi-comment-plus</v-icon></v-btn
              >
              <v-btn plain color="black" @click="toggleDisplayComments(post.id)"
                ><v-icon>mdi-comment-eye</v-icon>
              </v-btn>
            </div>
            <v-card-title
              v-if="shouldDisplayComments(post.id)"
              class="grey lighten-4"
            >
              <v-list
                width="600"
                v-for="comment in post.Comments"
                :key="comment.id"
              >
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

            <div v-if="shouldDisplayNewComment(post.id)" class="px-5 white">
              <v-textarea
                v-model="commentParam.comment"
                clearable
                clear-icon="mdi-close-circle"
              ></v-textarea>
              <v-btn @click="createComment(post.id)" class="mb-3">Poster</v-btn>
            </div>

            <v-divider></v-divider>
          </v-card>

          <!-- DIALOG POUR MODIFIER ET SUPPRIMER POST -->
          <v-col cols="6">
            <v-dialog v-model="dialogPost">
              <ModifyPost v-bind:post-in-modification="postInModification" />
            </v-dialog>
          </v-col>
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

  data: function () {
    return {
      postToDisplayComments: [],
      postToDisplayNewComment: [],
      commentParam: {
        comment: '',
        commentFirstname: this.$store.getters.isLogged
          ? this.$store.state.user.firstName
          : '',
      },
      message: '',
      file: '',
      dialogPost: false,

      rules: {
        required: (value) => !!value || 'Required.',
      },
      postInModification: undefined,

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
    toggleDisplayComments(id) {
      if (this.postToDisplayComments.includes(id)) {
        this.postToDisplayComments = this.postToDisplayComments.filter(
          (el) => el != id
        );
      } else {
        this.postToDisplayComments.push(id);
      }
    },
    toggleDisplayNewComment(id) {
      if (this.postToDisplayNewComment.includes(id)) {
        this.postToDisplayNewComment = this.postToDisplayNewComment.filter(
          (el) => el != id
        );
      } else {
        this.postToDisplayNewComment.push(id);
      }
    },
    shouldDisplayNewComment(id) {
      return this.postToDisplayNewComment.includes(id);
    },
    shouldDisplayComments(id) {
      return this.postToDisplayComments.includes(id);
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
      try {
        this.$store.dispatch('deletePost', id);
      } catch (error) {}
    },

    editPost(post) {
      // Ouvrir le dialog //
      this.postInModification = post;
      this.dialogPost = true;
    },

    toggleNewComment() {
      this.displayNewComment = true;
    },
    toggleAllComment() {
      this.displayAllComment = true;
    },

    createComment(id) {
      this.$store.dispatch('createComment', {
        id: id,
        data: this.commentParam,
      });
    },
  },
};
</script>

<style></style>
