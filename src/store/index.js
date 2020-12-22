import Vue from 'vue'
import Vuex from 'vuex'
import FirebaseClient from '@/store/firebaseClient'
import RECIPES from '@/constants/recipes'
import INGREDIENTS from '@/constants/ingredients-auto'
import router from '@/router'
import * as categories from  '@/constants/categories'

Vue.use(Vuex)

const state = {
  selectedIngredients: [],
  filters: {},
  recipes: {},
  ingredients: {}
}

const ADD_RECIPE = 'ADD_RECIPE'
const REMOVE_RECIPE = 'REMOVE_RECIPE'
const SET_RECIPES = 'SET_RECIPES'
const SET_INGREDIENTS = 'SET_INGREDIENTS'
const SET_SELECTED_INGREDIENTS = 'SET_SELECTED_INGREDIENTS'
const UPDATE_FILTER = 'UPDATE_FILTER'
const mutations = {
  [SET_RECIPES] (state, recipes) {
    state.recipes = recipes
  },
  [ADD_RECIPE] (state, recipe) {
    state.recipes.push(recipe)
  },
  [REMOVE_RECIPE] (state, recipeId) {
    state.recipes.splice(state.recipes.findIndex(recipe => recipe.id === recipeId), 1)
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
  }
}

const actions = {
  fetchRecipes ({ commit, state }) {
    const ingredientsSet = new Set()
    const client = new FirebaseClient()
    return client.read('recipes', Object.values(state.filters)).then(recipes => {
      commit(SET_RECIPES, Object.keys(recipes).map(recipeId => {
        const ingredients = Object.values(recipes[recipeId].ingredients)
        ingredients.forEach(ingredientsSet.add, ingredientsSet);
        return {
          ...recipes[recipeId],
          id: recipeId,
          ingredients
        }
      }))
      commit(SET_INGREDIENTS, [...ingredientsSet])
    })
  },
  createRecipe (_, { recipe, id }) {
    const client = new FirebaseClient()
    const formattedRecipe = {
      name: recipe.name,
      url: recipe.url,
      category: recipe.category ? categories[recipe.category] : categories.OTHER,
      ingredients: recipe.ingredients.reduce((ingredients, ingredient, idx) => {
        ingredients[idx] = ingredient
        return ingredients
      }, {})
    }
    if (recipe.img) {
      formattedRecipe.img = recipe.img
    }
    return client.set('recipes/' + id, recipe).then(() => {
      router.push('/')
    })
  },
  deleteRecipe ({ commit }, recipeId) {
    const client = new FirebaseClient()
    return client.delete('recipes/' + recipeId).then(
      commit(REMOVE_RECIPE, recipeId)
    )
  },
  fetchRecipesLegacy ({ commit }) {
    commit(SET_RECIPES, RECIPES)
  },
  fetchIngredients ({ commit }) {
    commit(SET_INGREDIENTS, INGREDIENTS)
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
