export default class Ingredient {
  constructor (
    {
      name,
      quantity,
      unit
    } = {}
  ) {
    Object.assign(this, {
      name,
      quantity,
      unit
    })
  }
}
