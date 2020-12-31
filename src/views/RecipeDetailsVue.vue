<template>
  <v-container>
    <v-row class="top-bar d-flex justify-space-between align-center">
      <v-col class="d-flex align-center">
        <router-link
          to="/"
          v-slot="{ href, route, navigate }"
        >
          <v-btn
            fab
            color="primary"
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
        <h2>{{recipe.name}}</h2>
      </v-col>
      <v-col class="col-auto">
        Add to shopping cart:
        <div class="d-flex flex-row align-center justify-space-between">
          <v-text-field
            outlined
            dense
            hide-details
            class="serving-size-input mr-1"
            type="number"
            v-model="servingSize"
            append-icon="mdi-account"
          />
          <v-btn
            icon
            fab
            outlined
            v-if="!inCart"
            class="ml-3"
            color="primary"
            @click="addToCart"
          >
            <v-icon>mdi-cart-plus</v-icon>
          </v-btn>
          <v-btn
            icon
            fab
            outlined
            v-else
            class="ml-3"
            color="primary"
            @click="remove"
          >
            <v-icon>mdi-cart-minus</v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="col-3 left-bar">
        <v-row>
          <h3>Serves:</h3>
          <b v-if="+recipe.servingSize < 7">
            <v-icon
              v-for="account in +recipe.servingSize"
              :key="account"
            >mdi-account</v-icon>
          </b>
          <b class="ml-2" v-else>
            {{+recipe.servingSize}}
            <v-icon>mdi-account</v-icon>
          </b>
        </v-row>
        <v-row>
          <h3>Ingredients:</h3>
        </v-row>
        <v-row>
          <ul>
            <li v-for="(ingredient, idx) in ingredients" :key="idx">
              {{ ingredient.quantity }} {{ ingredient.unit }} {{ ingredient.name }}
            </li>
          </ul>
        </v-row>
      </v-col>
      <v-col class="col-9">
        <v-container>
          <v-row>
            <v-col>
              <p>{{recipe.chefsNotes}}</p>
            </v-col>
          </v-row>
          <v-row
            v-for="imageSrc in images"
            class="d-flex child-flex justify-center"
            :key="imageSrc"
          >
            <v-img
              contain
              :src="imageSrc"
              lazy-src="https://picsum.photos/10/10"
              :max-width="widths[imageSrc] || 10"
              :max-height="heights[imageSrc] || 10"
              class="grey lighten-2 ma-2"
            >
              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'RecipeDetailsVue',
  data () {
    return {
      widths: {},
      heights: {},
      servingSize: null
    }
  },
  computed: {
    ...mapGetters(['recipeById', 'recipeInCart']),
    recipe () {
      return this.recipeById(this.$route.params.id)
    },
    ingredients () {
      return this.recipe?.ingredientsV2 || []
    },
    images () {
      return this.recipe?.recipeImages || []
    },
    inCart () {
      return this.recipeInCart(this.recipe.name)
    }
  },
  methods: {
    ...mapActions(['addToShoppingCart', 'removeFromCart']),
    getImageSize (imageSrc) {
      const img = new Image()
      img.onload = () => {
        this.$set(this.widths, imageSrc, Math.min(img.width, 600))
        this.$set(this.heights, imageSrc, Math.min(img.height, 600))
      }
      img.src = imageSrc
    },
    addToCart () {
      this.addToShoppingCart({ recipe: this.recipe, servingSize: +this.servingSize })
    },
    remove () {
      this.removeFromCart({ recipeName: this.recipe.name })
    }
  },
  watch: {
    images: {
      deep: true,
      immediate: true,
      handler (images) {
        images.forEach(imageSrc => {
          if (this.widths[imageSrc]) {
            return
          }
          this.getImageSize(imageSrc)
        })
      }
    },
    recipe: {
      handler (recipe) {
        if (this.servingSize !== null || !this.recipe.servingSize) {
          return
        }
        this.servingSize = +recipe.servingSize
      },
      immediate: true
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../styles/variables.scss';
  .top-bar {
    border-bottom: $border-color solid 1px;
  }
  .serving-size-input {
    max-width: 6em;
  }
  .left-bar {
    border-right: $border-color solid 1px;
  }
</style>
