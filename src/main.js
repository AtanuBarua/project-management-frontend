import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from 'axios'
import ToastPlugin from 'vue-toast-notification'
import { useUserStore } from '@/stores/user.js';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ToastPlugin, {
    position: 'top'
})

const store = new useUserStore();
const token = store.token;

axios.defaults.baseURL = 'http://127.0.0.1:8000';
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

app.mount('#app')
