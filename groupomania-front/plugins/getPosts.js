export default {
  async wall(axios, store) {
    try {
      const res = await axios.get('/posts');

      store.commit('GET_POSTS', res.data);

      return Promise.resolve(res.data);
    } catch (e) {
      return Promise.resolve(false);
    }
  },
};
