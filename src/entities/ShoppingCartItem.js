class ShoppingCartItem {
  constructor ({ recipe, servingSize }) {
    this.servingSize = servingSize
    this.itemId = recipe.id
    this.recipeName = recipe.name
    this.recipeServingSize = recipe.servingSize
    this.ingredients = recipe.ingredientsV2.map(ingredient => {
      return {
        ...ingredient,
        toggled: false
      }
    })
  }
}

export default ShoppingCartItem
