<template>
  <v-text-field
    single-line
    append-icon="mdi-magnify"
    label="Search"
    v-model="localSearchTerm"
    @click:append="search"
    @keyup.enter="search"
  />
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'RecipeSearchBar',
  data () {
    return {
      localSearchTerm: ''
    }
  },
  computed: {
    ...mapState(['searchTerm'])
  },
  methods: {
    ...mapActions(['updateSearchTerm']),
    search () {
      this.updateSearchTerm(this.localSearchTerm)
    }
  },
  watch : {
    searchTerm (newTerm) {
      if (this.localSearchTerm !== newTerm) {
        this.localSearchTerm = newTerm
      }
    }
  },
  mounted () {
    this.localSearchTerm = this.searchTerm
  }
}
</script>

<style scoped>

</style>
