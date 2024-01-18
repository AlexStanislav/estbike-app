import './assets/main.css'
import 'primeicons/primeicons.css'
import 'primevue/resources/themes/lara-light-amber/theme.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config';
import App from './App.vue'
import router from './router'
import ToastService from 'primevue/toastservice';

const app = createApp(App)

app.use(createPinia());
app.use(router);
app.use(PrimeVue);
app.use(ToastService);

app.mount('#app')
