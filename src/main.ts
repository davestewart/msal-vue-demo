import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import { auth as Auth } from '@/stores/auth'

// create app
const app = createApp(App)
app.use(router)
app.mount('#app')

// @ts-ignore
window.Auth = Auth
