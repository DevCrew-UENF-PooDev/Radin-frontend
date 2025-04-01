import { Cookies } from 'quasar';
import { api } from 'src/boot/axios';

export const historyApi = async () => {
  const token = Cookies.get('token');
  return await api.get('/history', { headers: { Authorization: `Bearer ${token}` } });
};
