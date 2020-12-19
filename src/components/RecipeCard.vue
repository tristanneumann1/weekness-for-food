<template>
  <div>
    <v-card>
      <v-container class="py-0">
        <v-row class="title-container">
          <v-card-actions class="card-actions">
            <router-link
              :to="`/recipe-form/${id}`"
              v-slot="{ href, route, navigate }"
            >
              <v-btn
                icon
                x-small
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
          <v-img
            dark
            v-if="img"
            height="250"
            class="align-end"
            :src="img"
          >
            <v-card-title
              primary-title
              class="recipe-title"
            >
              <v-btn
                v-if="url"
                icon
                x-small
                class="mr-2"
                color="primary"
                target="_blank"
                :href="url"
              >
                <v-icon dark>
                  mdi-open-in-new
                </v-icon>
              </v-btn>
              {{ nameCapitalized }}
            </v-card-title>
          </v-img>
          <template v-else>
            <v-card-title
              primary-title
              class="recipe-title"
            >
              <v-btn
                v-if="url"
                icon
                x-small
                class="mr-2"
                color="primary"
                target="_blank"
                :href="url"
              >
                <v-icon dark>
                  mdi-open-in-new
                </v-icon>
              </v-btn>
              {{ nameCapitalized }}
            </v-card-title>
          </template>
        </v-row>
        <v-row>
          <v-col class="col-6">
            <span class="text-decoration-underline font-weight-bold">You own</span>
            <ul v-if="storedIngredients.length">
              <li
                v-for="ingredient in storedIngredients"
                :key="ingredient"
              >{{ingredient}}</li>
            </ul>
          </v-col>
          <v-col class="col-6 missing-ingredients">
            <span class="text-decoration-underline font-weight-bold">You need</span>
            <ul v-if="missingIngredients.length">
              <li
                v-for="ingredient in missingIngredients"
                :key="ingredient"
              >{{ingredient}}</li>
            </ul>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>
<script>

export default {
  name: 'RecipeCard',
  props: {
    id: String,
    name: String,
    img: String,
    url: String,
    missingIngredients: Array,
    storedIngredients: Array
  },
  computed: {
    nameCapitalized () {
      return this.name[0].toUpperCase() + this.name.slice(1)
    }
  }
};
</script>
<style scoped>
.title-container {
  background-color: lightblue;
}
.card-actions {
  position: absolute;
  right: 0;
}
.missing-ingredients {
  border-left: lightgray 1px solid;
  background-color: #e3e3e3;
}
.recipe-title {
  word-break: break-word;
}
</style>
