import { defineStore, acceptHMRUpdate } from 'pinia';
import { getAllUsersApi, searchUsersApi } from 'src/api/users';
import type { ErrorResponseI, UserPaginationStateI } from 'src/interfaces/GenericInterface';
import { showNotify } from 'src/utils/notifier';

interface PaginationStateI {
  users: UserPaginationStateI;
}

export const usePaginationStore = defineStore('paginationData', {
  state: (): PaginationStateI => ({
    users: {
      users: [],
      page: 0,
      limit: 10,
    },
  }),
  getters: {},
  actions: {
    async getAllUsers() {
      try {
        const response = await getAllUsersApi(this.users.page, this.users.limit);
        this.users.page = response.data.page + response.data.users.length;
        this.users.limit = response.data.limit;

        const existingIds = new Set(this.users.users.map((user) => user.id));
        const newUsers = response.data.users.filter((user) => !existingIds.has(user.id));
        this.users.users.push(...newUsers);
      } catch (error) {
        const errorCode = (error as ErrorResponseI).response.data.error;
        showNotify(errorCode, 'negative');
      }
    },
    async searchUsers(query: string) {
      try {
        const response = await searchUsersApi(query);

        const existingIds = new Set(this.users.users.map((user) => user.id));
        const newUsers = response.data.filter((user) => !existingIds.has(user.id));
        this.users.users.push(...newUsers);
      } catch (error) {
        const errorCode = (error as ErrorResponseI).response.data.error;
        showNotify(errorCode, 'negative');
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePaginationStore, import.meta.hot));
}
