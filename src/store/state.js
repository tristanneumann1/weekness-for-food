const localShoppingCart = localStorage.getItem('shoppingCart')

const state = {
  files: {},
  filters: {},
  recipes: {},
  searchTerm: '',
  shoppingCart: localShoppingCart ? JSON.parse(localShoppingCart) : [],
  user: null,
  snackBar: null
}

export default state
