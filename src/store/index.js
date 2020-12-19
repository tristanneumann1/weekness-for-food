import Vue from 'vue'
import Vuex from 'vuex'
import FirebaseClient from '@/store/firebaseClient'
import RECIPES from '@/constants/recipes'
import INGREDIENTS from '@/constants/ingredients-auto'
import router from '@/router'
import { v4 } from 'uuid'

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
    const ingredientsSet = new Set()
    const client = new FirebaseClient()
    return client.read('recipes').then(recipes => {
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
  createRecipe (_, recipe) {
    const client = new FirebaseClient()
    const formattedRecipe = {
      name: recipe.name,
      url: recipe.url,
      ingredients: recipe.ingredients.reduce((ingredients, ingredient, idx) => {
        ingredients[idx] = ingredient
        return ingredients
      }, {})
    }
    if (recipe.img) {
      formattedRecipe.img = recipe.img
    }
    const uuid = v4()
    return client.set('recipes/' + uuid, recipe).then(() => {
      router.push('/')
    })
  },
  fetchRecipesLegacy ({ commit }) {
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
