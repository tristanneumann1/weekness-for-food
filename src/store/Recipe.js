import * as categories from  '@/constants/categories'

export default class Recipe {
  constructor (
    {
      id,
      name,
      url = '',
      category = categories.OTHER,
      chefsNotes = '',
      recipeImages = [],
      ingredients = []
    } = {}
  ) {
    Object.assign(this, {
      id,
      name,
      url,
      category,
      chefsNotes,
      recipeImages,
      ingredients: Object.values(ingredients)
    })
  }
}
