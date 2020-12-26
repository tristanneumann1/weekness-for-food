<template>
  <v-container>
    <v-row no-gutters class="d-flex justify-space-between">
      <v-col class="d-flex align-center">
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
      </v-col>
      <v-col class="col-auto">
        <v-btn
          color="primary"
          class="ma-2"
          @click="toggleImageForm"
        >
          Manage images
          <span>
            <v-icon>
              mdi-arrow-right
            </v-icon>
          </span>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-slide-x-transition>
        <RecipeForm
          v-show="!imageForm"
          v-model="recipe"
          :loadingData="loadingData"
        />
      </v-slide-x-transition>
      <v-slide-x-reverse-transition>
        <div
          v-show="imageForm"
        > Image form </div>
      </v-slide-x-reverse-transition>
    </v-row>
    <v-row class="d-flex justify-center">
      <v-btn
        class="ma-2"
        color="primary"
        @click="submitForm"
      >
        {{ buttonText }}
      </v-btn>
      <v-btn
        color="error"
        class="ma-2"
        v-if="deleteButton"
        @click="onDelete"
      >
        Delete
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
    deleteButton: {
      type: Boolean,
      default: false
    },
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
      id: this.recipeId ? this.recipeId : v4(),
      imageForm: false
    }
  },
  computed: {
    ...mapState(['recipes'])
  },
  methods: {
    ...mapActions(['createRecipe', 'deleteRecipe']),
    submitForm () {
      this.createRecipe({
        recipe: this.recipe,
        id: this.id
      })
    },
    onDelete () {
      this.deleteRecipe(this.id)
    },
    toggleImageForm () {
      this.imageForm = !this.imageForm
    }
  },
  watch: {
    recipes: {
      immediate: true,
      handler () {
        if (this.recipeId) {
          this.recipe = this.recipes[this.recipeId]
        }
      }
    }
  }
}
</script>

<style scoped>
</style>
