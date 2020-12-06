<template>
  <v-combobox
      v-model="selectedIngredients"
      :items="ingredients"
      label="What is in your fridge?"
      clearable
      small-chips
      filled
      deletable-chips
      multiple
      @change="updateSelectedIngredients"
  ></v-combobox>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: "IngredientSearchBar",
  data: () => ({
    selectedIngredients: []
  }),
  computed: {
    ...mapGetters({
      ingredients: 'ingredientsList'
    })
  },
  methods: {
    ...mapActions(['updateSelectedIngredients'])
  }
}
</script>

<style scoped>

</style>
