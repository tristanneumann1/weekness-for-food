import * as types from '@/store/mutation-types'
import Vue from 'vue'

const mutations = {
  [types.SET_RECIPES] (state, recipes) {
    state.recipes = recipes
  },
  [types.ADD_RECIPE] (state, recipe) {
    state.recipes = {
      ...state.recipes,
      [recipe.id]: recipe
    }
  },
  [types.REMOVE_RECIPE] (state, recipeId) {
    Vue.delete(state.recipes, recipeId)
  },
  [types.SET_INGREDIENTS] (state, ingredients) {
    state.ingredients = ingredients
  },
  [types.UPDATE_FILTER] (state, newFilter) {
    state.filters = {
      ...state.filters,
      ...newFilter
    }
  },
  [types.ADD_FILE] (state, { url, recipeId }) {
    if (!state.files[recipeId]) {
      state.files[recipeId] = []
    }
    state.files = {
      ...state.files,
      [recipeId]: [...state.files[recipeId], url]
    }
  },
  [types.CLEAR_UPLOADED_FILES] (state, recipeId) {
    state.files = {
      ...state.files,
      [recipeId]: []
    }
  },
  [types.UPDATE_SEARCH_TERMS] (state, searchTerm) {
    state.searchTerm = searchTerm
  },
  [types.ADD_TO_SHOPPING_CART] (state, { recipe, servingSize }) {
    state.shoppingCart.push({
      recipe,
      servingSize
    })
  },
  [types.REMOVE_FROM_SHOPPING_CART] (state, { recipeName }) {
    const recipeIndex = state.shoppingCart.findIndex(cartItem => cartItem.recipe.name === recipeName)
    if (recipeIndex === -1) {
      return
    }
    state.shoppingCart.splice(recipeIndex, 1)
  },
  [types.CHANGE_CART_ITEM_SERVING_SIZE] (state, { recipeName, servingSize }) {
    const recipe = state.shoppingCart.find(cartItem => cartItem.recipe.name === recipeName)
    if (!recipe) {
      return
    }
    Vue.set(recipe, 'servingSize', servingSize)
  },
  [types.CLEAR_CART] (state) {
    state.shoppingCart = []
  },
  [types.SET_USER] (state, userInfo) {
    state.user = userInfo
  }
}

export default mutations
