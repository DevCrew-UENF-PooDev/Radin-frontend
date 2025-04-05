<template>
  <div class="find-container">
    <div class="container">
      <q-input
        v-model="search"
        outlined
        type="text"
        placeholder="Search chats..."
        autocomplete="search"
        bg-color="black"
        label-color="white"
        input-class="custom-input"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
    <div class="chats">
      <div
        v-for="(chat, i) in filteredChats"
        v-on:click="changeChat(chat)"
        :key="i"
        class="chat"
        v-bind:class="{ selected: chat.id === currentChatSelectedId }"
      >
        <q-img
          :src="
            chat.artwork ||
            'https://api.dicebear.com/9.x/initials/svg?seed=' + chat.members[0]?.username
          "
          alt="Chat Avatar Logo"
        >
          <span
            class="online-status"
            v-if="chat.members.length === 1"
            v-bind:class="{ 'is-online': chat.members.find((m) => m.status === 'Online') }"
          />
        </q-img>
        <div class="info">
          <div class="first">
            <h3>{{ chat.name || chat.members[0]?.username }}</h3>
            <span>{{ chat.messages[chat.messages.length - 1]?.created_at || 'Nunca' }}</span>
          </div>
          <p class="last-message">
            {{ chat.messages[chat.messages.length - 1]?.text || 'Inicie uma conversa' }}
          </p>
          <p v-if="chat.members.length > 1" class="group-info">
            {{ chat.members.length }} members •
            {{ chat.members.filter((m) => m.status === 'online').length }} online
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.find-container {
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 20rem;
  background-color: rgb(0 0 0 / 0.4);
  border-right: 1px solid rgb(6 78 59 / 0.5);
}

.find-container .container {
  background-color: rgb(0 0 0 / 0.4);
  padding: 1rem;
}

.find-container .chats .chat .info .first {
  display: flex;
  align-items: center;
}

.find-container .chats .chat .info .first span {
  font-size: 0.75rem;
  line-height: 1rem;
  color: rgb(156, 163, 175);
}

.find-container .chats .chat .info .group-info {
  font-size: 0.75rem;
  line-height: 1rem;
  color: rgb(52 211 153) !important;
  margin: 0;
}

.find-container .chats {
  border-top: 1px solid rgb(6 78 59 / 0.5);
}

.main-container .chats .chat {
  display: flex;
  align-items: center;
  padding: 0.8rem;
  cursor: pointer;
  transition: all 1s;
}

.main-container .chats .chat.selected,
.main-container .chats .chat:hover {
  background-color: #000;
}

.main-container .chats .chat.selected {
  background-color: rgb(6 78 59 / 0.3);
  // border-left: 2px solid rgb(16 185 129);
}

.main-container .chats .chat :deep(.q-img) {
  position: relative;
  width: 2.7rem;
  height: 2.7rem;
  border-radius: 9999px;
  margin-right: 0.5rem;
}

.main-container .chats .chat :deep(.q-img__container) {
  width: calc(100% - 5px);
  height: calc(100% - 5px);
}

.main-container .chats .chat :deep(.q-img__content .online-status) {
  position: absolute;
  right: 5px;
  bottom: 5px;
  width: 0.625rem;
  height: 0.625rem;
  background-color: red;
  border: 2px solid #000;
  border-radius: 9999px;
}

.main-container .chats .chat :deep(.q-img__content .online-status.is-online) {
  background-color: rgb(16 185 129);
}

.main-container .chats .chat .info {
  flex: 1 1 0%;
}

.main-container .chats .chat .info .first {
  justify-content: space-between;
  width: 100%;
  color: white;
}

.main-container .chats .chat .info .first h3 {
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
}

.main-container .chats .chat .info .last-message {
  color: rgb(156 163 175);
  font-size: 0.75rem;
  line-height: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
}

:deep(.q-field__control) {
  height: 2.5rem;
  background-color: rgb(0 0 0 / 0.6) !important;
  border: 1px solid rgb(6 78 59 / 0.5);
}

:deep(.q-field__prepend) {
  height: 100%;
  font-size: 20px;
  color: rgba(255, 255, 255, 0.7);
}

:deep(.custom-input) {
  color: white;
}
</style>

<script setup lang="ts">
import type { ChatInfoI } from 'src/interfaces/ChatInterface';
import { computed, ref } from 'vue';

const search = ref('');

const props = defineProps<{
  chats: ChatInfoI[];
  currentChatSelectedId: string | null;
  changeChat: (chat: ChatInfoI) => void;
}>();

const filteredChats = computed(() => {
  return props.chats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(search.value.toLowerCase()) ||
      chat.members.some((member) =>
        member.username.toLowerCase().includes(search.value.toLowerCase()),
      ),
  );
});
</script>
