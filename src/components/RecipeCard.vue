<template>
  <div>
    <v-hover
      v-slot="{ hover }"
    >
      <router-link
        :to="`/recipe/${id}`"
        v-slot="{ href, route, navigate }"
      >
        <v-card
          :href="href"
          :elevation="hover ? 12 : 2"
          class="recipe-card"
          @click="navigate"
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
      </router-link>
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
        case categories.MEAT:
          return 'red lighten-2'
        case categories.FISH:
          return 'blue accent-1'
        case categories.VEGGIE:
          return 'green lighten-2'
        case categories.DESSERTS:
          return 'pink lighten-3'
        case categories.SOUPS:
          return 'brown lighten-3'
        case categories.PASTA:
          return 'orange accent-1'
        case categories.OTHER:
          return 'blue-grey lighten-4'
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
