import FirebaseClient from '@/store/firebaseClient'
import * as types from '@/store/mutation-types'
import Recipe from '@/entities/Recipe'
import router from '@/router'

const actions = {
  fetchRecipes ({ commit, state }) {
    const client = new FirebaseClient()
    return client.read('recipes', Object.values(state.filters)).then(recipes => {
      if (!recipes) {
        commit(types.SET_RECIPES, [])
        return
      }
      commit(types.SET_RECIPES, Object.keys(recipes).reduce((recipeMap, recipeId) => {
        recipeMap[recipeId] = new Recipe({
          ...recipes[recipeId],
          id: recipeId
        })
        return recipeMap
      }, {}))
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
    }).catch((e) => {
      if (e.code === 'PERMISSION_DENIED') {
        commit(types.SNACK_BAR, { type: 'error', message: 'You do not seem to have the proper permissions', icon: 'mdi-alert' })
        return
      }
      commit(types.SNACK_BAR, { type: 'error', message: 'An error occurred, please try again', icon: 'mdi-alert' })
    })
  },
  deleteRecipe ({ commit }, recipeId) {
    const client = new FirebaseClient()
    return client.delete('recipes/' + recipeId).then(() => {
      commit(types.REMOVE_RECIPE, recipeId)
      router.push('/')
    }).catch((e) => {
      if (e.code === 'PERMISSION_DENIED') {
        commit(types.SNACK_BAR, { type: 'error', message: 'You do not seem to have the proper permissions', icon: 'mdi-alert' })
        return
      }
      commit(types.SNACK_BAR, { type: 'error', message: 'An error occurred, please try again', icon: 'mdi-alert' })
    })
  },
  uploadFile ({ commit }, { file, id: recipeId }) {
    const client = new FirebaseClient()
    return client.uploadFile(file).then(({ url }) =>  {
      commit(types.ADD_FILE, { url, recipeId })
    }).catch((e) => {
      if (e.code === 'PERMISSION_DENIED') {
        commit(types.SNACK_BAR, { type: 'error', message: 'You do not seem to have the proper permissions', icon: 'mdi-alert' })
        return
      }
      commit(types.SNACK_BAR, { type: 'error', message: 'An error occurred, please try again', icon: 'mdi-alert' })
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
  removeFromCart ({ commit }, { recipeId }) {
    commit(types.REMOVE_FROM_SHOPPING_CART, { recipeId })
  },
  updateCartItemServingSize ({ commit }, { recipeId, servingSize }) {
    commit(types.CHANGE_CART_ITEM_SERVING_SIZE, { recipeId, servingSize })
  },
  clearCart ({ commit }) {
    commit(types.CLEAR_CART)
  },
  signIn ({ commit }, userInfo) {
    commit(types.SET_USER, userInfo)
  },
  toggleCartIngredient ({ commit }, { recipeId, ingredientName, toggle }) {
    commit(types.TOGGLE_CART_INGREDIENT, { recipeId, ingredientName, toggle })
  }
}

export default actions
