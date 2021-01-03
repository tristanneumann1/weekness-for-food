<template>
  <v-container>
    <v-row no-gutters class="pt-5">
      <Title
        title="What would you like to cook?"
        :back-arrow="false"
      />
    </v-row>
    <v-row no-gutters>
      <v-col class="col-12 col-md-9">
        <RecipeSearchBar
          v-model="searchTerm"
          :loading="loadingData"
        />
      </v-col>
      <v-col class="col-12 col-md-3">
        <v-select
          outlined
          clearable
          label="Categories"
          class="ml-md-4"
          :items="categoryItems"
          @change="categoryFilter"
        />
      </v-col>
      <v-col class="col-12">
        <v-simple-checkbox
          :ripple="false"
          :value="tempFilter"
          @input="toggleTempFilter"
        />
        Temporary serving size filter
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
  data () {
    return {
      searchTerm: ''
    }
  },
  computed: {
    ...mapState(['tempFilter']),
    categoryItems () {
      return categories
    }
  },
  methods: {
    ...mapActions(['categoryFilter', 'updateSearchTerm']),
    toggleTempFilter (e) {
      this.$store.commit('TEMP_FILTER', e)
    }
  }
}
</script>

<style scoped>
.loading-list {
  width: 100%
}
</style>
