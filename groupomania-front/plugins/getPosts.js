export default {
  async wall(axios, store) {
    try {
      const res = await axios.get('/posts');

      store.commit('GET_POSTS', res.data);

      console.log(res);
      return Promise.resolve(res.data);
    } catch (e) {
      console.log(e);
      return Promise.resolve(false);
    }
  },
};