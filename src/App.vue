<template>
  <v-app id="app">
    <div class="overflow-y-hidden">
      <v-app-bar
        absolute
        dark
        fade-img-on-scroll
        shrink-on-scroll
        color="rgba(25,32,72,.7)"
        height="400"
        min-height="80"
        src="https://picsum.photos/1920/1080?random"
        scroll-target="#main"
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
              <v-col>
                <router-link
                  class="title-link"
                  to="/"
                >
                  <h1>Weakness  for food</h1>
                </router-link>
              </v-col>
              <v-col class="col-1 pa-0">
                <v-app-bar-nav-icon>
                  <router-link
                    to="/recipe-form"
                    v-slot="{ href, route, navigate }"
                  >
                    <v-btn
                      v-if="!isCreateRecipeRoute"
                      icon
                      outlined
                      :href="href"
                      @click="navigate"
                    >
                      <v-icon
                        dark
                        large
                      >
                        mdi-plus-thick
                      </v-icon>
                    </v-btn>
                  </router-link>
                </v-app-bar-nav-icon>
              </v-col>
            </v-row>
          </v-container>
        </template>
      </v-app-bar>
      <v-main>
        <div
          id="main"
          class="overflow-y-auto"
        >
          <router-view :loadingData="loadingData" />
        </div>
      </v-main>
    </div>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'App',
  data () {
    return {
      loadingData: false
    }
  },
  computed: {
    isCreateRecipeRoute() {
      return this.$route.path === '/recipe-form'
    }
  },
  methods: {
    ...mapActions([
      'fetchRecipes'
    ])
  },
  created () {
    this.loadingData = true
    this.fetchRecipes().finally(() => {
      this.loadingData = false
    })
  }
};
</script>
<style scoped lang="scss">
#main {
  max-height: 100vh;
  padding-top: 400px;
}
.title-link {
  color: white;
  text-decoration: none;
  h1 {
    font-size: 1em;
  }
}

.app-bar--content {
  height: 100%;
}
</style>
