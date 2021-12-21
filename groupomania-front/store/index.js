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
      UPDATE_ACCOUNT(state, id, user) {
        Object.assign(
          state.users.find((element) => element.id === id),
          user
        );
        state.message = 'Le compte à bien été modifié';
      },
      // Posts

      GET_POSTS(state, posts) {
        state.posts = posts;
      },
      GET_POST_BY_ID(state, post) {
        state.post = post;
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
      UPDATE_POST(state, id, post) {
        Object.assign(
          state.posts.find((element) => element.id === id),
          post
        );

        state.message = 'Votre post est bien modifié';
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

        console.log(id);
        this.$axios.$get('accounts/' + id, config).then((user) => {
          console.log(user);
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
      updateAccount({ commit }, data) {
        let id = this.state.user.id;
        let config = {
          headers: {
            Authorization: this.state.token,
          },
        };
        this.$axios.$put(`accounts/${id}`, data, config).then((response) => {
          const newUser = response;
          commit('UPDATE_ACCOUNT', id, newUser);
        });
      },
      // Posts

      getPosts({ commit }) {
        this.$axios.$get(`posts`).then((response) => {
          const posts = response;
          console.log('posts from store', posts);
          commit('GET_POSTS', posts);
        });
      },
      getPostById({ commit }) {
        let id = this.state.user.id;
        let config = {
          headers: {
            Authorization: this.state.token,
          },
        };
        this.$axios.$get('posts/' + id, config).then((response) => {
          const post = response.data;
          commit('GET_POST_BY_ID', post);
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
            console.log(response);
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
        console.log('icicicicici', postId);
        let config = {
          headers: {
            Authorization: this.state.token,
          },
        };
        this.$axios
          .$delete(`posts/` + postId, config)
          .then(() => {
            commit('DELETE_POST', postId);
          })
          .then(() => {
            this.$axios.$get('posts').then((response) => {
              console.log(response);
              const posts = response.data;
              commit('GET_POSTS', posts);
            });
          });
      },
      updatePost({ commit }, data) {
        let config = {
          headers: {
            Authorization: this.state.token,
          },
        };
        let id = this.state.post.id;
        axios.put(`posts/${id}`, data, config).then((response) => {
          const post = response.data;
          commit('UPDATE_POST', id, post);
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
