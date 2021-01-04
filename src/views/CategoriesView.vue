<template>
  <v-container>
    <v-row>
      <Title title="Categories"/>
    </v-row>
    <v-row class="d-flex justify-center align-center">
      <v-btn
        v-for="category in categoryItems"
        :key="category.value"
        class="ma-3"
        :class="category.color"
        @click="filterByCategory(category.value)"
      >
        {{category.text}}
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import categories from '@/constants/categories'
import Title from '@/components/Title'
import { mapActions } from 'vuex'

export default {
  name: 'CategoriesView',
  components: {
    Title
  },
  computed: {
    categoryItems () {
      return Object.values(categories)
    }
  },
  methods: {
    ...mapActions(['categoryFilter']),
    filterByCategory (category) {
      this.categoryFilter(category).then(() => {
        this.$router.push('/')
      })
    }
  }
}
</script>

<style scoped>
</style>
