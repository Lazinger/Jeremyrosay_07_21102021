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
        state.message = 'compte modifié';
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
    },
    getters: {
      user(state) {
        return state.user;
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
    },
  });
};

export default createStore;
