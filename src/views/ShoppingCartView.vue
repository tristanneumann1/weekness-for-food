<template>
  <v-container>
    <v-row class="mb-3">
      <Title title="Shopping Cart"/>
      <v-col class="col-auto">
        <v-btn
          color="error"
          :disabled="!shoppingCart.length"
          @click="clearCart"
        >Empty</v-btn>
      </v-col>
    </v-row>
    <v-row v-if="shoppingCart.length">
      <v-col class="bordered col-12 col-md-4">
        <v-container>
          <v-row>
            <v-icon>mdi-account</v-icon>
          </v-row>
          <v-row
            class="d-flex justify-space-between my-1"
            v-for="cartItem in shoppingCart"
            :key="cartItem.recipe.name"
          >
            <v-col class="d-flex flex-row align-center">
              <v-text-field
                outlined
                dense
                hide-details
                class="serving-size-input mr-1"
                type="number"
                :value="cartItem.servingSize"
                @input="updateCartItem(cartItem, $event)"
              />
              <router-link
                :to="`/recipe/${cartItem.recipe.id}`"
              >
                {{cartItem.recipe.name}}
              </router-link>
            </v-col>
            <v-col class="col-auto">
              <v-btn
                icon
                @click="deleteFromCart(cartItem.recipe.name)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-col>
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
    <v-row v-else>
      <h3>Add recipes to your shopping cart to build up your shopping list</h3>
    </v-row>
  </v-container>
</template>

<script>
import Title from '@/components/Title'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ShoppingCartView',
  components: {
    Title
  },
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
    ...mapActions(['removeFromCart', 'clearCart', 'updateCartItemServingSize']),
    deleteFromCart (recipeName) {
      this.removeFromCart({ recipeName })
    },
    updateCartItem (cartItem, servingSize) {
      this.updateCartItemServingSize({ recipeName: cartItem.recipe.name, servingSize })
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../styles/variables.scss';
  a {
    color: #0089c7;
    font-weight: bold;
    text-decoration: none;
    &:hover {
      color: #00abe9;
    }
  }
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
