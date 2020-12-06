import Vue from 'vue'
import Vuex from 'vuex'
import RECIPES from '@/constants/recipes'
import INGREDIENTS from '@/constants/ingredients'

Vue.use(Vuex)

const state = {
  selectedIngredients: [],
  recipes: {},
  ingredients: {}
}

const SET_RECIPES = 'SET_RECIPES'
const SET_INGREDIENTS = 'SET_INGREDIENTS'
const SET_SELECTED_INGREDIENTS = 'SET_SELECTED_INGREDIENTS'
const mutations = {
  [SET_RECIPES] (state, recipes) {
    state.recipes = recipes
  },
  [SET_INGREDIENTS] (state, ingredients) {
    state.ingredients = ingredients
  },
  [SET_SELECTED_INGREDIENTS] (state, ingredients) {
    state.selectedIngredients = ingredients
  }
}

const actions = {
  fetchRecipes ({ commit }) {
    commit(SET_RECIPES, RECIPES)
  },
  fetchIngredients ({ commit }) {
    commit(SET_INGREDIENTS, INGREDIENTS)
  },
  updateSelectedIngredients ({ commit }, selectedIngredients) {
    commit(SET_SELECTED_INGREDIENTS, selectedIngredients)
  }
}

const getters = {
  recipesList (state) {
    return Object.values(state.recipes)
  },
  ingredientsList (state) {
    return Object.values(state.ingredients)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
