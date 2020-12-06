<template>
  <v-card>
    <v-card-title primary-title>
      {{name}}
    </v-card-title>
    <v-card-text>
      <ul v-if="storedIngredients.length">
        Ingredients in your fridge:
        <li
          v-for="ingredient in storedIngredients"
          :key="ingredient"
        >{{ingredient}}</li>
      </ul>
      <ul v-if="missingIngredients.length">
        Ingredients you need to buy:
        <li
          v-for="ingredient in missingIngredients"
          :key="ingredient"
        >{{ingredient}}</li>
      </ul>
    </v-card-text>
  </v-card>
</template>
<script>

export default {
  name: 'RecipeCard',
  props: ['name', 'storedIngredients', 'missingIngredients']
};
</script>
