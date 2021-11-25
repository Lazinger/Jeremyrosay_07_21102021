export default {
  async login(axios, data, store, toast) {
    try {
      const res = await axios.post('/login', data);
      store.commit('SET_USER', res.data.user);
      toast(res.data.message);
      console.log(res);
      return Promise.resolve(res.data);
    } catch (e) {
      console.log(e);
      return Promise.resolve(false);
    }
  },
};
