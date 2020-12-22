<template>
  <RecipeFormVue
    :recipe-id="$route.params.id"
    deleteButton
    button-text="save"
    title-text="Update the recipe here"
  />
</template>

<script>
import RecipeFormVue from '@/views/RecipeFormView'
export default {
  name: 'RecipeEditVue',
  components: {
    RecipeFormVue
  }
}
</script>

<style scoped>

</style>
