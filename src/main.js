import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueStarRating from "vue-star-rating";


const app = createApp(App)

app.component('star-rating', VueStarRating.default)
app.use(router).mount('#app')
