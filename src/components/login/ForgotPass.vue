<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const router = useRouter();

// propiedad para inhabilitar el boton si no pone el email
const emailFilled = computed(() => {
  return email.value.trim().length > 0;
});

// cuando se toca el boton central cambia a pantalla
// que informa que se envió un mail para reestablecer la contraseña
const processForgotPass = () => {
  if (!emailFilled.value) return;

  router.push("/reset/sentEmail");
};

// acción de tocar el link inferior para volver a la pagina de login
const backToLogin = () => {
  router.push("/");
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-v-background-gray p-4">
    <form
      @submit.prevent="processForgotPass"
      class="bg-v-card-white p-12 rounded-lg shadow-lg w-full max-w-md min-h-[400px] flex flex-col justify-between text-v-text-main"
    >
      <div>
        <h2 class="text-2xl font-bold mb-2">¿Olvidaste tu Contraseña?</h2>
        <p class="text-sm text-v-text-gray">No te preocupes, puedes reestablecerla.</p>
      </div>

      <div class="flex flex-col gap-1 my-auto">
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
        <button
          type="submit"
          :disabled="!emailFilled"
          :class="[
            'w-full p-4 rounded-lg transition font-bold text-white shadow-sm flex items-center justify-center gap-2 mb-3',
            emailFilled
              ? 'bg-v-button-dark hover:opacity-90'
              : 'bg-v-button-dark hover:opacity-90 cursor-not-allowed text-gray-500',
          ]"
        >
          Reestablecer Contraseña
        </button>

        <p class="text-center text-xs mt-6 text-v-link-blue">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 inline-block mr-1 align-middle mb-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>

          <a @click.prevent="backToLogin" href="#" class="font-semibold hover:underline"
            >Volver al Login</a
          >
        </p>
      </div>
    </form>
  </div>
</template>
