<template>
  <div>
    <v-card>
      <v-container class="py-0">
        <v-row class="title-container">
          <v-img
            dark
            v-if="img"
            height="250"
            class="align-end"
            :src="img"
          >
            <v-card-title
              primary-title
              class="recipe-title"
              v-text="name"
            />
          </v-img>
          <v-card-title
            v-else
            primary-title
            class="recipe-title"
            v-text="name"
          />
        </v-row>
        <v-row>
          <v-col class="col-6">
            <span class="text-decoration-underline font-weight-bold">You own</span>
            <ul v-if="storedIngredients.length">
              <li
                v-for="ingredient in storedIngredients"
                :key="ingredient"
              >{{ingredient}}</li>
            </ul>
          </v-col>
          <v-col class="col-6 missing-ingredients">
            <span class="text-decoration-underline font-weight-bold">You need</span>
            <ul v-if="missingIngredients.length">
              <li
                v-for="ingredient in missingIngredients"
                :key="ingredient"
              >{{ingredient}}</li>
            </ul>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>
<script>

export default {
  name: 'RecipeCard',
  props: {
    name: String,
    img: String,
    missingIngredients: Array,
    storedIngredients: Array
  }
};
</script>
<style scoped>
.title-container {
  background-color: lightblue;
}
.missing-ingredients {
  border-left: lightgray 1px solid;
  background-color: #e3e3e3;
}
.recipe-title {
  word-break: break-word;
}
</style>
