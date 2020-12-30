<template>
  <v-container>
    <v-row no-gutters class="pt-5">
      <h2 v-if="searchByIngredient">What is in your fridge?</h2>
      <h2 v-else>What would you like to cook?</h2>
    </v-row>
    <v-row no-gutters>
      <v-col class="col-1 col-md-1 d-flex justify-center">
        <v-switch
          inset
          @change="toggleSearch"
        />
      </v-col>
      <v-col class="col-11 col-md-8">
        <IngredientSearchBar
          v-if="searchByIngredient"
          v-model="selectedIngredients"
          :loading="loadingData"
        />
        <RecipeSearchBar
          v-else
          v-model="searchTerm"
          :loading="loadingData"
        />
      </v-col>
      <v-col class="col-12 col-md-3">
        <v-select
          outlined
          clearable
          label="Filter by category"
          class="ml-md-4"
          :items="categoryItems"
          @change="categoryFilter"
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
        :searchByIngredient="searchByIngredient"
      />
    </v-row>
  </v-container>
</template>

<script>
import IngredientSearchBar from '@/components/IngredientSearchBar'
import RecipeSearchBar from '@/components/RecipeSearchBar'
import RecipeList from '@/components/RecipeList'
import categories from '@/constants/categories'
import { mapActions } from 'vuex'

export default {
  name: 'HomePage',
  props: {
    loadingData: Boolean
  },
  components: {
    RecipeSearchBar,
    IngredientSearchBar,
    RecipeList
  },
  data () {
    return {
      searchByIngredient: false,
      searchTerm: '',
      selectedIngredients: []
    }
  },
  computed: {
    categoryItems () {
      return categories
    }
  },
  methods: {
    ...mapActions(['categoryFilter', 'updateSelectedIngredients', 'updateSearchTerm']),
    toggleSearch (e) {
      this.updateSelectedIngredients([])
      this.updateSearchTerm('')
      this.searchTerm = ''
      this.selectedIngredients = []
      this.searchByIngredient = e
    }
  }
}
</script>

<style scoped>
.loading-list {
  width: 100%
}
</style>
