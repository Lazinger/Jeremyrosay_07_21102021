import vuex from 'vuex';

const createStore = () => {
  return new vuex.Store({
    state: {
      token: null,
      user: {},
      isLoggedIn: false,
      users: [],
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
        state.token = null;
        state.user = null;
        state.isLoggedIn = false;
        state.message = '';
        state.error = '';
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
        console.log(id);
        this.$axios.$get('/accounts/' + id).then((response) => {
          const user = response.data;
          commit('GET_USER_BY_ID', user);
        });
      },
      getUsers({ commit }) {
        this.$axios.$get('/accounts').then((response) => {
          const users = response.data;
          commit('GET_USERS', users);
        });
      },
      logOut({ commit }) {
        commit('LOG_OUT');
      },
    },
    getters: {
      user(state) {
        return state.user;
      },
      isLogged(state) {
        return state.isLoggedIn;
      },
    },
  });
};

export default createStore;
