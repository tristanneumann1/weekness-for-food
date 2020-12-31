<template>
  <v-container>
    <v-row class="top-bar">
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
          <div v-for="ingredient in recipe.ingredients" :key="ingredient">
            {{ ingredient }}
          </div>
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
            v-for="imageSrc in recipe.recipeImages || []"
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
import { mapGetters } from 'vuex'

export default {
  name: 'RecipeDetailsVue',
  data () {
    return {
      widths: {},
      heights: {}
    }
  },
  computed: {
    ...mapGetters(['recipeById']),
    recipe () {
      return this.recipeById(this.$route.params.id)
    }
  },
  created () {
    this.recipe.recipeImages?.forEach(imageSrc => {
      if (this.widths[imageSrc]) {
        return
      }
      this.getImageSize(imageSrc)
    })
  },
  methods: {
    getImageSize(imageSrc) {
      const img = new Image()
      img.onload = () => {
        this.$set(this.widths, imageSrc, Math.min(img.width, 600))
        this.$set(this.heights, imageSrc, Math.min(img.height, 600))
      }
      img.src = imageSrc
    },
  }
}
</script>

<style scoped lang="scss">
  @import '../styles/variables.scss';
  .top-bar {
    border-bottom: $border-color solid 1px;
  }
  .left-bar {
    border-right: $border-color solid 1px;
  }
</style>
