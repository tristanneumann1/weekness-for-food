<template>
  <v-container>
    <v-row no-gutters class="pt-5">
      <h2>What's in your fridge?</h2>
    </v-row>
    <v-row no-gutters>
      <v-col class="col-12 col-md-9">
        <IngredientSearchBar :loading="loadingData" />
      </v-col>
      <v-col class="col-12 col-md-3">
        <v-select
          outlined
          clearable
          label="Filter by category"
          class="ml-md-4"
          :items="categoryItems"
        />
      </v-col>
    </v-row>
    <v-row
      no-gutters
      class="d-flex align-end"
    >
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
import categories from '@/constants/categories'

export default {
  name: 'HomePage',
  props: {
    loadingData: Boolean
  },
  components: {
    IngredientSearchBar,
    RecipeList
  },
  computed: {
    categoryItems () {
      return categories
    }
  }
}
</script>

<style scoped>
.loading-list {
  width: 100%
}
</style>
