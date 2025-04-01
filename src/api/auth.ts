import { api } from 'src/boot/axios';

interface UserData {
  email: string;
  name: string;
}

interface ResponseLoginData {
  message: string;
  user: UserData;
  access_token: string;
}

interface ResponseRegisterData {
  message: string;
}

export const loginApi = async (email: string, password: string) => {
  return await api.post<ResponseLoginData>('/signin', { email, password });
};

export const registerApi = async (name: string, email: string, password: string) => {
  return await api.post<ResponseRegisterData>('/signup', { email, password, name });
};

export const logoutApi = async () => {
  return await api.post('/logout');
};
