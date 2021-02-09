import { shuffle } from '@/utils/helpers'

const getters = {
  recipesList (state) {
    let recipes = Object.values(state.recipes)
    const searchTerm = state.searchTerm.toLowerCase()

    if (searchTerm) {
      recipes = recipes.filter(recipe => {
        return recipe.name.toLowerCase().includes(searchTerm) ||
          recipe.chefsNotes?.toLowerCase().includes(searchTerm) ||
          recipe.ingredientsV2.find((ingredient) => {
            return ingredient.name.toLowerCase().includes(searchTerm)
          })
      })
    }

    return shuffle(recipes)
  },
  imagesByRecipe: (state) => (recipeId) => {
    return state.files[recipeId] ? state.files[recipeId] : []
  },
  recipeById: (state) => (recipeId) => {
    return state.recipes[recipeId] || {}
  },
  recipeInCart: (state) => ({ recipeName, recipeId }) => {
    if (recipeId) {
      return state.shoppingCart.find(cartItem => cartItem.itemId === recipeId)
    }
    return state.shoppingCart.find(cartItem => cartItem.recipe.name === recipeName)
  },
  userLoggedIn: (state) => {
    return !!state.user
  }
}

export default getters
