import { createApp } from "vue";
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'

import MainPage from './components/MainPage.vue'
import SurveyPage from './components/SurveyPage.vue'

const routes = [
    {
        path: '/survey/:id',
        component: SurveyPage ,
    },
    {
        path: '/',
        component: MainPage ,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

createApp(App).use(router).mount('#app')