<template>
  <div>
    <v-hover
      v-slot="{ hover }"
    >
      <v-card
        shaped
        :elevation="hover ? 12 : 2"
        class="recipe-card"
        :class="titleColor"
      >
        <v-container class="py-0">
          <v-row
            class="d-flex justify-space-between"
          >
            <v-img
              v-if="img"
              height="250"
              class="align-end"
              :src="img"
            >
              <RecipeTitle
                :name="nameCapitalized"
                :url="url"
                :id="id"
              />
            </v-img>
            <RecipeTitle
              v-else
              :name="nameCapitalized"
              :url="url"
              :id="id"
            />
          </v-row>
        </v-container>
      </v-card>
    </v-hover>
  </div>
</template>
<script>
import categories from '@/constants/categories'
import RecipeTitle from '@/components/RecipeTitle'

export default {
  name: 'RecipeCard',
  props: {
    id: String,
    name: String,
    img: String,
    url: String,
    category: String
  },
  components: {
    RecipeTitle
  },
  computed: {
    nameCapitalized () {
      return this.name[0].toUpperCase() + this.name.slice(1)
    },
    titleColor () {
      return categories[this.category].color
    }
  }
};
</script>
<style scoped>
.recipe-card {
  transition: box-shadow 0.3s;
}
</style>
