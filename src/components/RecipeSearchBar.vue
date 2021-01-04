<template>
  <v-text-field
    single-line
    append-icon="mdi-magnify"
    label="Search"
    :value="value"
    @input="$emit('input', $event)"
    @click:append="search"
    @keyup.enter="search"
  />
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'RecipeSearchBar',
  props: ['value'],
  methods: {
    ...mapActions(['updateSearchTerm']),
    search () {
      this.updateSearchTerm(this.value)
    }
  }
}
</script>

<style scoped>

</style>
