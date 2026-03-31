<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const backToLogin = () => {
  router.push("/");
};

// FALTA LA LÓGICA AL PULSAR EL BOTON DE REENVIAR MAIL
const resendEmail = () => {};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-v-background-gray p-4">
    <div
      class="bg-v-card-white p-12 rounded-lg shadow-lg w-full max-w-md min-h-100 flex flex-col justify-between text-v-text-main border-t-4 border-v-button-dark"
    >
      <div>
        <h2 class="text-2xl font-bold mb-2 text-center">¡Revisa tu correo!</h2>
        <p class="text-md text-v-text-gray text-center">
          Enviamos un link a tu dirección de correo electrónico. Por favor sigue las instrucciones
          para reestablecer tu contraseña.
        </p>

        <p class="text-sm text-center text-v-text-gray mt-10">
          ¿No recibiste nada?
          <a href="#" class="font-semibold text-v-link-blue hover:underline"
            >Clickea para reenviar</a
          >
        </p>

        <hr class="mx-auto mt-6 mb-4 w-85 h-px bg-v-background-gray border-none" />

        <p class="text-center text-sm mt-6 text-v-link-blue">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 inline-block mr-1 align-middle mb-0.75"
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

          <a @click.prevent="backToLogin" href="#" class="font-semibold hover:underline">
            Volver al Login
          </a>
        </p>
      </div>
    </div>
  </div>
</template>
