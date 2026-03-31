<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

// instancio el router
const router = useRouter();

// estado reactivo
const email = ref("");
const password = ref("");
const showPassword = ref(false); // booleano para rastrear el estado del ojo

// grisear el boton de ingresar si no estan los campos completos --> variable true si ambos campos con texto
const inputsFilled = computed(() => {
  return email.value.trim().length > 0 && password.value.trim().length > 0;
});

// propiedad que define el tipo de input del campo contraseña (tipo text o tipo password)
const typePasswordField = computed(() => {
  return showPassword.value ? "text" : "password";
});

// modificado para que use router para moverse a otra pantalla
const processLogin = () => {
  if (!inputsFilled.value) return;
  console.log("Ingresando con:", email.value);

  // me muevo a dashboard
  router.push("/dashboard");
};

// acción de tocar el link de olvidé la contraseña
const resetPass = () => {
  router.push("/reset");
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-v-background-gray p-4">
    <form
      @submit.prevent="processLogin"
      class="bg-v-card-white p-12 rounded-lg shadow-lg w-full max-w-md min-h-[550px] flex flex-col justify-between text-v-text-main"
    >
      <div>
        <h2 class="text-3xl font-bold mb-3 text-center">Velocity CRM</h2>
        <p class="text-sm text-v-text-gray text-center">Ingresa tus credenciales para acceder.</p>
      </div>

      <div class="flex flex-col gap-6 my-auto">
        <div>
          <label class="block text-xs font-bold text-v-text-gray mb-2 uppercase tracking-wide">
            Correo electrónico
          </label>
          <input
            v-model="email"
            type="email"
            required
            class="w-full p-4 bg-v-input-bg border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-v-link-blue transition text-v-text-main"
          />
        </div>

        <div>
          <label class="block text-xs font-bold text-v-text-gray mb-2 uppercase tracking-wide">
            Contraseña
          </label>
          <div class="relative">
            <input
              v-model="password"
              :type="typePasswordField"
              required
              class="w-full p-4 bg-v-input-bg border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-v-link-blue transition text-v-text-main pr-12"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute inset-y-0 right-0 pr-4 flex items-center text-v-text-gray hover:text-v-text-main"
            >
              <svg
                v-if="!showPassword"
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <svg
                v-else
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.025 10.025 0 014.132-5.411m0 0L21 21M5 5l14 14m1-4c1.274-4.057-5.064-7-9.542-7a10.025 10.025 0 00-4.132 5.411"
                />
              </svg>
            </button>
          </div>
          <div class="text-right mt-2">
            <a
              @click.prevent="resetPass"
              href="#"
              class="font-semibold text-xs text-v-link-blue hover:underline"
              >¿Olvidaste tu contraseña?
            </a>
          </div>
        </div>
      </div>

      <div>
        <button
          type="submit"
          :disabled="!inputsFilled"
          :class="[
            'w-full p-4 rounded-lg transition font-bold text-white shadow-sm flex items-center justify-center gap-2',
            inputsFilled
              ? 'bg-v-button-dark hover:opacity-90'
              : 'bg-v-button-dark hover:opacity-90 cursor-not-allowed text-gray-500',
          ]"
        >
          Ingresar
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>

        <p class="text-xs text-center text-v-text-gray mt-6">
          ¿No tienes una cuenta?
          <a href="#" class="font-semibold text-v-link-blue hover:underline"
            >Crea una cuenta nueva</a
          >
        </p>
      </div>
    </form>
  </div>
</template>
