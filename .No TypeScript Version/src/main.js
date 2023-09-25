import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import { auth as Auth } from './stores/auth'

import './style.css'

// create app
const app = createApp(App)
app.use(router)
app.provide('auth', Auth)
app.mount('#app')
