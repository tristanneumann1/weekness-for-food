<template>
  <div>
    <v-card>
      <v-container class="py-0">
        <v-row
          class="d-flex justify-space-between"
          :class="titleColor"
        >
          <v-col class="pa-0">
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
              >
                <v-btn
                  v-if="url"
                  icon
                  x-small
                  fab
                  elevation="3"
                  class="mr-2 grey lighten-3"
                  color="primary"
                  target="_blank"
                  :href="url"
                >
                  <v-icon dark>
                    mdi-open-in-new
                  </v-icon>
                </v-btn>
                {{ nameCapitalized }}
              </v-card-title>
            </v-img>
            <template v-else>
              <v-card-title
                primary-title
                class="recipe-title"
              >
                <span>
                  <v-btn
                    v-if="url"
                    icon
                    x-small
                    fab
                    elevation="3"
                    class="mr-2 grey lighten-3"
                    color="primary"
                    target="_blank"
                    :href="url"
                  >
                    <v-icon dark>
                      mdi-open-in-new
                    </v-icon>
                  </v-btn>
                  {{ nameCapitalized }}
                </span>
              </v-card-title>
            </template>
          </v-col>
          <v-col class="col-auto pa-0">
            <v-card-actions>
              <router-link
                :to="`/recipe-form/${id}`"
                v-slot="{ href, route, navigate }"
              >
                <v-btn
                  icon
                  x-small
                  fab
                  elevation="3"
                  class="grey lighten-3"
                  color="primary"
                  :href="href"
                  @click="navigate"
                >
                  <v-icon dark>
                    mdi-pencil
                  </v-icon>
                </v-btn>
              </router-link>
              <v-btn
                icon
                x-small
                fab
                elevation="3"
                class="grey lighten-3"
                color="primary"
                @click="onDelete"
              >
                <v-icon dark>
                  mdi-trash-can
                </v-icon>
              </v-btn>
            </v-card-actions>
          </v-col>
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
import { mapActions } from 'vuex'
import * as categories from '@/constants/categories'

export default {
  name: 'RecipeCard',
  props: {
    id: String,
    name: String,
    img: String,
    url: String,
    category: String,
    missingIngredients: Array,
    storedIngredients: Array
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
  },
  methods: {
    ...mapActions(['deleteRecipe']),
    onDelete () {
      this.deleteRecipe(this.id)
    }
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
