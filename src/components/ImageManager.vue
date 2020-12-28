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
          Upload
        </v-btn>
      </v-col>
    </v-row>
    <v-row
      v-for="image in value.recipeImages || []"
      :key="image"
      class="d-flex child-flex"
    >
      <v-img
        :src="image"
        lazy-src="https://picsum.photos/10/10"
        :max-width="widths[image]"
        :max-height="heights[image]"
        class="grey lighten-2 ma-2"
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
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Vue from 'vue'

export default {
  name: 'ImageManager',
  props: ['value', 'id'],
  data () {
    return {
      filesToUpload: [],
      uploadingImages: false,
      widths: {},
      heights: {}
    }
  },
  computed: {
    ...mapGetters(['imagesByRecipe']),
    imageUrls () {
      return this.imagesByRecipe(this.id)
    },
    recipeImages () {
      return this.value.recipeImages
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
    getImageSize(imageSrc) {
      const img = new Image()
      img.onload = () => {
        Vue.set(this.widths, imageSrc, img.width)
        Vue.set(this.heights, imageSrc, img.height)
      }
      img.src = imageSrc
    }
  },
  watch: {
    recipeImages: {
      handler (imageUrls) {
        imageUrls.forEach(imageUrl => {
          if (this.widths[imageUrl]) {
            return
          }
          this.getImageSize(imageUrl)
        })
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>
