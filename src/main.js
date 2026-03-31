import "./assets/main.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // importo el mapa

const app = createApp(App);

app.use(router); // le enchufo el router a la app
app.mount("#app");
