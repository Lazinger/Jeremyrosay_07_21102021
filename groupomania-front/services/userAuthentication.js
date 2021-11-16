import connectToApi from './connectToApi';

export default {
  signup(data) {
    return connectToApi().post('users/signup', data);
  },
  login(data) {
    return connectToApi().post('users/login', data);
  },
};
