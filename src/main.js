import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from 'axios'
import ToastPlugin from 'vue-toast-notification'

axios.defaults.baseURL = 'http://127.0.0.1:8000';
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ToastPlugin, {
    position: 'top'
})

app.mount('#app')
