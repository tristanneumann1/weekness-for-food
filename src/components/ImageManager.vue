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
        <v-btn color="accent" @click="saveUploadImages">
          Upload & Save
        </v-btn>
      </v-col>
    </v-row>
    <draggable
      :value="recipeImages"
      @input="updateRecipeImages"
    >
      <v-row
        v-for="imageSrc in value.recipeImages || []"
        class="d-flex child-flex justify-center ma-3 ma-md-0"
        :key="imageSrc"
      >
        <v-img
          :src="imageSrc"
          lazy-src="https://picsum.photos/10/10"
          :max-width="widths[imageSrc] || 10"
          :max-height="heights[imageSrc] || 10"
          class="grey lighten-2 ma-2"
        >
          <v-btn
            fab
            small
            color="error"
            class="float-right"
            @click="deleteImage(imageSrc)"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
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
    </draggable>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import draggable from 'vuedraggable'

export default {
  name: 'ImageManager',
  components: {
    draggable
  },
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
    uploadedImages () {
      return this.imagesByRecipe(this.id)
    },
    recipeImages () {
      return this.value.recipeImages
    }
  },
  methods: {
    ...mapActions(['uploadFile', 'clearUploadedFiles']),
    saveUploadImages () {
      this.uploadingImages = true
      return Promise.all(this.filesToUpload.map(image => this.uploadFile({ file: image, id: this.id }))).then(() => {

      }).finally(() => {
        this.uploadingImages = false
        this.$emit('update:recipeImages', [
          ...this.value.recipeImages,
          ...this.uploadedImages
        ], () => {
          this.$emit('save')
        })
        this.clearFiles()
      })
    },
    getImageSize(imageSrc) {
      const img = new Image()
      img.onload = () => {
        this.$set(this.widths, imageSrc, img.width)
        this.$set(this.heights, imageSrc, img.height)
      }
      img.src = imageSrc
    },
    deleteImage(imageSrc) {
      this.$delete(this.value.recipeImages, this.value.recipeImages.findIndex(recipeImageSrc => {
        return imageSrc === recipeImageSrc
      }))
    },
    clearFiles () {
      this.filesToUpload = []
      this.clearUploadedFiles(this.id)
    },
    updateRecipeImages (recipeImages) {
      this.$emit('update:recipeImages', recipeImages)
    }
  },
  watch: {
    recipeImages: {
      handler (imageSrcs) {
        imageSrcs.forEach(imageSrc => {
          if (this.widths[imageSrc]) {
            return
          }
          this.getImageSize(imageSrc)
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
