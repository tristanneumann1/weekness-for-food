<template>
  <v-row no-gutters>
    <v-col class="pa-0">
      <v-card-title
        primary-title
        class="recipe-title py-0"
      >
        <v-container>
          <v-row>
            <v-col class="col-auto pa-0">
              <v-btn
                v-if="url"
                icon
                x-small
                fab
                elevation="3"
                class="mr-2 grey lighten-3"
                color="primary"
                target="_blank"
                :href="url"
              >
                <v-icon dark>
                  mdi-open-in-new
                </v-icon>
              </v-btn>
              <v-btn
                v-if="!inCart"
                icon
                x-small
                fab
                elevation="3"
                class="mr-2 grey lighten-3"
                color="primary"
                @click="addToCart"
              >
                <v-icon dark>
                  mdi-cart-plus
                </v-icon>
              </v-btn>
              <v-btn
                v-else
                x-small
                fab
                dark
                elevation="3"
                class="mr-2"
                color="error"
                @click="remove"
              >
                <v-icon dark>
                  mdi-cart-remove
                </v-icon>
              </v-btn>
            </v-col>

            <router-link
              :to="`/recipe/${id}`"
              v-slot="{ href, route, navigate }"
            >
              <v-col
                class="pa-0 text-center word-wrap"
                :href="href"
                @click="navigate"
              >{{ name }}</v-col>
            </router-link>
          </v-row>
        </v-container>
      </v-card-title>
    </v-col>
    <v-col class="col-auto pa-0">
      <v-card-actions>
        <router-link
          :to="`/recipe-form/${id}`"
          v-slot="{ href, route, navigate }"
        >
          <v-btn
            icon
            x-small
            fab
            elevation="3"
            class="grey lighten-3"
            color="primary"
            :href="href"
            @click="navigate"
          >
            <v-icon dark>
              mdi-pencil
            </v-icon>
          </v-btn>
        </router-link>
      </v-card-actions>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'RecipeTitle',
  props:  {
    url: String,
    name: String,
    id:  String
  },
  computed: {
    ...mapGetters(['recipeInCart']),
    inCart () {
      return this.recipeInCart(this.name)
    }
  },
  methods: {
    ...mapActions(['addToShoppingCartById', 'removeFromCart']),
    addToCart () {
      this.addToShoppingCartById(this.id)
    },
    remove () {
      this.removeFromCart({ recipeName: this.name })
    }
  }
}
</script>

<style scoped>
  .word-wrap {
    word-break: break-word;
  }
</style>
