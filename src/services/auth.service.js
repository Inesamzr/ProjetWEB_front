import { apiUrl } from '@/configs/api.config';
import axios from 'axios';
import store from'@/store/store';

const API_URL = apiUrl+ "/auth/";

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'signin', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data) {
            localStorage.setItem('token', response.data.token);
            store.commit('CHANGE_TOKEN',response.data.token)
            delete response.data.token
          localStorage.setItem('userInfo', JSON.stringify(response.data));
          store.commit('CHANGE_USER',response.data)
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('userInfo');
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();