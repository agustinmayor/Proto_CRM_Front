<script setup>
import Sidebar from "./Sidebar.vue";
import Topbar from "./TopBar.vue";
</script>

<template>
  <div class="flex h-screen bg-v-background-gray overflow-hidden">
    <Topbar />
    <Sidebar />

    <main class="flex-1 overflow-y-auto pt-16">
      <router-view></router-view>
    </main>
  </div>
</template>
