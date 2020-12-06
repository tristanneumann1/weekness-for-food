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
import { mapGetters } from 'vuex'

export default {
  name: "RecipeList",
  components: {
    RecipeCard
  },
  computed: {
    ...mapGetters({
      recipes: 'recipesList'
    }),
    sortedRecipes () {
      return this.recipes.map(recipe => {
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
