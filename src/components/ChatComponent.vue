<template>
  <div v-if="chat" class="chat-container">
    <div class="container">
      <div class="header-content">
        <q-img :src="chat.artwork" alt="Chat Avatar Logo" />
        <div class="info">
          <h3>{{ chat.name }}</h3>
          <p v-if="chat.members.length > 1">
            {{ chat.members.filter((m) => m.isOnline).length }} online •
            {{ chat.members.length }} members
          </p>
          <p v-else>
            {{ chat.members.filter((m) => m.isOnline).length ? 'Online' : 'Offline' }}
          </p>
        </div>
      </div>
      <q-btn class="menu" color="white" flat icon="mdi-dots-vertical" />
    </div>
    <div class="messages-container">
      <div
        v-for="msg in chat.messages"
        :key="msg.id"
        class="msg-container"
        v-bind:class="{ 'current-user-msg': msg.senderId === currentUserId }"
      >
        <q-img
          v-if="msg.senderId !== currentUserId"
          :src="chat.members.find((member) => member.id === msg.senderId)?.artwork"
          alt="Chat Avatar Logo"
        />
        <div class="msg-info-container">
          <h3 v-if="chat.members.length > 1" class="msg-sender">
            {{ chat.members.find((member) => member.id === msg.senderId)?.name }}
          </h3>
          <p class="msg-text">{{ msg.text }}</p>
          <span class="msg-time">{{ msg.timestamp }}</span>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="not-selected">
    <q-img class="background-img" fit="contain" src="~/assets/radin.png" alt="Plataform Mascot" />
  </div>
</template>

<style scoped lang="scss">
.chat-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  color: white;
}

.chat-container .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9rem;
  border-bottom: 1px solid rgb(6 78 59 / 0.5);
}

.chat-container .messages-container {
  flex: 1;
  width: 100%;
  padding: 0.25rem 0.75rem;
  overflow: hidden scroll;
  -webkit-overflow-scrolling: touch;
}

.chat-container .messages-container::-webkit-scrollbar {
  width: 9px;
}

/* Handle */
.chat-container .messages-container::-webkit-scrollbar-thumb {
  background-color: rgb(6 78 59 / 0.5);
  border-radius: 20px;
  background-clip: content-box;
  border: 1px solid transparent;
}

.chat-container .messages-container > .msg-container {
  padding: 0.5rem 0;
}

.chat-container .messages-container .msg-container {
  display: flex;
}

.chat-container .messages-container .msg-container.current-user-msg {
  justify-content: flex-end;
}

.chat-container .messages-container .msg-container .q-img {
  width: 28px;
  height: 28px;
  margin-right: 0.5rem;
}

.chat-container .messages-container .msg-container .msg-info-container {
  max-width: 75%;
  padding: 0.5rem;
  background-color: rgb(0 0 0 / 0.4);
  border: 1px solid rgb(6 78 59 / 0.5);
  border-radius: 0.5rem;
  border-top-left-radius: 0px;
}

.chat-container .messages-container .msg-container.current-user-msg .msg-info-container {
  background-color: rgb(5 150 105);
  border-radius: 0.5rem;
  border-top-right-radius: 0px;
}

.chat-container .messages-container .msg-container .msg-info-container .msg-sender {
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1rem;
  margin: 0;
  color: rgb(52 211 153);
  margin-bottom: 0.25rem;
}

.chat-container .messages-container .msg-container .msg-info-container .msg-text {
  font-size: 0.875rem;
  line-height: 1.25rem;
  margin: 0;
}

.chat-container .messages-container .msg-container .msg-info-container .msg-time {
  font-size: 0.75rem;
  line-height: 1rem;
  color: rgb(156, 163, 175);
  margin-top: 0.25rem;
}

.chat-container .container .menu {
  width: 30px;
  font-size: 0.8rem;
}

.chat-container .container .header-content {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.chat-container .container .header-content :deep(.q-img) {
  position: relative;
  width: 2.7rem;
  height: 2.7rem;
  border-radius: 9999px;
  margin-right: 0.5rem;
}

.chat-container .container .header-content .info {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chat-container .container .header-content .info h3 {
  font-size: 0.875rem;
  line-height: 1.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
  margin: 0;
}

.chat-container .container .header-content .info p {
  font-size: 0.75rem;
  line-height: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgb(52 211 153);
  margin: 0;
}

.not-selected {
  flex: 1;
  width: 100%;
}
.not-selected .background-img {
  height: 100%;
  opacity: 0.1;
}
</style>

<script setup lang="ts">
import type { ChatInfoI } from 'src/interfaces/ChatInterface';

defineProps<{ chat: ChatInfoI | null }>();

const currentUserId = 'u1'; // I need to change when I connect with the backend
</script>
