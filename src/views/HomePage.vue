<template>
  <v-container>
    <v-row no-gutters class="pt-5">
      <Title
        title="What would you like to eat?"
        :back-arrow="false"
      />
    </v-row>
    <v-row no-gutters>
      <v-col class="col-12 col-md-9">
        <RecipeSearchBar
          :loading="loadingData"
        />
      </v-col>
      <v-col class="col-12 col-md-3">
        <v-select
          outlined
          clearable
          label="Categories"
          class="ml-md-4"
          :value="filters.category ? filters.category.value : ''"
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
      <h2>How about:</h2>
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
import RecipeSearchBar from '@/components/RecipeSearchBar'
import RecipeList from '@/components/RecipeList'
import categories from '@/constants/categories'
import Title from '@/components/Title'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'HomePage',
  props: {
    loadingData: Boolean
  },
  components: {
    RecipeSearchBar,
    RecipeList,
    Title
  },
  computed: {
    ...mapState(['filters']),
    categoryItems () {
      return Object.values(categories)
    }
  },
  methods: {
    ...mapActions(['categoryFilter'])
  }
}
</script>

<style scoped>
.loading-list {
  width: 100%
}
</style>
