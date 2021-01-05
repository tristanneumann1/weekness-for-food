import FirebaseClient from '@/store/firebaseClient'
import * as types from '@/store/mutation-types'
import Recipe from '@/entities/Recipe'
import router from '@/router'

const actions = {
  fetchRecipes ({ commit, state }) {
    const ingredientsSet = new Set()
    const client = new FirebaseClient()
    return client.read('recipes', Object.values(state.filters)).then(recipes => {
      if (!recipes) {
        commit(types.SET_RECIPES, [])
        commit(types.SET_INGREDIENTS, [])
        return
      }
      commit(types.SET_RECIPES, Object.keys(recipes).reduce((recipeMap, recipeId) => {
        recipeMap[recipeId] = new Recipe({
          ...recipes[recipeId],
          id: recipeId
        })
        recipeMap[recipeId].ingredients.forEach(ingredientsSet.add, ingredientsSet);
        return recipeMap
      }, {}))
      commit(types.SET_INGREDIENTS, [...ingredientsSet])
    })
  },
  createRecipe ({ commit }, { recipe, id }) {
    const client = new FirebaseClient()
    const formattedRecipe = new Recipe({
      id,
      ...recipe
    })
    return client.set('recipes/' + id, formattedRecipe).then(() => {
      commit(types.ADD_RECIPE, formattedRecipe)
      router.push('/')
    })
  },
  deleteRecipe ({ commit }, recipeId) {
    const client = new FirebaseClient()
    return client.delete('recipes/' + recipeId).then(() => {
      commit(types.REMOVE_RECIPE, recipeId)
      router.push('/')
    })
  },
  uploadFile ({ commit }, { file, id: recipeId }) {
    const client = new FirebaseClient()
    return client.uploadFile(file).then(({ url }) =>  {
      commit(types.ADD_FILE, { url, recipeId })
    })
  },
  categoryFilter ({ commit, dispatch }, category) {
    commit(types.UPDATE_FILTER, {
      category: {
        key: 'category',
        value: category
      }
    })
    return dispatch('fetchRecipes')
  },
  clearUploadedFiles ({ commit }, recipeId) {
    commit(types.CLEAR_UPLOADED_FILES, recipeId)
  },
  updateSearchTerm ({ commit }, searchTerm) {
    commit(types.UPDATE_SEARCH_TERMS, searchTerm.trim())
  },
  addToShoppingCart ({ commit }, { recipe, servingSize }) {
    commit(types.ADD_TO_SHOPPING_CART, { recipe, servingSize })
  },
  addToShoppingCartById ({ commit, getters }, recipeId) {
    const recipe = getters.recipeById(recipeId)
    commit(types.ADD_TO_SHOPPING_CART, { recipe, servingSize: recipe.servingSize })
  },
  removeFromCart ({ commit }, { recipeName }) {
    commit(types.REMOVE_FROM_SHOPPING_CART, { recipeName })
  },
  updateCartItemServingSize ({ commit }, { recipeName, servingSize }) {
    commit(types.CHANGE_CART_ITEM_SERVING_SIZE, { recipeName, servingSize })
  },
  clearCart ({ commit }) {
    commit(types.CLEAR_CART)
  }
}

export default actions
