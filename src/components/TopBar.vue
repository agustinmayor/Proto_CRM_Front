<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goToSettings = () => router.push("/settings");
const goToHelp = () => router.push("/help");
</script>

<template>
  <div
    class="fixed top-0 right-0 left-0 h-16 bg-white border-b border-gray-200 z-0 flex items-center justify-end pr-6 gap-4"
  >
    <button
      @click="goToHelp"
      class="w-10 h-10 rounded-full flex items-center justify-center text-v-text-gray hover:bg-gray-100 transition"
    >
      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </button>

    <!-- Foto de Perfil hardcodeada por ahora -->
    <button
      @click="goToSettings"
      class="w-10 h-10 rounded-full bg-gray-200 overflow-hidden hover:opacity-80 transition"
    >
      <img
        src="https://api.dicebear.com/7.x/avataaars/svg?seed=JuanPerez"
        alt="Perfil"
        class="w-full h-full object-cover rounded-full"
      />
    </button>
  </div>
</template>
