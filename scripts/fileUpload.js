const firebase = require('firebase')
const RECIPES = require('../src/constants/recipes.json')

console.log('RECIPES', RECIPES.length)
firebase.initializeApp({
  // apiKey: API_KEY,
  authDomain: 'weakness-for-food.firebaseapp.com',
  databaseURL: 'https://weakness-for-food-default-rtdb.firebaseio.com',
  projectId: 'weakness-for-food',
  storageBucket: 'weakness-for-food.appspot.com',
  messagingSenderId: '1:809206831977:web:7afb71d5de19e8261e7bf8'
});


const db = firebase.database()


function pushRecipe(recipe) {
  const pushRef = db.ref('recipes/' + recipe.id)
  const formattedRecipe = {
    name: recipe.name,
    url: recipe.url,
    ingredients: recipe.ingredients.reduce((ingredients, ingredient, idx) => {
      ingredients[idx] = ingredient
      return ingredients
    }, {})
  }
  if (recipe.img) {
    formattedRecipe.img = recipe.img
  }
  // return 4
  return new Promise((resolve, reject) => {
    pushRef.set(formattedRecipe).then(err => {
      if (err) {
        console.error('ERROR FROM FB')
        reject(err)
        return
      }
      resolve('OK')
    })
  })
}

const allRecipes = RECIPES.map(recipe => {
  console.log('pushing recipe: ', recipe.name)
  return pushRecipe(recipe).then((res) => {
    console.log(res)
  })
})

Promise.all(allRecipes).finally(() => {
  db.goOffline()
})
