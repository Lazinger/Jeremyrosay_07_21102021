import vuex from 'vuex';

const createStore = () => {
  return new vuex.Store({
    state: {
      token: null,
      user: {},
      isLoggedIn: false,
      users: [],
      posts: [],
      post: {},
      message: '',
      error: '',
    },

    mutations: {
      SET_TOKEN(state, token) {
        state.token = token;
        if (token) {
          state.isLoggedIn = true;
        } else {
          state.isLoggedIn = false;
        }
      },
      DELETE_TOKEN(state) {
        state.token = null;
        state.user = '';
        state.isLoggedIn = false;
      },
      SET_USER(state, user) {
        state.user = user;
      },

      GET_USER_BY_ID(state, user) {
        state.user = user;
      },
      GET_USERS(state, users) {
        state.users = users;
      },
      LOG_OUT(state) {
        localStorage.clear();
        state.token = null;
        state.user = null;
        state.isLoggedIn = false;
        state.message = '';
        state.error = '';
      },
      UPDATE_ACCOUNT(state, user) {
        state.user = user;
        state.message = 'Le compte à bien été modifié';
      },
      DELETE_ACCOUNT(state, id) {
        state.users = [...state.users.filter((element) => element.id !== id)];
        state.message = 'compte supprimé';
      },
      // Posts

      GET_POSTS(state, posts) {
        state.posts = posts;
      },
      CREATE_POST(state, post) {
        state.posts = [post, ...state.posts];
        state.message = 'Le post à bien été créé';
      },
      DELETE_POST(state, postId) {
        state.posts = [
          ...state.posts.filter((element) => element.id !== postId),
        ];
        state.message = 'Le post à bien été supprimé';
      },
      UPDATE_POST(state, post) {
        let index = state.posts.findIndex((element) => element.id === post.id);
        post.User = state.posts[index].User;
        post.Comments = state.posts[index].Comments;
        state.posts[index] = post;

        state.message = 'Votre post a bien été modifié';
      },
      CREATE_COMMENT(state, comment) {
        state.posts = [comment, ...state.posts];
      },
    },
    actions: {
      setToken({ commit }, token) {
        commit('SET_TOKEN', token);
      },
      deleteToken({ commit }, token) {
        commit('DELETE_TOKEN', token);
      },
      setUser({ commit }, user) {
        commit('SET_USER', user);
      },
      getUserById({ commit }) {
        let id = this.state.user.id;
        let config = {
          headers: {
            Authorization: this.state.token,
          },
        };

        this.$axios.$get('accounts/' + id, config).then((user) => {
          commit('GET_USER_BY_ID', user);
        });
      },
      getUsers({ commit }) {
        let config = {
          headers: {
            Authorization: this.state.token,
          },
        };
        this.$axios.$get('accounts', config).then((response) => {
          const users = response.data;
          commit('GET_USERS', users);
        });
      },
      logOut({ commit }) {
        commit('LOG_OUT');
      },
      updateAccount({ commit }, data, user) {
        let id = this.state.user.id;
        let config = {
          headers: {
            Authorization: this.state.token,
          },
        };
        this.$axios.$put(`accounts/${id}`, data, config).then((response) => {
          const newUser = response.user;

          commit('UPDATE_ACCOUNT', newUser);
        });
      },
      deleteAccount({ commit }, id) {
        let config = {
          headers: {
            Authorization: this.state.token,
          },
        };
        this.$axios.$delete(`accounts/${id}`, config).then(() => {
          commit('DELETE_ACCOUNT', id);
        });
      },
      // Posts
      updatePost({ commit }, payload) {
        let config = {
          headers: {
            Authorization: this.state.token,
          },
        };

        this.$axios
          .$put(`posts/${payload.id}`, payload.data, config)
          .then((response) => {
            const post = response.newPost;
            commit('UPDATE_POST', post);
          });
      },

      getPosts({ commit }) {
        this.$axios.$get(`posts`).then((response) => {
          const posts = response;

          commit('GET_POSTS', posts);
        });
      },

      createPost({ commit }, post) {
        let config = {
          headers: {
            Authorization: this.state.token,
          },
        };
        this.$axios
          .$post(`posts/newPost`, post, config)
          .then((response) => {
            const post = response;
            commit('CREATE_POST', post);
          })
          .then(() => {
            this.$axios.$get(`posts`, config).then((response) => {
              const posts = response;
              commit('GET_POSTS', posts);
            });
          });
      },

      deletePost({ commit }, postId) {
        let config = {
          headers: {
            Authorization: this.state.token,
          },
        };

        this.$axios.$delete(`posts/` + postId, config).then(() => {
          commit('DELETE_POST', postId);
        });
      },

      createComment({ commit }, payload) {
        let config = {
          headers: {
            Authorization: this.state.token,
          },
        };
        this.$axios
          .post(`posts/${payload.id}/comments`, payload.data, config)
          .then((res) => {
            const comment = res.data;

            commit('CREATE_COMMENT', comment);
          })
          .then(() => {
            this.$axios.$get(`posts`).then((response) => {
              const posts = response;

              commit('GET_POSTS', posts);
            });
          });
      },
    },

    getters: {
      user(state) {
        return state.user;
      },
      users(state) {
        return state.users;
      },
      isLogged(state) {
        return state.isLoggedIn;
      },
      messageRetour(state) {
        return state.message;
      },
      errorMessage(state) {
        return state.error;
      },
      post(state) {
        return state.post;
      },
      posts(state) {
        return state.posts;
      },
    },
  });
};

export default createStore;
