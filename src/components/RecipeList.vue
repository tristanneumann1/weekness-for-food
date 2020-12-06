<template>
  <div class="d-flex flex-wrap">
    <template v-if="loading">
      <v-skeleton-loader
        v-for="idx in 6"
        :key="idx"
        type="card"
        class="recipe-card-skeleton ma-3"
      />
    </template>
    <RecipeCard
      v-else
      class="recipe-card ma-3"
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
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'RecipeList',
  components: {
    RecipeCard
  },
  props: {
    loading: Boolean
  },
  computed: {
    ...mapState(['selectedIngredients']),
    ...mapGetters({
      recipes: 'recipesList'
    }),
    sortedRecipes () {
      return this.recipes.map(recipe => {
        recipe.storedIngredients = recipe.ingredients.filter(ingredient => {
          return this.selectedIngredients.includes(ingredient)
        })
        recipe.missingIngredients = recipe.ingredients.filter(ingredient => {
          return !this.selectedIngredients.includes(ingredient)
        })
        return recipe
      }).sort((recipe1, recipe2) => {
        return recipe1.missingIngredients.length - recipe2.missingIngredients.length
      })
    }
  }
}
</script>

<style scoped>
.recipe-card {
  flex: 1;
  min-width: 200px;
}
.recipe-card-skeleton {
  width: 30%;
}
</style>
