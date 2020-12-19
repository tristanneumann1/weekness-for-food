<template>
  <v-container>
    <v-row no-gutters class="d-flex align-center">
      <router-link
        to="/"
        v-slot="{ href, route, navigate }"
      >
        <v-btn
          fab
          color="accent"
          class="ma-2 mr-4"
          :href="href"
          @click="navigate"
        >
          <v-icon
            dark
            large
          >
            mdi-arrow-left-thick
          </v-icon>
        </v-btn>
      </router-link>
      <h2>{{ titleText }}</h2>
    </v-row>
    <v-row>
      <RecipeForm
        v-model="recipe"
        :loadingData="loadingData"
      />
    </v-row>
    <v-row class="d-flex justify-center">
      <v-btn
        color="primary"
        @click="submitForm"
      >
        {{ buttonText }}
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import RecipeForm from '@/components/RecipeForm'
import { v4 } from 'uuid'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'RecipeFormView',
  components: {
    RecipeForm
  },
  props: {
    loadingData: Boolean,
    recipeId: String,
    buttonText: {
      type: String,
      default: 'submit'
    },
    titleText: {
      type: String,
      default: 'Create a new recipe here'
    }
  },
  data () {
    return  {
      recipe: {},
      id: this.recipeId ? this.recipeId : v4()
    }
  },
  computed: {
    ...mapState(['recipes'])
  },
  methods: {
    ...mapActions(['createRecipe']),
    submitForm () {
      this.createRecipe({
        recipe: this.recipe,
        id: this.id
      })
    }
  },
  watch: {
    recipes: {
      immediate: true,
      handler () {
        if (this.recipeId) {
          this.recipe = this.recipes.find(recipe => recipe.id === this.recipeId)
        }
      }
    }
  }
}
</script>

<style scoped>
</style>