import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user-store', () => {
  const token = ref(''); // 用户token

  const setToken = (userToken) => {
    token.value = userToken;
    localStorage.setItem('token', userToken);
  };

  const delToken = (token) => {
    token.value = '';
    localStorage.removeItem('token');
  };

  return { token, setToken, delToken };
});
