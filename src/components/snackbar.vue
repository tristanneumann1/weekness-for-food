<template>
  <span>
    <v-snackbar
      :value="snackBar"
      :color="color"
    >
      <template>
        <v-icon v-if="snackBar && snackBar.icon">{{ snackBar.icon }}</v-icon>
        {{ snackBar ? snackBar.message : '' }}
      </template>
    </v-snackbar>
  </span>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'snackbar',
  computed: {
    ...mapState(['snackBar']),
    color () {
      if (this.snackBar) {
        return this.snackBar.type
      }
      return ''
    }
  }
}
</script>

<style scoped>

</style>
