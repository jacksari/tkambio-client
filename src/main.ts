import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/styles/main.scss'

import App from './App.vue'
import router from './router'

//calendar
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';


const app = createApp(App)

// icons
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { HiSolidDownload, HiLogout, HiRefresh, BiPlusCircle } from "oh-vue-icons/icons";

addIcons(HiSolidDownload, HiLogout, HiRefresh, BiPlusCircle);

app.component("v-icon", OhVueIcon);

app.use(createPinia())
app.use(router)

app.use(VCalendar, {})

app.mount('#app')
