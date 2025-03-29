<template>
  <q-page>
    <div class="main-container">
      <chat-find-component
        :chats="chats"
        :change-chat="changeChat"
        :current-chat-selected-id="currentChatSelected ? currentChatSelected.id : null"
      />
      <chat-component :chat="currentChatSelected" @sendMessage="handleSendMessage" />
    </div>
  </q-page>
</template>

<style scoped lang="scss">
.q-page {
  padding: 1rem;
}
.main-container {
  display: flex;
  height: 87vh;
  border: 1px solid rgb(6 78 59 / 0.5);
  border-radius: 10px;
}
</style>

<script setup lang="ts">
import ChatFindComponent from 'components/ChatFindComponent.vue';
import ChatComponent from 'components/ChatComponent.vue';
import type { ChatInfoI, MessageI, UserInfoI } from 'src/interfaces/ChatInterface';
import { ref } from 'vue';

const user1: UserInfoI = {
  id: 'u1',
  artwork: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sora',
  name: 'Sora',
  isOnline: true,
};

const user2: UserInfoI = {
  id: 'u2',
  artwork: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  name: 'Alex',
  isOnline: false,
};

const user3: UserInfoI = {
  id: 'u3',
  artwork: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie',
  name: 'Jamie',
  isOnline: true,
};

const user4: UserInfoI = {
  id: 'u4',
  artwork: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Morgan',
  name: 'Morgan',
  isOnline: false,
};

const user5: UserInfoI = {
  id: 'u5',
  artwork: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor',
  name: 'Taylor',
  isOnline: true,
};

const chat1: ChatInfoI = {
  id: '1',
  artwork: 'https://api.dicebear.com/7.x/identicon/svg?seed=GamingSquad',
  name: 'Gaming Squad',
  messages: [
    {
      id: 'm1',
      text: "Hey team, who's up for a match tonight?",
      timestamp: '18:00',
      senderId: user2.id,
      tick: 'none',
    },
    { id: 'm2', text: "I'm in!", timestamp: '18:05', senderId: user3.id, tick: 'none' },
    { id: 'm3', text: 'Count me in too.', timestamp: '18:10', senderId: user4.id, tick: 'none' },
  ],
  members: [user2, user3, user4],
};

const chat2: ChatInfoI = {
  id: '2',
  artwork: 'https://api.dicebear.com/7.x/identicon/svg?seed=ProjectAlpha',
  name: 'Project Alpha',
  messages: [
    {
      id: 'm4',
      text: "Let's finalize the UI design by tomorrow.",
      timestamp: '15:30',
      senderId: user3.id,
      tick: 'none',
    },
    {
      id: 'm5',
      text: "I'll update the specs now.",
      timestamp: '15:35',
      senderId: user5.id,
      tick: 'none',
    },
  ],
  members: [user3, user5],
};

const chat3: ChatInfoI = {
  id: '3',
  artwork: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  name: 'Alex',
  messages: [
    {
      id: 'm6',
      text: 'Hey Alex, how are you?',
      timestamp: 'Yesterday 20:00',
      senderId: user1.id,
      tick: 'read',
    },
    {
      id: 'm7',
      text: "I'm doing fine, Sora. What about you?",
      timestamp: 'Yesterday 20:05',
      senderId: user2.id,
      tick: 'none',
    },
    {
      id: 'm8',
      text: 'What?',
      timestamp: 'Today 00:00',
      senderId: user1.id,
      tick: 'delivered',
    },
    {
      id: 'm8',
      text: 'Read my message!',
      timestamp: 'Today 12:00',
      senderId: user1.id,
      tick: 'sent',
    },
  ],
  members: [user2],
};

const chats = ref([chat1, chat2, chat3]);

const currentChatSelected = ref<ChatInfoI | null>(null);

const changeChat = (chat: ChatInfoI) => {
  currentChatSelected.value = chat;
};

const handleSendMessage = (newMessage: MessageI) => {
  console.log('dfww');
  if (!currentChatSelected.value) return;

  // Find the chat and update messages
  const chatIndex = chats.value.findIndex((chat) => chat.id === currentChatSelected.value?.id);
  if (chatIndex !== -1) chats.value[chatIndex]?.messages.push(newMessage);
};
</script>
