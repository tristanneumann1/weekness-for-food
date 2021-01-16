<template>
  <v-text-field
    single-line
    clearable
    prepend-icon="mdi-magnify"
    label="Search"
    v-model="localSearchTerm"
    @click:clear="clear"
    @click:prepend="search"
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
    },
    clear() {
      this.updateSearchTerm('')
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
