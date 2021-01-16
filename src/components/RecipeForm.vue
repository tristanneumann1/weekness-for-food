<template>
  <v-form
    class="recipe-form"
  >
    <v-container class="px-16">
      <v-row>
        <v-col class="pa-0 col-12 col-md-6">
          <v-text-field
            required
            outlined
            v-model="value.name"
            label="Recipe name"
            :rules="nameRules"
          ></v-text-field>
        </v-col>
        <v-col class="pa-0 col-6 col-md-4 pl-md-2">
          <v-select
            outlined
            v-model="value.category"
            label="Category"
            :items="categoryItems"
          />
        </v-col>
        <v-col class="pa-0 col-6 col-md-2 pl-2">
          <v-text-field
            required
            outlined
            v-model="value.servingSize"
            type="number"
            label="Serves"
            append-icon="mdi-account"
            :rules="[max32]"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-textarea
          outlined
          auto-grow
          v-model="value.chefsNotes"
          label="Add any additional notes here"
        ></v-textarea>
      </v-row>
      <v-row>
        <IngredientSelector v-model="value.ingredientsV2"/>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import IngredientSelector from '@/components/IngredientSelector'
import categories from '@/constants/categories'

function required (field) {
  return (v) => !!v || field + ' is required'
}
export default {
  name: 'RecipeForm',
  props: ['value', 'loadingData'],
  components: {
    IngredientSelector
  },
  computed: {
    nameRules () {
      return [ required('Name') ]
    },
    max32 () {
      return (number) => (+number <= 32 && +number > 0) || 'Max: 32'
    },
    categoryItems () {
      return Object.values(categories)
    }
  }
}
</script>

<style scoped>
 .recipe-form {
   width: 100%;
 }
</style>
