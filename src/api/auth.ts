import { api } from 'src/boot/axios';
import type { UserInfoI } from 'src/interfaces/ChatInterface';
import type { GenericResponseI } from 'src/interfaces/GenericInterface';

interface LoginResponseI {
  message: string;
  user: UserInfoI;
  access_token: string;
}

export const loginApi = async (email: string, password: string) => {
  return await api.post<LoginResponseI>('/auth/login', { email, password });
};

export const registerApi = async (username: string, email: string, password: string) => {
  return await api.post<GenericResponseI>('/auth/register', { email, password, username });
};

export const logoutApi = async () => await api.post('/auth/logout');
