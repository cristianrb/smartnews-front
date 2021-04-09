import { createWebHistory, createRouter } from "vue-router";
import LatestNews from './components/LatestNews'
import NewsDetail from './components/NewsDetail'

const routes = [
    {path: '/', component: LatestNews},
    {path: '/home', component: LatestNews},
    {path: '/rated', component: LatestNews},
    {path: '/recommendations', component: LatestNews},
    {path: '/contribution/:id', name: 'contribution', component: NewsDetail}
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router