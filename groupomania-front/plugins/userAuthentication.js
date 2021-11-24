export default {
  async login(axios, data, store, toast) {
    console.log('toto');
    try {
      console.log(axios);
      const res = await axios.post('/login', data);
      console.log(res);

      store.commit('addUser', res.data.user);
      toast(res.data.message);

      return Promise.resolve(res.data);
    } catch (e) {
      console.log(e);
      return Promise.resolve(false);
    }
  },
};
