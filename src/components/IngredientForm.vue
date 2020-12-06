<template>
  <div>
    <v-container>
      <v-row>
        <v-combobox
          v-model="fridge"
          :items="options"
          label="What is in your fridge?"
          clearable
          small-chips
          deletable-chips
          multiple
        ></v-combobox>
      </v-row>
      <v-row>
        <RecipeCard
          v-for="recipe in sortedRecipes"
          :key="recipe.id"
          :name="recipe.name"
          :storedIngredients="recipe.storedIngredients"
          :missingIngredients="recipe.missingIngredients"
        />
      </v-row>
    </v-container>
  </div>
</template>

<script>
import RecipeCard from './RecipeCard.vue'
import recipes from '../constants/recipes'
import ingredients from '../constants/ingredients'

export default {
  name: 'IngredientForm',
  components: {
    RecipeCard
  },
  data: () => ({
    fridge: [],
    options: ingredients
  }),
  computed: {
    sortedRecipes() {
      recipes.forEach((recipe) => {
        const sortedIngredients = recipe.ingredients.reduce((tracker, ingredient) => {
          if (!this.fridge.includes(ingredient)) {
            tracker.missingIngredients.push(ingredient)
          } else {
            tracker.storedIngredients.push(ingredient)
          }
          return tracker
        }, {missingIngredients: [], storedIngredients: []})
        recipe.missingIngredients = sortedIngredients.missingIngredients
        recipe.storedIngredients = sortedIngredients.storedIngredients
      })
      return recipes.sort((recipe1, recipe2) => {
        return recipe1.missingIngredients.length > recipe2.missingIngredients.length 
      })
    }
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
