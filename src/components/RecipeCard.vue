<template>
  <v-card>
    <v-img
      dark
      height="250"
      class="align-end"
      :src="`https://picsum.photos/200/3${Math.floor(Math.random() * 100)}?random`"
    >
      <v-card-title
        primary-title
        class="recipe-title"
        v-text="name"
      />
    </v-img>
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
<style scoped>
.recipe-title {
  word-break: break-word;
}
</style>
