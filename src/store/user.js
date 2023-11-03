import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user-store', () => {
  const token = ref(''); // 用户token
  const userInfo = ref('');

  const setToken = (userToken) => {
    token.value = userToken;
    localStorage.setItem('token', userToken);
  };

  const delToken = () => {
    token.value = '';
    localStorage.removeItem('token');
  };

  const setUserInfo = (info) => {
    userInfo.value = info;
  };

  const delUserInfo = () => {
    userInfo.value = '';
  };

  return { token, userInfo, setToken, delToken, setUserInfo, delUserInfo };
});
