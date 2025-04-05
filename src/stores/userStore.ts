import { defineStore, acceptHMRUpdate } from 'pinia';
import type { UserInfoI } from 'src/interfaces/ChatInterface';
import { showNotify } from 'src/utils/notifier';
import { loginApi, logoutApi, registerApi } from 'src/api/auth';
import { Cookies } from 'quasar';
import type { ErrorResponseI } from 'src/interfaces/GenericInterface';
import { usePaginationStore } from './paginationStore';
import { useChatStore } from './chatStore';

const paginationStore = usePaginationStore();
const chatStore = useChatStore();

interface AuthState {
  isAuthenticated: boolean;
  userProfile: UserInfoI | null;
}

export const useUserStore = defineStore('user', {
  state: (): AuthState => ({
    isAuthenticated: false,
    userProfile: null,
  }),
  getters: {},
  actions: {
    async register(
      username: string,
      email: string,
      password: string,
      passwordConfirmation: string,
    ) {
      try {
        if (password === passwordConfirmation) {
          const response = await registerApi(username, email, password);
          showNotify(response.data.message);
          if (response.status === 201) await this.router.push({ path: 'login' });
        }
      } catch (error) {
        const errorCode = (error as ErrorResponseI).response.data.error;
        showNotify(errorCode, 'negative');
      }
    },
    async login(email: string, password: string) {
      try {
        const response = await loginApi(email, password);
        showNotify(response.data.message);
        if (response.status === 200) {
          this.isAuthenticated = true;
          this.userProfile = response.data.user;
          this.$reset();
          paginationStore.$reset();
          chatStore.$reset();
          Cookies.set('isAuthenticated', 'true', { expires: '58m', path: '/' });
          await this.router.push({ path: 'user/home' });
        }
      } catch (error) {
        const errorCode = (error as ErrorResponseI).response.data.error;
        showNotify(errorCode, 'negative');
      }
    },
    async logout() {
      try {
        const response = await logoutApi();
        showNotify(response.data.message);
        if (response.status === 200) {
          this.$reset();
          paginationStore.$reset();
          chatStore.$reset();
          Cookies.remove('isAuthenticated');
          await this.router.push('/login');
        }
      } catch (error) {
        const errorCode = (error as ErrorResponseI).response.data.error;
        showNotify(errorCode, 'negative');
      }
    },
  },
  persistedState: {
    key: 'user',
    storage: sessionStorage,
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
