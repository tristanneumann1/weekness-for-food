<template>
  <div class="overflow-y-hidden">
    <v-app-bar
      absolute
      dark
      fade-img-on-scroll
      shrink-on-scroll
      color="rgba(25,32,72,.7)"
      height="400"
      src="https://picsum.photos/1920/1080?random"
      scroll-target="#main-sheet"
    >
      <template v-slot:img="{ props }">
        <v-img
            v-bind="props"
            gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
        />
      </template>
      <div
        class="app-bar--content"
      >
        <h1>A weakness for food</h1>
      </div>
    </v-app-bar>
    <v-main>
      <v-container
        id="main-sheet"
        class="overflow-y-auto"
      >
        <v-row no-gutters class="pt-5">
          <h2>What's in your fridge?</h2>
        </v-row>
        <v-row no-gutters>
          <IngredientSearchBar :loading="loadingData" />
        </v-row>
        <v-row no-gutters>
          <h2>You should cook one of these tonight:</h2>
        </v-row>
        <v-row no-gutters>
          <RecipeList
            class="loading-list"
            :loading="loadingData"
          />
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import IngredientSearchBar from '@/components/IngredientSearchBar'
import RecipeList from '@/components/RecipeList'
import { mapActions } from 'vuex'

export default {
  name: 'HomePage',
  components: {
    IngredientSearchBar,
    RecipeList
  },
  data () {
    return {
      loadingData: false
    }
  },
  methods: {
    ...mapActions([
      'fetchRecipes'
    ])
  },
  created() {
    this.loadingData = true
    this.fetchRecipes().finally(() => {
      this.loadingData = false
    })
  }
}
</script>

<style scoped>
#main-sheet {
  max-height: 100vh;
  padding-top: 400px;
}

h1 {
  font-size: 1em;
  align-self: flex-end;
}

.app-bar--content {
  display: flex;
  height: 100%;
}
.loading-list {
  width: 100%
}
</style>
