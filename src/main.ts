import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './utils/router/routes'
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css'

const app = createApp(App)
app.use(router)
app.use(ToastPlugin)
app.mount('#app')
