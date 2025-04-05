import { api } from 'src/boot/axios';
import type { UserInfoI } from 'src/interfaces/ChatInterface';
import type { UserPaginationStateI } from 'src/interfaces/GenericInterface';

export const getAllUsersApi = async (page: number, limit: number) => {
  return await api.get<UserPaginationStateI>('/users/all', {
    params: { page, limit },
  });
};

export const searchUsersApi = async (query: string) => {
  return await api.get<UserInfoI[]>('/users/search', { params: { query } });
};
