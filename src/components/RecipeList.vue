<template>
  <div class="d-flex">
    <RecipeCard
        v-for="recipe in sortedRecipes"
        :key="recipe.id"
        :name="recipe.name"
        :storedIngredients="recipe.storedIngredients"
        :missingIngredients="recipe.missingIngredients"
    />
  </div>
</template>

<script>
import RecipeCard from '@/components/RecipeCard'
import RECIPES from '@/constants/recipes'

export default {
  name: "RecipeList",
  components: {
    RecipeCard
  },
  computed: {
    sortedRecipes () {
      return RECIPES.map(recipe => {
        recipe.storedIngredients = []
        recipe.missingIngredients = []
        return recipe
      })
    }
  }
}
</script>

<style scoped>

</style>
