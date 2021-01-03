<template>
  <div>
    <v-hover
      v-slot="{ hover }"
    >
      <v-card
        shaped
        :elevation="hover ? 12 : 2"
        class="recipe-card"
        :class="titleColor"
      >
        <v-container class="py-0">
          <v-row
            class="d-flex justify-space-between"
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
    category: String
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
.recipe-card {
  transition: box-shadow 0.3s;
}
</style>
