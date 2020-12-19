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
      <h2>Create a new recipe here</h2>
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
        Submit
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import RecipeForm from '@/components/RecipeForm'
import { mapActions } from 'vuex'

export default {
  name: 'RecipeFormView',
  components: {
    RecipeForm
  },
  props: ['loadingData'],
  data () {
    return  {
      recipe: {}
    }
  },
  methods: {
    ...mapActions(['createRecipe']),
    submitForm () {
      this.createRecipe(this.recipe)
    }
  }
}
</script>

<style scoped>
</style>
