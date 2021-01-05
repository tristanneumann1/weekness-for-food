const localShoppingCart = localStorage.getItem('shoppingCart')

const state = {
  files: {},
  filters: {},
  recipes: {},
  ingredients: {},
  searchTerm: '',
  shoppingCart: localShoppingCart ? JSON.parse(localShoppingCart) : [],
  user: null
}

export default state
