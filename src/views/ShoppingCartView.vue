<template>
  <v-container>
    <v-row class="mb-3">
      <h2>Shopping Cart</h2>
    </v-row>
    <v-row>
      <v-col class="bordered col-12 col-md-4">
        <v-container>
          <v-row>
            <v-icon>mdi-account</v-icon>
          </v-row>
          <v-row
            class="d-flex flex-row align-center my-1"
            v-for="cartItem in shoppingCart"
            :key="cartItem.recipe.name"
          >
            <v-text-field
              outlined
              dense
              hide-details
              class="serving-size-input mr-1"
              type="number"
              v-model="cartItem.servingSize"
            />
            <span>{{cartItem.recipe.name}}</span>
            <v-btn
              icon
              @click="deleteFromCart(cartItem.recipe.name)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-row>
        </v-container>
      </v-col>
      <v-col class="col-12 col-md-8">
        <v-container>
          <v-row
            v-for="ingredient in ingredients"
            :key="ingredient.name"
          >
            <v-col class="col-8 py-3">
              {{ingredient.name}}
            </v-col>
            <v-col class="col-2 py-3 ingredient-column">
              <div
                v-for="(quantity, idx) in ingredient.quantities"
                :key="idx"
              >{{Math.round(quantity.quantity * 100) / 100}}</div>
            </v-col>
            <v-col class="col-2 py-3 ingredient-column">
              <div
                v-for="(quantity, idx) in ingredient.quantities"
                :key="idx"
              >{{quantity.unit}}</div>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ShoppingCartView',
  computed: {
    ...mapState(['shoppingCart']),
    ingredients() {
      if (!this.shoppingCart) {
        return []
      }
      const ingredientsMap = this.shoppingCart.reduce((ingredientMap, shoppingCartItem) => {
        shoppingCartItem.recipe.ingredientsV2.forEach(ingredient => {
          if (!ingredientMap[ingredient.name]) {
            ingredientMap[ingredient.name] = []
          }
          ingredientMap[ingredient.name].push({
            name: ingredient.name,
            unit: ingredient.unit,
            quantity: shoppingCartItem.servingSize * ingredient.quantity / shoppingCartItem.recipe.servingSize
          })
        })
        return ingredientMap
      }, {})
      return Object.values(ingredientsMap)
        .map(ingredient => {
          return {
            quantities: ingredient.map(ingredientEntry => ({
              quantity: ingredientEntry.quantity,
              unit: ingredientEntry.unit
            })),
            name: ingredient[0].name
          }
        })
        .sort((ingredient1, ingredient2) => {
        return ingredient1.name > ingredient2.name ? 1 : -1
      })
    }
  },
  methods: {
    ...mapActions(['removeFromCart']),
    deleteFromCart (recipeName) {
      this.removeFromCart({ recipeName })
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../styles/variables.scss';
  .bordered {
    border: 1px solid $border-color;
  }
  .serving-size-input {
    max-width: 4em;
  }
  .ingredient-column {
    border-left: $border-color 1px solid;
  }
</style>
