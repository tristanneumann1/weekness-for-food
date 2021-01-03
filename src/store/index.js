import Vue from 'vue'
import Vuex from 'vuex'
import FirebaseClient from '@/store/firebaseClient'
import router from '@/router'
import Recipe from '@/store/Recipe'

Vue.use(Vuex)

const localShoppingCart = localStorage.getItem('shoppingCart')

const state = {
  selectedIngredients: [],
  files: {},
  filters: {},
  recipes: {},
  ingredients: {},
  searchTerm: '',
  shoppingCart: localShoppingCart ? JSON.parse(localShoppingCart) : [],
  tempFilter: false
}

const ADD_RECIPE = 'ADD_RECIPE'
const REMOVE_RECIPE = 'REMOVE_RECIPE'
const SET_RECIPES = 'SET_RECIPES'
const SET_INGREDIENTS = 'SET_INGREDIENTS'
const SET_SELECTED_INGREDIENTS = 'SET_SELECTED_INGREDIENTS'
const UPDATE_FILTER = 'UPDATE_FILTER'
const ADD_FILE = 'ADD_FILE'
const CLEAR_UPLOADED_FILES = 'CLEAR_UPLOADED_FILES'
const UPDATE_SEARCH_TERMS = 'UPDATE_SEARCH_TERMS'
const ADD_TO_SHOPPING_CART = 'ADD_TO_SHOPPING_CART'
const CHANGE_CART_ITEM_SERVING_SIZE = 'CHANGE_CART_ITEM_SERVING_SIZE'
const REMOVE_FROM_SHOPPING_CART = 'REMOVE_FROM_SHOPPING_CART'
const CLEAR_CART = 'CLEAR_CART'

const mutations = {
  [SET_RECIPES] (state, recipes) {
    state.recipes = recipes
  },
  [ADD_RECIPE] (state, recipe) {
    state.recipes = {
      ...state.recipes,
      [recipe.id]: recipe
    }
  },
  [REMOVE_RECIPE] (state, recipeId) {
    Vue.delete(state.recipes, recipeId)
  },
  [SET_INGREDIENTS] (state, ingredients) {
    state.ingredients = ingredients
  },
  [SET_SELECTED_INGREDIENTS] (state, ingredients) {
    state.selectedIngredients = ingredients
  },
  [UPDATE_FILTER] (state, newFilter) {
    state.filters = {
      ...state.filters,
      ...newFilter
    }
  },
  [ADD_FILE] (state, { url, recipeId }) {
    if (!state.files[recipeId]) {
      state.files[recipeId] = []
    }
    state.files = {
      ...state.files,
      [recipeId]: [...state.files[recipeId], url]
    }
  },
  [CLEAR_UPLOADED_FILES] (state, recipeId) {
    state.files = {
      ...state.files,
      [recipeId]: []
    }
  },
  [UPDATE_SEARCH_TERMS] (state, searchTerm) {
    state.searchTerm = searchTerm
  },
  [ADD_TO_SHOPPING_CART] (state, { recipe, servingSize }) {
    state.shoppingCart.push({
      recipe,
      servingSize
    })
  },
  [REMOVE_FROM_SHOPPING_CART] (state, { recipeName }) {
    const recipeIndex = state.shoppingCart.findIndex(cartItem => cartItem.recipe.name === recipeName)
    if (recipeIndex === -1) {
      return
    }
    state.shoppingCart.splice(recipeIndex, 1)
  },
  [CHANGE_CART_ITEM_SERVING_SIZE] (state, { recipeName, servingSize }) {
    const recipe = state.shoppingCart.find(cartItem => cartItem.recipe.name === recipeName)
    if (!recipe) {
      return
    }
    Vue.set(recipe, 'servingSize', servingSize)
  },
  [CLEAR_CART] (state) {
    state.shoppingCart = []
  },
  TEMP_FILTER (state, toggle) {
    state.tempFilter = toggle
  }
}

const actions = {
  fetchRecipes ({ commit, state }) {
    const ingredientsSet = new Set()
    const client = new FirebaseClient()
    return client.read('recipes', Object.values(state.filters)).then(recipes => {
      commit(SET_RECIPES, Object.keys(recipes).reduce((recipeMap, recipeId) => {
        recipeMap[recipeId] = new Recipe({
          ...recipes[recipeId],
          id: recipeId
        })
        recipeMap[recipeId].ingredients.forEach(ingredientsSet.add, ingredientsSet);
        return recipeMap
      }, {}))
      commit(SET_INGREDIENTS, [...ingredientsSet])
    })
  },
  createRecipe ({ commit }, { recipe, id }) {
    const client = new FirebaseClient()
    const formattedRecipe = new Recipe({
      id,
      ...recipe
    })
    return client.set('recipes/' + id, formattedRecipe).then(() => {
      commit(ADD_RECIPE, formattedRecipe)
      router.push('/')
    })
  },
  deleteRecipe ({ commit }, recipeId) {
    const client = new FirebaseClient()
    return client.delete('recipes/' + recipeId).then(() => {
      commit(REMOVE_RECIPE, recipeId)
      router.push('/')
    })
  },
  uploadFile ({ commit }, { file, id: recipeId }) {
    const client = new FirebaseClient()
    return client.uploadFile(file).then(({ url }) =>  {
      commit(ADD_FILE, { url, recipeId })
    })
  },
  updateSelectedIngredients ({ commit }, selectedIngredients) {
    commit(SET_SELECTED_INGREDIENTS, selectedIngredients)
  },
  categoryFilter ({ commit, dispatch }, category) {
    commit(UPDATE_FILTER, {
      category: {
        key: 'category',
        value: category
      }
    })
    dispatch('fetchRecipes')
  },
  clearUploadedFiles ({ commit }, recipeId) {
    commit(CLEAR_UPLOADED_FILES, recipeId)
  },
  updateSearchTerm ({ commit }, searchTerm) {
    commit(UPDATE_SEARCH_TERMS, searchTerm)
  },
  addToShoppingCart ({ commit }, { recipe, servingSize }) {
    commit(ADD_TO_SHOPPING_CART, { recipe, servingSize })
  },
  addToShoppingCartById ({ commit, getters }, recipeId) {
    const recipe = getters.recipeById(recipeId)
    commit(ADD_TO_SHOPPING_CART, { recipe, servingSize: recipe.servingSize })
  },
  removeFromCart ({ commit }, { recipeName }) {
    commit(REMOVE_FROM_SHOPPING_CART, { recipeName })
  },
  updateCartItemServingSize ({ commit }, { recipeName, servingSize }) {
    commit(CHANGE_CART_ITEM_SERVING_SIZE, { recipeName, servingSize })
  },
  clearCart ({ commit }) {
    commit(CLEAR_CART)
  }
}

const getters = {
  recipesList (state) {
    let recipes = Object.values(state.recipes)
    const selectedIngredients = state.selectedIngredients
    const searchTerm = state.searchTerm.toLowerCase()

    if (searchTerm) {
      recipes = recipes.filter(recipe => {
        return recipe.name.toLowerCase().includes(searchTerm) ||
        recipe.chefsNotes?.toLowerCase().includes(searchTerm)
      })
    }

    return recipes.map(recipe => {
      recipe.storedIngredients = recipe.ingredients.filter(ingredient => {
        return selectedIngredients.includes(ingredient)
      })
      recipe.missingIngredients = recipe.ingredients.filter(ingredient => {
        return !selectedIngredients.includes(ingredient)
      })
      return recipe
    }).sort((recipe1, recipe2) => {
      return recipe2.storedIngredients.length - recipe1.storedIngredients.length ||
        recipe1.missingIngredients.length - recipe2.missingIngredients.length
    }).filter(recipe => {
      if (!state.tempFilter) {
        return true
      }
      return recipe.servingSize === 16
    })
  },
  ingredientsList (state) {
    return Object.values(state.ingredients)
  },
  imagesByRecipe: (state) => (recipeId) => {
    return state.files[recipeId] ? state.files[recipeId] : []
  },
  recipeById: (state) => (recipeId) => {
    return state.recipes[recipeId] || {}
  },
  recipeInCart: (state) => (recipeName) => {
    return state.shoppingCart.find(cartItem => cartItem.recipe.name === recipeName)
  }
}

const store =  new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

store.subscribe((mutation, state) => {
  if ([ADD_TO_SHOPPING_CART, CHANGE_CART_ITEM_SERVING_SIZE, REMOVE_FROM_SHOPPING_CART, CLEAR_CART].includes(mutation.type)) {
    localStorage.setItem('shoppingCart', JSON.stringify(state.shoppingCart))
  }
})

export default store
