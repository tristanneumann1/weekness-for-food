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
        src="https://picsum.photos/1920/1080?random"
        scroll-target="#main"
      >
        <template v-slot:img="{ props }">
          <v-img
            v-bind="props"
            gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
          />
        </template>
        <div
          class="app-bar--content"
        >
          <router-link
            class="title-link"
            to="/"
          >
            <h1>Test Test Test</h1>
          </router-link>
          <v-app-bar-nav-icon
            class="app-bar-actions"
          >
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
        </div>
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
  align-self: flex-end;
  text-decoration: none;
  h1 {
    font-size: 1em;
  }
}

.app-bar--content {
  display: flex;
  height: 100%;
}

.app-bar-actions {
  position: absolute;
  margin: 1em;
  right: 0;
  bottom: 0;
}
</style>
