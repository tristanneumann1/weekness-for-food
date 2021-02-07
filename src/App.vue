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
        src="https://firebasestorage.googleapis.com/v0/b/weakness-for-food.appspot.com/o/2880px-The_Last_Supper_-_Leonardo_Da_Vinci_-_High_Resolution_32x16.jpg?alt=media"
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
          <router-link
            to="/"
            v-slot="{ href, route, navigate }"
          >
            <v-list-item link
             :href="href"
             @click="goHome(navigate)"
            >
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Home</v-list-item-title>
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
          <component
            :is="user ? 'router-link' : 'span'"
            to="/recipe-form"
          >
            <v-list-item
              link
              :disabled="!user"
            >
              <v-list-item-icon>
                <v-icon :disabled="!user">mdi-plus-thick</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Add a recipe</v-list-item-title>
            </v-list-item>
          </component>
          <router-link to="/shopping-cart">
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-cart</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Shopping Cart</v-list-item-title>
            </v-list-item>
          </router-link>
          <v-list-group
            no-action
            color="error"
          >
            <template v-slot:activator>
              <v-list-item-subtitle>Empty Cart</v-list-item-subtitle>
            </template>
            <v-list-item link>
              <v-list-item-title @click="clearCart">Confirm empty cart</v-list-item-title>
            </v-list-item>
          </v-list-group>
          <v-divider />
          <v-list-item>
            <div id="firebaseui-auth-container"/>
            <div v-if="user">
              <span>
                Welcome
                {{user.displayName}}
              </span>
            </div>
          </v-list-item>
          <v-list-item v-if="user">
            <v-btn
              text
              color="error"
              @click="signOut"
            >Sign-out</v-btn>
          </v-list-item>
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
        class="d-flex justify-end footer"
        color="transparent"
      >
        <snackbar />
        <v-btn
          v-if="isHomeRoute"
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
import snackbar from '@/components/snackbar'
import { mapActions, mapState } from 'vuex'
import firebase from 'firebase/app';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

export default {
  name: 'App',
  components: {
    snackbar
  },
  data () {
    return {
      loadingData: false,
      drawer: false
    }
  },
  computed: {
    ...mapState(['shoppingCart', 'user']),
    isShoppingCartRoute () {
      return this.$route.path === '/shopping-cart'
    },
    isHomeRoute() {
      return this.$route.path === '/'
    }
  },
  methods: {
    ...mapActions([
      'signIn',
      'fetchRecipes',
      'clearCart',
      'updateSearchTerm',
      'categoryFilter'
    ]),
    scrollToTop () {
      this.$refs.main.scrollTop = 0
    },
    goHome (navigate) {
      Promise.all([
        this.updateSearchTerm(''),
        this.categoryFilter(null)
      ]).then(navigate)
    },
    setUpSignIn () {
      if (!this.ui) {
        this.ui = new firebaseui.auth.AuthUI(firebase.auth());
      }
      const successfulSignIn = (successResponse) => {
        this.signIn(successResponse.user)
        return false
      }

      // FirebaseUI config.
      const uiConfig = {
        signInFlow: 'popup',
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
          signInSuccessWithAuthResult: successfulSignIn
        }
      };
      // // The start method will wait until the DOM is loaded.
      this.ui.start('#firebaseui-auth-container', uiConfig);
    },
    signOut () {
      firebase.auth().signOut()
      this.signIn(null)
      this.setUpSignIn()
    }
  },
  created () {
    this.loadingData = true
    this.fetchRecipes().finally(() => {
      this.loadingData = false
    })
    // Initialize the FirebaseUI Widget using Firebase.
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.signIn(user)
      } else {
        this.setUpSignIn()
      }
    });
  }
};
</script>

<style>
#app a {
  text-decoration: none;
  color: inherit;
}

#app.theme--light {
  background-color: #f0f0f0;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
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
.footer {
  pointer-events: none;
  * {
    pointer-events: all;
  }
}
</style>
