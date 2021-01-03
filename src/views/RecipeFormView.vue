<template>
  <v-container>
    <v-row no-gutters class="d-flex justify-space-between">
      <Title :title="titleText"/>
      <v-col class="col-auto">
        <v-btn
          color="primary"
          class="ma-2"
          @click="toggleImageForm"
        >
          <span v-if="imageForm">
            <v-icon>
              mdi-arrow-left
            </v-icon>
            <v-icon>
              mdi-form-select
            </v-icon>
          </span>
          <span v-else>
            <v-icon>
              mdi-file-image
            </v-icon>
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
        <ImageManager
          v-show="imageForm"
          v-model="recipe"
          :id="id"
          @update:recipeImages="updateImageList"
          @save="submitForm"
        />
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
import ImageManager from '@/components/ImageManager'
import Title from '@/components/Title'
import { v4 } from 'uuid'
import { mapActions, mapState } from 'vuex'
import Recipe from '@/store/Recipe'

export default {
  name: 'RecipeFormView',
  components: {
    RecipeForm,
    ImageManager,
    Title
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
      default: 'Create a new recipe'
    }
  },
  data () {
    const id = this.recipeId ? this.recipeId : v4()
    return  {
      recipe: new Recipe({
        id,
        name: ''
      }),
      id,
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
    },
    updateImageList (recipeImages, done) {
      this.$set(this.recipe, 'recipeImages', recipeImages)
      done()
    }
  },
  watch: {
    recipes: {
      immediate: true,
      handler () {
        if (this.recipeId && Object.keys(this.recipes).length) {
          this.recipe = {
            ...this.recipe,
            ...this.recipes[this.recipeId]
          }
        }
      }
    }
  }
}
</script>

<style scoped>
</style>
