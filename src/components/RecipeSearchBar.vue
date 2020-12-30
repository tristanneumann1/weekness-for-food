<template>
  <v-text-field
    hide-details
    single-line
    append-icon="mdi-magnify"
    label="Search"
    :value="value"
    @input="$emit('input', $event)"
    @click:append="search"
    @keyup.enter="search"
  ></v-text-field>
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
