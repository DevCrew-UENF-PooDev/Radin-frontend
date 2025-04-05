<template>
  <q-page>
    <q-input
      v-model="search"
      outlined
      type="text"
      placeholder="Search users..."
      autocomplete="search"
      bg-color="black"
      label-color="white"
      input-class="custom-input"
    >
      <template v-slot:prepend>
        <q-icon name="search" />
      </template>
    </q-input>
    <div class="users-container">
      <div class="user-container" v-for="user in filteredUsers" :key="user.username">
        <div class="left-container">
          <q-img
            :src="user.artwork || 'https://api.dicebear.com/9.x/initials/svg?seed=' + user.username"
            alt="User Avatar Logo"
          />
          <div class="info">
            <span>{{ user.username }}</span>
            <span>{{ user.status }}</span>
          </div>
        </div>
        <q-btn
          @click="createChat(user.id)"
          push
          icon="mdi-chat-outline"
          label="Chat"
          class="custom-button"
        />
      </div>
    </div>
  </q-page>
</template>

<style scoped lang="scss">
.q-page {
  padding: 2rem;
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

.users-container {
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, minmax(250px, 350px));
  gap: 1rem;
  margin-top: 2rem;
}

.users-container .user-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  background-color: rgb(0 0 0 / 0.4);
  border: 1px solid rgb(6 78 59 / 0.5);
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow:
    0 0 #000,
    0 0 #000,
    0 1px 2px 0 rgb(0 0 0 / 0.05);
}

.users-container .user-container .left-container {
  display: flex;
}

.users-container .user-container .left-container :deep(.q-img) {
  position: relative;
  width: 2.7rem;
  height: 2.7rem;
  border-radius: 9999px;
  margin-right: 0.25rem;
}

.users-container .user-container .left-container :deep(.q-img__container) {
  width: calc(100% - 5px);
  height: calc(100% - 5px);
}

.users-container .user-container .left-container .info {
  display: flex;
  flex-direction: column;
}

.users-container .user-container .left-container .info span:nth-child(1) {
  font-size: 1rem;
  line-height: 1.5rem;
  letter-spacing: -0.025em;
  font-weight: 600;
}

.users-container .user-container .left-container .info span:nth-child(2) {
  font-size: 0.75rem;
  line-height: 1rem;
  color: hsl(215, 20.2%, 65.1%);
}

.users-container .user-container .custom-button {
  font-size: 0.75rem;
  font-weight: 500;
  height: 2.5rem;
  background-color: hsl(160 50% 5%) !important;
  border: 1px solid hsl(155 46% 10%);
}
</style>

<script setup lang="ts">
import { useChatStore } from 'src/stores/chatStore';
import { usePaginationStore } from 'src/stores/paginationStore';
import { computed, onMounted, ref, watch } from 'vue';

const paginationStore = usePaginationStore();
const chatStore = useChatStore();

const search = ref('');

onMounted(async () => {
  if (paginationStore.users.users.length === 0) await paginationStore.getAllUsers();
});

const filteredUsers = computed(() => {
  if (!search.value.trim()) return paginationStore.users.users;
  return paginationStore.users.users.filter((user) =>
    user.username.toLowerCase().includes(search.value.toLowerCase()),
  );
});

watch(
  () => search.value,
  async (newSearch) => {
    const local = paginationStore.users.users.filter((user) =>
      user.username.toLowerCase().includes(newSearch.toLowerCase()),
    );

    if (local.length === 0 && newSearch.trim()) {
      await paginationStore.searchUsers(newSearch);
    }
  },
);

const createChat = async (userId: string) => await chatStore.createUserPrivateChat(userId);
</script>
