const prompt = require('prompt-async')
const fs = require('fs');
const RECIPES = require('../src/constants/recipes-auto.json')
const DONE_RECIPES = require('../src/constants/recipes-url.json')

const recipes = []

function addUrl (recipe, url) {
  recipe.url = url
  recipes.push(recipe)
}

function save (recipes) {
  fs.writeFile('./src/constants/recipes-url.json', JSON.stringify(recipes), 'utf8', (err) =>  {
    if (err) {
      console.error('error saving recipes', err)
    }
  })
  fs.writeFile('./src/constants/recipes.json', JSON.stringify(recipes), 'utf8', (err) =>  {
    if (err) {
      console.error('error saving recipes', err)
    }
  })
}

async function promptUrl (recipe) {
  console.clear()
  return await prompt.get([{
    name: 'url',
    description: recipe.name,
    required: false,
    default: ''
  }])
}

async function run () {
  let recipeIndx = 0
  let stop = false
  while (!stop && recipeIndx < RECIPES.length) {
    const recipeId = RECIPES[recipeIndx].id
    console.log('recipeId', recipeId)
    const doneRecipe = DONE_RECIPES.find(recipe => recipe.id === recipeId)
    console.log('doneRecipe', doneRecipe)
    if (doneRecipe && doneRecipe.url) {
      recipes.push(doneRecipe)
      recipeIndx++
      continue
    }

    const { url } = await promptUrl(RECIPES[recipeIndx])

    if (!url) {
      stop = true
      continue
    }

    addUrl(RECIPES[recipeIndx], url)
    recipeIndx++
  }
  save(recipes)
}

run().then(() => console.log('recipes saved with new urls')).catch(() => console.error('error saving recipes'))
