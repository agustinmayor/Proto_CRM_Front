<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// para poder pintar los botones de la sidebar segun la pantalla
const currentScreen = computed(() => {
  const path = route.path;

  if (path === "/dashboard" || path === "/") return "inventory";
  if (path === "/dashboard/sales" || path === "/sales") return "sales";
  if (path === "/dashboard/messages" || path === "/messages") return "messages";
  if (path === "/settings") return "settings";

  return path.replace("/", "");
});
</script>

<template>
  <aside class="w-64 h-screen bg-gray-50 border-r border-gray-200 flex flex-col z-20">
    <div class="p-8">
      <h1 class="text-xl font-extrabold text-gray-900 tracking-tight">Velocity CRM</h1>
      <p class="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">
        Inteligencia Automotriz
      </p>
    </div>

    <nav class="flex-1 px-4 space-y-2 mt-2">
      <a
        href="#"
        @click.prevent="router.push('/dashboard')"
        :class="[
          'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all',
          currentScreen === 'inventory'
            ? 'bg-white text-blue-700 shadow-sm' /**Estilo ACTIVO */
            : 'text-gray-500 hover:bg-gray-200 hover:text-gray-900' /**Estilo INACTIVO */,
        ]"
      >
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path
            d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"
          />
          <circle cx="7" cy="17" r="2" />
          <path d="M9 17h6" />
          <circle cx="17" cy="17" r="2" />
        </svg>
        Inventario
      </a>

      <a
        href="#"
        @click.prevent="router.push('/dashboard/sales')"
        :class="[
          'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all',
          currentScreen === 'sales'
            ? 'bg-white text-blue-700 shadow-sm'
            : 'text-gray-500 hover:bg-gray-200 hover:text-gray-900',
        ]"
      >
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Ventas
      </a>

      <a
        href="#"
        @click.prevent="router.push('/dashboard/messages')"
        :class="[
          'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all',
          currentScreen === 'messages'
            ? 'bg-white text-blue-700 shadow-sm'
            : 'text-gray-500 hover:bg-gray-200 hover:text-gray-900',
        ]"
      >
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
        Mensajes
      </a>
    </nav>

    <div class="p-4 border-t border-gray-200">
      <a
        href="#"
        @click.prevent="router.push('/settings')"
        :class="[
          'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all',
          currentScreen === 'settings'
            ? 'bg-white text-blue-700 shadow-sm'
            : 'text-gray-500 hover:bg-gray-200 hover:text-gray-900',
        ]"
      >
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        Configuración
      </a>
    </div>
  </aside>
</template>
