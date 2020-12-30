import Vue from 'vue'
import Vuex from 'vuex'
import FirebaseClient from '@/store/firebaseClient'
import router from '@/router'
import Recipe from '@/store/Recipe'

Vue.use(Vuex)

const state = {
  selectedIngredients: [],
  files: {},
  filters: {},
  recipes: {},
  ingredients: {},
  searchTerm: ''
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
    this.state.searchTerm = searchTerm
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
    const deletePromise = client.delete('recipes/' + recipeId).then(() => {
      commit(REMOVE_RECIPE, recipeId)
      router.push('/')
    })
    return deletePromise
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
    })
  },
  ingredientsList (state) {
    return Object.values(state.ingredients)
  },
  imagesByRecipe: (state) => (recipeId) => {
    return state.files[recipeId] ? state.files[recipeId] : []
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
