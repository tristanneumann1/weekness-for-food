import Ingredient from './Ingredient.js'
import * as categories from '@/constants/categories'

export default class Recipe {
  constructor (
    {
      id,
      name,
      url = '',
      category = categories.MISCELLANEOUS,
      chefsNotes = '',
      recipeImages = [],
      ingredients = [],
      ingredientsV2 = [],
      servingSize = 16
    } = {}
  ) {
    Object.assign(this, {
      id,
      name,
      url,
      category,
      chefsNotes,
      recipeImages,
      ingredients: Object.values(ingredients),
      ingredientsV2: ingredientsV2.map((ingredient) => new Ingredient(ingredient)),
      servingSize
    })
  }
}
