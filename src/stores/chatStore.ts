import { defineStore, acceptHMRUpdate } from 'pinia';
import { createPrivateChatApi, listChatsApi } from 'src/api/chat';
import type { ChatInfoI } from 'src/interfaces/ChatInterface';
import type { ErrorResponseI } from 'src/interfaces/GenericInterface';
import { showNotify } from 'src/utils/notifier';

interface ChatsState {
  chats: ChatInfoI[];
  currentChatId: string | null;
}

export const useChatStore = defineStore('chats', {
  state: (): ChatsState => ({
    chats: [],
    currentChatId: null,
  }),
  getters: {
    currentChat(): ChatInfoI | null {
      if (this.chats && this.currentChatId)
        return this.chats.find((chat) => chat.id === this.currentChatId) || null;
      return null;
    },
  },
  actions: {
    async getAllUserChats() {
      try {
        const response = await listChatsApi();
        this.chats = response.data.chats;
        const members = this.chats.flatMap((chat) => chat.members);
        for (const member of members) if (member.status === 'Online') member.is_online = true;
      } catch (error) {
        const errorCode = (error as ErrorResponseI).response.data.error;
        showNotify(errorCode, 'negative');
      }
    },
    async createUserPrivateChat(userId: string) {
      try {
        const response = await createPrivateChatApi(userId);
        if (!this.chats.find((chat) => chat.id === response.data.chat.id))
          this.chats.push(response.data.chat);
        this.currentChatId = response.data.chat.id;
        await this.router.push('/user/home');
      } catch (error) {
        const errorCode = (error as ErrorResponseI).response.data.error;
        showNotify(errorCode, 'negative');
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useChatStore, import.meta.hot));
}
