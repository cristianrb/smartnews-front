import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueStarRating from "vue-star-rating";
import GAuth from 'vue3-google-oauth2'


const app = createApp(App)

app.component('star-rating', VueStarRating.default)
const gAuthOptions = { clientId: '694520500304-j03tg2eic00a4uuk8lk7c61fdjjhaqmi.apps.googleusercontent.com', scope: 'email', prompt: 'consent', fetch_basic_profile: false }
app.use(GAuth, gAuthOptions)
app.use(router).mount('#app')
