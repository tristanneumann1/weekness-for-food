<template>
  <v-container>
    <v-row no-gutters class="pt-5">
      <h2>What's in your fridge?</h2>
    </v-row>
    <v-row no-gutters>
      <IngredientSearchBar :loading="loadingData" />
    </v-row>
    <v-row no-gutters>
      <h2>You should cook one of these tonight:</h2>
    </v-row>
    <v-row no-gutters>
      <RecipeList
        class="loading-list"
        :loading="loadingData"
      />
    </v-row>
  </v-container>
</template>

<script>
import IngredientSearchBar from '@/components/IngredientSearchBar'
import RecipeList from '@/components/RecipeList'

export default {
  name: 'HomePage',
  props: {
    loadingData: Boolean
  },
  components: {
    IngredientSearchBar,
    RecipeList
  }
}
</script>

<style scoped>
.loading-list {
  width: 100%
}
</style>
