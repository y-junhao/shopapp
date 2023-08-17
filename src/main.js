import './assets/base.css'
import './assets/animate.css'
import './assets/vant.css'
import 'vant/es/toast/style';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import Router from './router/index'
const app = createApp(App)

app.use(createPinia())
app.use(Router)
app.mount('#app')
