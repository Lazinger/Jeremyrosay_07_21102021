export default {
  async login(axios, data, store, toast) {
    try {
      const res = await axios.post('/login', data);
      store.commit('SET_USER', res.data.user);
      toast(res.data.message);
      return Promise.resolve(res.data);
    } catch (e) {
      return Promise.resolve(false);
    }
  },
};
