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
    path: '/recipe/:id',
    name: 'RecipeDetailsView',
    component: () => import(/* webpackChunkName: "recipe-details" */ '@/views/RecipeDetailsVue')
  },
  {
    path: '/shopping-cart',
    name: 'ShoppingCartView',
    component: () => import(/* webpackChunkName: "shopping-cart" */ '@/views/ShoppingCartView')
  },
  {
    path: '/categories',
    name: 'CategoriesView',
    component: () => import(/* webpackChunkName: "categories" */ '@/views/CategoriesView')
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
