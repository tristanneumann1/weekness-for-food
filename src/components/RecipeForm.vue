<template>
  <v-form
    v-model="valid"
    class="recipe-form"
  >
    <v-container class="px-16">
      <v-row no-gutters>
        <v-text-field
          required
          outlined
          v-model="value.name"
          :rules="nameRules"
          label="Recipe name"
        ></v-text-field>
      </v-row>
      <v-row no-gutters>
        <v-text-field
          outlined
          v-model="value.url"
          label="One note link (optional)"
        ></v-text-field>
      </v-row>
      <v-row no-gutters>
        <v-text-field
          outlined
          v-model="value.img"
          label="image url (optional)"
        ></v-text-field>
      </v-row>
      <v-row no-gutters>
        <v-combobox
          v-model="value.ingredients"
          :items="ingredients"
          label="Ingredients"
          :loading="loadingData"
          :search-input.sync="searchInput"
          @change="searchInput=''"
          clearable
          small-chips
          filled
          deletable-chips
          multiple
        ></v-combobox>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>

import { mapGetters } from 'vuex'

function required (field) {
  return (v) => !!v || field + ' is required'
}
export default {
  name: 'RecipeForm',
  props: ['value', 'loadingData'],
  data () {
    return {
      valid: false,
      searchInput: ''
    }
  },
  computed: {
    ...mapGetters({
      ingredients: 'ingredientsList'
    }),
    nameRules () {
      return [ required('Name') ]
    }
  },
  methods: {
    ingredientsChange () {

    }
  }
}
</script>

<style scoped>
 .recipe-form {
   width: 100%;
 }
</style>
