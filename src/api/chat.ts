import { api } from 'src/boot/axios';
import type { ChatInfoI } from 'src/interfaces/ChatInterface';

export const listChatsApi = async () => {
  return await api.get<{ chats: ChatInfoI[] }>('/chats');
};

export const createPrivateChatApi = async (targetUserId: string) => {
  return await api.post<{ chat: ChatInfoI }>('/chats/private', { targetUserId });
};
