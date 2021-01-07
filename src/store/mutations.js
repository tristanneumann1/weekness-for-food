import * as types from '@/store/mutation-types'
import Vue from 'vue'
import ShoppingCartItem from '@/entities/ShoppingCartItem'

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
    state.shoppingCart.push(new ShoppingCartItem({
      recipe,
      servingSize
    }))
  },
  [types.REMOVE_FROM_SHOPPING_CART] (state, { recipeId }) {
    const recipeIndex = state.shoppingCart.findIndex(cartItem => cartItem.itemId === recipeId)
    if (recipeIndex === -1) {
      return
    }
    state.shoppingCart.splice(recipeIndex, 1)
  },
  [types.CHANGE_CART_ITEM_SERVING_SIZE] (state, { recipeId, servingSize }) {
    const recipe = state.shoppingCart.find(cartItem => cartItem.itemId === recipeId)
    if (!recipe) {
      return
    }
    Vue.set(recipe, 'servingSize', servingSize)
  },
  [types.TOGGLE_CART_INGREDIENT] (state, { recipeId, ingredientName, toggle }) {
    const shoppingCartItem = state.shoppingCart.find(cartItem => cartItem.itemId === recipeId)
    if (!shoppingCartItem) {
      return
    }
    const ingredient = shoppingCartItem.ingredients.find(ingredient => ingredient.name === ingredientName)
    if (!ingredient) {
      return
    }
    Vue.set(ingredient, 'toggled', toggle)
  },
  [types.CLEAR_CART] (state) {
    state.shoppingCart = []
  },
  [types.SET_USER] (state, userInfo) {
    state.user = userInfo
  },
  [types.SNACK_BAR] (state, { type = 'primary', delay = 5000, message, icon }) {
    state.snackBar = { type, message, icon }
    setTimeout(() => {
      state.snackBar = null
    }, delay)
  }
}

export default mutations
