<template>
  <q-layout view="lHh LpR lFf">
    <q-header v-if="showMenu()" elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>{{ pathName }}</q-toolbar-title>
        <q-img
          class="user-profile-menu"
          fit="contain"
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sora"
          alt="User Avatar"
          @click="openProfileMenu"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" v-if="showMenu()" side="left" show-if-above elevated>
      <div class="drawer-header">
        <q-btn
          flat
          dense
          round
          icon="close"
          aria-label="Close"
          @click="closeLeftDrawer"
          color="white"
        />
        <q-img width="30px" fit="contain" src="~/assets/radinTipo.png" alt="Plataform Name Logo" />
      </div>
      <div class="content">
        <span class="menu-text">MAIN MENU</span>
        <div class="navigation-buttons">
          <q-btn
            label="Home"
            flat
            icon="mdi-home"
            aria-label="Home"
            color="white"
            no-caps
            to="/user/home"
            v-bind:class="{ active: '/user/home' === currentPath }"
          />
          <q-btn
            label="Friends"
            flat
            icon="mdi-account-multiple"
            aria-label="Friends"
            color="white"
            no-caps
            to="/user/friends"
            v-bind:class="{ active: '/user/friends' === currentPath }"
          />
          <q-btn
            label="Groups"
            flat
            icon="mdi-account-group"
            aria-label="Groups"
            color="white"
            no-caps
            to="/user/groups"
            v-bind:class="{ active: '/user/groups' === currentPath }"
          />
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped lang="scss">
header {
  background-color: rgb(0 0 0 / 0.4);
  border-bottom: 1px solid rgb(6 78 59 / 0.5);
}

header .q-toolbar__title {
  font-weight: 600;
  font-size: 1.125rem;
  line-height: 1.75rem;
}

:deep(.q-drawer) {
  background-color: rgb(0 0 0 / 0.8);
  border-right: 1px solid rgb(6 78 59 / 0.5);
  backdrop-filter: blur(4px);
}

.q-btn[aria-label='Menu'],
.q-btn[aria-label='Close'] {
  display: block;
}

.drawer-header {
  display: flex;
  align-items: center;
  height: 51px;
  gap: 1em;
  padding: 1em;
  color: white;
  background-color: #000000;
  border-bottom: 1px solid rgb(6 78 59 / 0.5);
}

.content {
  padding: 0.75rem;
}

.content .menu-text {
  color: rgb(107 114 128);
  text-transform: uppercase;
  font-weight: 600;
  font-size: 0.75rem;
  line-height: 1rem;
}

.content .navigation-buttons {
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-top: 0.5rem;
  gap: 0.5rem;
}

.content .navigation-buttons a {
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-weight: 500;
}

.content .navigation-buttons a:hover,
.content .navigation-buttons a.active {
  background-color: rgba(255, 0, 0, 0.2);
}

.content .navigation-buttons :deep(.q-icon) {
  font-size: 1.5em;
  color: #ab9292;
}

.content .navigation-buttons a :deep(.q-btn__content) {
  justify-content: start;
  font-weight: 300;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.user-profile-menu {
  width: 30px;
  cursor: pointer;
  border-radius: 9999px;
}

@media only screen and (min-width: 1024px) {
  .q-btn[aria-label='Menu'],
  .q-btn[aria-label='Close'] {
    display: none;
  }
}
</style>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();

const currentPath = computed(() => route.path);

const pathName = computed(() =>
  currentPath.value === '/user/home'
    ? 'Home'
    : currentPath.value === '/user/friends'
      ? 'Users'
      : 'Groups',
);

const showMenu = () => route.meta.showHeader;

const leftDrawerOpen = ref(false);

const openProfileMenu = () => {};

const toggleLeftDrawer = () => (leftDrawerOpen.value = !leftDrawerOpen.value);
const closeLeftDrawer = () => (leftDrawerOpen.value = false);
</script>
