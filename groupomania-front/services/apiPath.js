import axios from 'axios';
import store from '../store';

export default () => {
  return axios.create({
    baseURL: process.env.API_URL,

    headers: {
      Authorization: `${store.state.token}`,
    },
  });
};
