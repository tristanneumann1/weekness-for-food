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
    path: '/recipe-form/:id',
    name: 'RecipeEditView',
    component: () => import(/* webpackChunkName: "recipe-edit" */ '@/views/RecipeEditVue')
  },
  {
    path: '/recipes/:id',
    name: 'RecipeDetailsView',
    component: () => import(/* webpackChunkName: "recipe-details" */ '@/views/RecipeDetailsVue')
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
