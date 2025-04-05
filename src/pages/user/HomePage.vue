<template>
  <q-page>
    <div class="main-container">
      <chat-find-component
        v-bind:class="{ 'is-chat-selected': chatStore.currentChat !== null }"
        :chats="chatStore.chats"
        :change-chat="changeChat"
        :current-chat-selected-id="chatStore.currentChat ? chatStore.currentChat.id : null"
      />
      <chat-component
        v-bind:class="{ 'is-chat-selected': chatStore.currentChat !== null }"
        :reset-chat="resetChat"
        :chat="chatStore.currentChat"
        @sendMessage="handleSendMessage"
      />
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

.main-container .find-container.is-chat-selected {
  display: none;
}

.main-container .chat-container.is-chat-selected {
  display: flex;
}

@media only screen and (min-width: 768px) {
  .main-container .find-container {
    flex: none;
  }

  .main-container .find-container.is-chat-selected {
    display: flex;
  }

  .main-container .chat-container {
    display: flex;
  }

  .main-container .not-selected {
    display: block;
  }
}
</style>

<script setup lang="ts">
import ChatFindComponent from 'components/ChatFindComponent.vue';
import ChatComponent from 'components/ChatComponent.vue';
import type { ChatInfoI, MessageI } from 'src/interfaces/ChatInterface';
import { onMounted } from 'vue';
import { useChatStore } from 'src/stores/chatStore';

const chatStore = useChatStore();

onMounted(async () => {
  await chatStore.getAllUserChats();
});

const changeChat = (chat: ChatInfoI) => (chatStore.currentChatId = chat.id);

const resetChat = () => (chatStore.currentChatId = null);

const handleSendMessage = (newMessage: MessageI) => {
  if (!chatStore.currentChatId) return;
  chatStore.currentChat?.messages.push(newMessage);
};
</script>
