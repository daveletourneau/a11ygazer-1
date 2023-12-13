import { createApp } from 'vue'
import { createPinia } from "pinia"

import App from './App.vue'
import router from './router'

import VueCookies from 'vue-cookies'

import 'bootstrap-icons/font/bootstrap-icons.css'
import '@/scss/custom.scss'
import 'bootstrap'

const pinia = createPinia()

createApp(App).use(pinia).use(router).use(VueCookies, {expires: '7d'}).mount('#app')
