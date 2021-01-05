<template>
  <v-app id="app">
    <div class="overflow-y-hidden">
      <v-app-bar
        absolute
        dark
        fade-img-on-scroll
        shrink-on-scroll
        color="rgba(25,32,72,.7)"
        min-height="80"
        src="https://picsum.photos/1920/1080?random"
        scroll-target="#main"
        :height="$vuetify.breakpoint.smAndDown ? 200 : 400"
      >
        <template v-slot:img="{ props }">
          <v-img
            v-bind="props"
            gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
          />
        </template>
        <template
          class="app-bar--content d-flex"
        >
          <v-container class="fill-height">
            <v-row class="d-flex justify-lg-space-between align-self-end">
              <v-col class="d-flex flex-row">
                <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
                <router-link
                  class="title-link d-flex align-center"
                  to="/"
                >
                  <h1>Weekness for food</h1>
                </router-link>
              </v-col>
              <v-col class="col-2 pa-0 d-flex flex-row justify-center align-center">
                <v-app-bar-nav-icon class="ml-3">
                  <router-link
                    to="/shopping-cart"
                    v-slot="{ href, route, navigate }"
                  >
                    <v-btn
                      v-if="!isShoppingCartRoute"
                      icon
                      outlined
                      :href="href"
                      @click="navigate"
                    >
                      <template>
                        <v-icon
                          dark
                          large
                        >
                          mdi-cart
                        </v-icon>
                        <div class="cart-quantity">{{shoppingCart.length}}</div>
                      </template>
                    </v-btn>
                  </router-link>
                </v-app-bar-nav-icon>
              </v-col>
            </v-row>
          </v-container>
        </template>
      </v-app-bar>
      <v-navigation-drawer
        absolute
        temporary
        v-model="drawer"
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              Menu
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-list
          dense
          nav
        >
          <router-link to="/">
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item>
          </router-link>
          <router-link to="/shopping-cart">
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-cart</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Shopping Cart</v-list-item-title>
            </v-list-item>
          </router-link>
          <v-list-item
            link
            @click="clearCart"
          >
            <v-list-item-icon>
              <v-icon>mdi-cart-remove</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Empty Cart</v-list-item-title>
          </v-list-item>

          <router-link to="/recipe-form">
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-plus-thick</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Add a recipe</v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link to="/categories">
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-format-list-bulleted</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Categories</v-list-item-title>
            </v-list-item>
          </router-link>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <div
          id="main"
          ref="main"
          class="overflow-y-auto pb-10"
          :class="$vuetify.breakpoint.smAndDown ? 'sm' : ''"
        >
          <router-view :loadingData="loadingData" />
        </div>
      </v-main>
      <v-footer
        fixed
        padless
        class="d-flex justify-end"
        color="transparent"
        v-if="isHomeRoute"
      >
        <v-btn
          fab
          small
          class="mr-8 mb-8 grey lighten-3"
          @click="scrollToTop"
        >
          <v-icon large>mdi-chevron-up</v-icon>
        </v-btn>
      </v-footer>
    </div>
  </v-app>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'App',
  data () {
    return {
      loadingData: false,
      drawer: false
    }
  },
  computed: {
    ...mapState(['shoppingCart']),
    isShoppingCartRoute () {
      return this.$route.path === '/shopping-cart'
    },
    isHomeRoute() {
      return this.$route.path === '/'
    }
  },
  methods: {
    ...mapActions([
      'fetchRecipes',
      'clearCart'
    ]),
    scrollToTop () {
      this.$refs.main.scrollTop = 0
    }
  },
  created () {
    this.loadingData = true
    this.fetchRecipes().finally(() => {
      this.loadingData = false
    })
  }
};
</script>

<style>
#app a {
  text-decoration: none;
  color: inherit;
}
</style>

<style scoped lang="scss">
@import '~vuetify/src/styles/settings/_variables';
#main {
  max-height: 100vh;
  padding-bottom: 10px;
  padding-top: 400px;
  &.sm {
    padding-top: 200px;
  }
}

.title-link h1{
  font-size: 1em;
}

.app-bar--content {
  height: 100%;
}
.nav-to-top {
  text-decoration: none;
  color: inherit;
}

.cart-quantity {
  position: absolute;
  right: 0;
  bottom: 0;
  border-radius: 100%;
  background-color: red;
  font-size: 1em;
}
</style>
