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

    return recipes.sort((recipe1, recipe2) => {
      return recipe1.name > recipe2.name ? 1 : -1
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

export default getters
