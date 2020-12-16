const prompt = require('prompt-async')
const { v4 } = require('uuid')
const fs = require('fs')

async function run () {
  const recipes = []
  try {
    let another = 'y'

    while (another === 'y') {
      recipes.push(await getRecipe())
      const result = await prompt.get(['another'])
      another = result.another
    }

    fs.writeFile('./seededRecipes/' + new Date() + '.json', JSON.stringify(recipes), 'utf8', (err) => {
      if (err) throw err
      else console.log('file has been saved')
    })

  } catch (err) {
    console.error('an error accured')
  }
}




async function getRecipe () {
  try {
    let { ingredient } = await prompt.get(['ingredient'])
    const ingredients = []
    while (ingredient !== 'n') {
      ingredients.push(ingredient)
      const result = await prompt.get(['ingredient'])
      ingredient = result.ingredient
    }
    return {
      id: v4(),
      name: await prompt.get(['name']),
      ingredients
    }
  } catch (e) {
    console.error('error getting recipe')
  }
}

run()
