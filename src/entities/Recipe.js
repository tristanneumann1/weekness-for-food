import Ingredient from './Ingredient.js'
import * as categories from '@/constants/categories'

export default class Recipe {
  constructor (
    {
      id,
      name,
      category = categories.MISCELLANEOUS,
      chefsNotes = '',
      recipeImages = [],
      ingredientsV2 = [],
      servingSize = 0
    } = {}
  ) {
    Object.assign(this, {
      id,
      name,
      category,
      chefsNotes,
      recipeImages,
      ingredientsV2: ingredientsV2.map((ingredient) => new Ingredient(ingredient)),
      servingSize
    })
  }
}
