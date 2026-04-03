<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

// se "activa" cuando clickeo algun boton declarado abajo y corre la función router.push que cambia de pantalla
const goBack = () => router.back();
</script>

<template>
  <div class="p-8">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-2xl font-bold text-v-text-main mb-6">Ayuda</h1>

      <div class="bg-white rounded-lg shadow-sm p-6">
        <p class="text-v-text-gray">Pantalla de ayuda en construcción.</p>

        <button
          @click="goBack"
          class="mt-6 px-4 py-2 bg-v-button-dark text-white rounded-lg hover:opacity-90"
        >
          Volver
        </button>
      </div>
    </div>
  </div>
</template>
