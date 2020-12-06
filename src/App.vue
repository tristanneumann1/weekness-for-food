<template>
  <v-app>
    <v-main>    
      <IngredientForm />
    </v-main>
  </v-app>
</template>

<script>
import IngredientForm from './components/IngredientForm';

export default {
  name: 'App',

  components: {
    IngredientForm,
  }
};
</script>
