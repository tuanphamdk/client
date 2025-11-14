import { createRouter, createWebHistory } from "vue-router";

import Words from "./views/Words.vue";
import Show from "./views/Show.vue";
import New from "./views/New.vue";
import Edit from "./views/Edit.vue";
import About from "./views/About.vue";
import Login from "./views/Login.vue";


const routes = [
    {
        path: '/',
        redirect: '/words'
    },
    {
        path:'/words',
        name:'Words',
        component : Words
    },
    {
        path:'/words/new',
        name:'New',
        component : New
    },    
    {
        path:'/words/show/:id',
        name:'Show',
        component : Show
    },
    {
        path:'/words/edit/:id',
        name:'Edit',
        component : Edit
    },
    {
        path:'/about',
        name:'About',
        component : About
    },
    {
        path:'/login',
        name:'Login',
        component : Login
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router