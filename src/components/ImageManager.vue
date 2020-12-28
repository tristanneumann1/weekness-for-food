<template>
  <v-container>
    <v-row>
      <v-col>
        <v-file-input
          v-model="filesToUpload"
          chips
          multiple
          show-size
          label="Upload some images"
          :loading="uploadingImages"
          :disabled="uploadingImages"
        />
      </v-col>
      <v-col class="col-auto">
        <v-btn color="accent" @click="uploadImages">
          Save
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="image in value.recipeImages || []"
        :key="image"
        class="d-flex child-flex"
        cols="4"
      >
        <v-img
          :src="image"
          lazy-src="https://picsum.photos/10/10"
          aspect-ratio="1"
          contain
          class="grey lighten-2"
        >
          <template v-slot:placeholder>
            <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
            >
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ImageManager',
  props: ['value', 'id'],
  data () {
    return {
      filesToUpload: [],
      uploadingImages: false
    }
  },
  computed: {
    ...mapGetters(['imagesByRecipe']),
    imageUrls () {
      return this.imagesByRecipe(this.id)
    }
  },
  methods: {
    ...mapActions(['uploadFile']),
    uploadImages () {
      this.uploadingImages = true
      return Promise.all(this.filesToUpload.map(image => this.uploadFile({ file: image, id: this.id }))).finally(() => {
        this.uploadingImages = false
        this.filesToUpload = []
        this.value.recipeImages = this.imageUrls
      })
    },
  }
}
</script>

<style scoped>

</style>
