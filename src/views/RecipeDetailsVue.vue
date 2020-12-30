<template>
  <v-container>
    <v-row>
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
        this.$set(this.widths, imageSrc, img.width)
        this.$set(this.heights, imageSrc, img.height)
      }
      img.src = imageSrc
    },
  }
}
</script>

<style scoped>
</style>
