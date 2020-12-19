import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/recipe-form',
    name: 'RecipeFormView',
    component: () => import(/* webpackChunkName: "recipe-form" */ '@/views/RecipeFormView')
  },
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/HomePage')
  }
]

const router = new VueRouter({
  routes
})

export default router
