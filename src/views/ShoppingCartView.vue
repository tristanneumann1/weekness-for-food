<template>
  <v-container>
    <v-dialog
      max-width="500px"
      v-model="dialog"
    >
      <v-card tile>
        <v-card-title>Are you sure you want to clear your cart?</v-card-title>
        <v-card-text class="d-flex justify-center">
          <v-btn
            text
            class="mr-3"
            @click="toggleModal"
          >
            Cancel
          </v-btn>
          <v-btn
            class="ml-3"
            color="error"
            @click="onCartClear"
          >
            Empty
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-row class="mb-3">
      <Title title="Shopping Cart"/>
      <v-col class="col-auto">
        <v-btn
          color="error"
          :disabled="!shoppingCart.length"
          @click="toggleModal"
        >Empty</v-btn>
      </v-col>
    </v-row>
    <v-row v-if="shoppingCart.length">
      <v-col class="bordered col-12 col-md-4">
        <v-container>
          <v-row>
            <v-col class="col-3 d-flex justify-center">
              <v-icon>mdi-account</v-icon>
            </v-col>
          </v-row>
          <v-row
            class="my-1"
            v-for="cartItem in shoppingCart"
            :key="cartItem.recipe.name"
          >
            <v-col class="col-3">
              <v-text-field
                outlined
                dense
                hide-details
                class="mr-1"
                type="number"
                :value="cartItem.servingSize"
                @input="updateCartItem(cartItem, $event)"
              />
            </v-col>
            <v-col class="col-7 d-flex align-center px-0">
              <router-link
                :to="`/recipe/${cartItem.recipe.id}`"
              >
                {{cartItem.recipe.name}}
              </router-link>
            </v-col>
            <v-col class="col-2">
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
  data () {
    return {
      dialog: false
    }
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
    },
    toggleModal () {
      this.dialog = !this.dialog
    },
    onCartClear () {
      this.clearCart().then(this.toggleModal)
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
  .ingredient-column {
    border-left: $border-color 1px solid;
  }
</style>
