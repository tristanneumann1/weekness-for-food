<template>
  <div>
    <v-app-bar
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
        ></v-img>
      </template>
      <div
        class="app-bar--content"
      >
        <h1>A weakness for food</h1>
      </div>
    </v-app-bar>
    <v-main
      id="main-sheet"
      class="overflow-y-auto"
    >
      <div class="container">
        <h2>What's in your fridge?</h2>
        <IngredientSearchBar />
        <h2>You should cook one of these tonight:</h2>
        <RecipeList />
      </div>
    </v-main>
  </div>
</template>

<script>
import IngredientSearchBar from '@/components/IngredientSearchBar'
import RecipeList from '@/components/RecipeList'

export default {
  name: "HomePage",
  components: {
    IngredientSearchBar,
    RecipeList
  }
}
</script>

<style scoped>
#main-sheet {
  max-height: 100vh;
}

h1 {
  font-size: 1em;
  align-self: flex-end;
}

.app-bar--content {
  display: flex;
  height: 100%;
}
</style>
