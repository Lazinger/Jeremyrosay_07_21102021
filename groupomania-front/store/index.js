import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import connectToApi from '../services/connectToApi';
import userAuthentication from '../services/userAuthentication';

Vue.use(Vuex);

export const state = () => ({
  token: null,
  user: {},
  isLoggedIn: false,
});

export const mutations = {
  SET_TOKEN(state, token) {
    localstorage.setItem('token', (state.token = token));
    if (localstorage.getItem('token')) {
      state.isLoggedIn = true;
    } else {
      state.isLoggedIn = false;
    }
  },
  DELETE_TOKEN(state) {
    if (localstorage.getItem('token')) {
      state.token = null;
      state.user = '';
      state.isLoggedIn = false;
    }
  },
};

export const actions = {
  setToken({ commit }, token) {
    commit('SET_TOKEN', token);
  },
  deleteToken({ commit }, token) {
    commit('DELETE_TOKEN', token);
  },
};

export const getters = {};
