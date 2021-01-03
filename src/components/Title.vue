<template>
  <v-col class="d-flex align-center">
    <router-link
      v-if="backArrow"
      to="/"
      v-slot="{ href, route, navigate }"
    >
      <v-btn
        fab
        color="primary"
        class="ma-2 mr-4"
        :href="href"
        @click="navigate"
      >
        <v-icon
          dark
          large
        >
          mdi-arrow-left-thick
        </v-icon>
      </v-btn>
    </router-link>
    <h2>{{title}}</h2>
  </v-col>
</template>

<script>
export default {
  name: 'Title',
  props: {
    title: {
      type: String,
      required: true
    },
    backArrow: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>

</style>
