const fs = require('fs');

function readFiles(dirname, onError) {
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      onError(err);
      return;
    }
    const filePromises = filenames.map(function(filename) {
      return new Promise((resolve) => {
        fs.readFile(dirname + filename, 'utf-8', function(err, content) {
          if (err) {
            onError(err);
            return;
          }
          resolve(JSON.parse(content));
        });
      })
    });
    Promise.all(filePromises).then((recipesDatas) => {
      const ingredients = new Set()
      const recipes = recipesDatas.reduce((recipesAcc, recipesData) => {
        recipesAcc.push(...recipesData)
        return recipesAcc
      }, []).map(recipe => {
        recipe.name = recipe.name.name
        ingredients.add(...recipe.ingredients)
        return recipe
      })
      fs.writeFile('./src/constants/recipes-auto.json', JSON.stringify(recipes), 'utf8', (err) =>  {
        if (err) {
          console.error('error saving recipes', err)
        }
      })
      fs.writeFile('./src/constants/ingredients-auto.json', JSON.stringify([...ingredients]), 'utf8', (err) =>  {
        if (err) {
          console.error('error saving ingredients', err)
        }
      })
    })
  });
}

readFiles('./seededRecipes/', (err) => { throw err })
