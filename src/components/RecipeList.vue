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
      v-for="recipe in recipes"
      v-bind="recipe"
      :key="recipe.id"
    />
  </div>
</template>

<script>
import RecipeCard from '@/components/RecipeCard'
import { mapGetters } from 'vuex'

export default {
  name: 'RecipeList',
  components: {
    RecipeCard
  },
  props: {
    loading: Boolean
  },
  computed: {
    ...mapGetters({
      recipes: 'recipesList'
    })
  }
}
</script>

<style scoped>
.recipe-card {
  flex: 1;
  min-width: 300px;
}
.recipe-card-skeleton {
  width: 30%;
}
</style>
