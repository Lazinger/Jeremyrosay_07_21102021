export const state = () => ({
  user: null,
  users: [],
  isLoggedIn: false,
});

export const mutations = {
  addUser(state, userToAdd) {
    state.user = userToAdd;
  },
};

export const actions = {};

export const getters = {};
