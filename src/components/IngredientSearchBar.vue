<template>
  <v-combobox
    :value="value"
    :items="ingredients"
    :loading="loading"
    :search-input.sync="searchInput"
    label="List the ingredients in your fridge"
    clearable
    small-chips
    filled
    deletable-chips
    multiple
    @change="selectIngredients"
  ></v-combobox>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'IngredientSearchBar',
  props: {
    loading: Boolean,
    value: Array
  },
  data: () => ({
    searchInput: ''
  }),
  computed: {
    ...mapGetters({
      ingredients: 'ingredientsList'
    })
  },
  methods: {
    ...mapActions(['updateSelectedIngredients']),
    selectIngredients (ingredients) {
      this.searchInput = ''
      this.updateSelectedIngredients(ingredients)
    }
  }
}
</script>

<style scoped>

</style>
