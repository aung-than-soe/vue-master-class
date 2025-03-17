import 'iconify-icon'
import './assets/index.css'

import { plugin } from '@formkit/vue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createMetaManager } from 'vue-meta'
import config from '../formkit.config'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(createMetaManager())
app.use(plugin, config)

app.mount('#app')
