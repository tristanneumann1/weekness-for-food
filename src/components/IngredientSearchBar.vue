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
  ></v-combobox>
</template>

<script>
import INGREDIENTS from '@/constants/ingredients'
export default {
  name: "IngredientSearchBar",
  data: () => ({
    ingredients: INGREDIENTS,
    selectedIngredients: []
  })
}
</script>

<style scoped>

</style>
