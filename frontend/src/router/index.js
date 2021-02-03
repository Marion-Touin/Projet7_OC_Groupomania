import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/Home',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path:'/register',
    name:'register',
    component: () => import('../components/register.vue')
  },
  {
    path:'/login',
    name:'login',
    component: () => import('../components/login.vue')
  },
  {
    path:'/accueil',
    name:'accueil',
    component: () => import('../components/accueil.vue')
  }

]

const router = new VueRouter({
  routes
})

export default router
