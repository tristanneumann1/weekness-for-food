<template>
  <div>
    <v-hover
      v-slot="{ hover }"
    >
      <v-card
        :elevation="hover ? 12 : 2"
        class="recipe-card"
      >
        <v-container class="py-0">
          <v-row
            class="d-flex justify-space-between"
            :class="titleColor"
          >
            <v-img
              v-if="img"
              height="250"
              class="align-end"
              :src="img"
            >
              <RecipeTitle
                :name="nameCapitalized"
                :url="url"
                :id="id"
              />
            </v-img>
            <RecipeTitle
              v-else
              :name="nameCapitalized"
              :url="url"
              :id="id"
            />
          </v-row>
          <v-row v-if="showIngredients">
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
    </v-hover>
  </div>
</template>
<script>
import * as categories from '@/constants/categories'
import RecipeTitle from '@/components/RecipeTitle'

export default {
  name: 'RecipeCard',
  props: {
    id: String,
    name: String,
    img: String,
    url: String,
    category: String,
    missingIngredients: Array,
    storedIngredients: Array,
    showIngredients: Boolean
  },
  components: {
    RecipeTitle
  },
  computed: {
    nameCapitalized () {
      return this.name[0].toUpperCase() + this.name.slice(1)
    },
    titleColor () {
      switch (this.category) {
        case categories.PORK:
          return 'red lighten-3'
        case categories.BAKED_DESSERTS:
          return 'brown lighten-1'
        case categories.APPETIZERS:
          return 'cyan lighten-4'
        case categories.LAMB:
          return 'red accent-1'
        case categories.FISH:
          return 'blue lighten-4'
        case categories.SOUPS:
          return 'deep-purple lighten-4'
        case categories.BEEF:
          return 'red accent-1'
        case categories.PASTA:
          return 'amber lighten-3'
        case categories.MORE_DESSERTS:
          return 'brown lighten-2'
        case categories.SIDE_DISHES:
          return 'amber accent-3'
        case categories.MISCELLANEOUS:
          return 'blue-grey lighten-4'
        case categories.VEAL:
          return 'red lighten-3'
        case categories.VEGGIE:
          return 'green lighten-4'
        case categories.MISCELLANEOUS_MEALS:
          return 'blue-grey lighten-3'
        case categories.CHICKEN_DUCK_RABBIT:
          return 'red lighten-3'
        default:
          return 'black white--text'
      }
    }
  }
};
</script>
<style scoped>
.missing-ingredients {
  border-left: lightgray 1px solid;
  background-color: #e3e3e3;
}
.recipe-card {
  transition: box-shadow 0.3s;
}
</style>
