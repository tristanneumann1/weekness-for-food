<template>
  <v-container>
    <v-row class="d-flex justify-space-between">
      <h3>Ingredients</h3>
      <v-btn
        icon
        @click="addIngredient"
      >
        <v-icon>mdi-plus-circle-outline</v-icon>
      </v-btn>
    </v-row>
    <v-row class="d-flex justify-center" v-if="!value.length">
      <span>Add an ingredient to get started</span>
    </v-row>
    <v-row v-else>
      <draggable
        v-model="ingredients"
        class="draggable-box"
        handle=".handle"
      >
        <v-container
          v-for="(ingredient, idx) in ingredients"
          :key="idx"
        >
          <v-row>
            <v-col class="md-6 d-flex flex-row pa-0 pr-1">
              <v-icon class="handle">mdi-drag</v-icon>
              <v-combobox
                dense
                hide-details
                :items="ingredientsList"
                label="Name"
                v-model="ingredient.name"
              />
            </v-col>
            <v-col class="col-3 pa-0 pr-1">
              <v-text-field
                dense
                hide-details
                label="Quantity"
                type="number"
                v-model="ingredient.quantity"
              />
            </v-col>
            <v-col class="col-3 d-flex flex-row align-center pa-0">
              <v-text-field
                dense
                hide-details
                label="Unit"
                v-model="ingredient.unit"
              />
              <v-btn
                icon
                small
                @click="deleteIngredient(idx)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </draggable>
    </v-row>
  </v-container>
</template>

<script>
import Ingredient from '@/store/Ingredient'
import { mapGetters } from 'vuex'
import draggable from 'vuedraggable'

export default {
  name: 'IngredientSelector',
  components: {
    draggable
  },
  props: {
    value: {
      type: Array,
      default () { return [] }
    }
  },
  computed: {
    ...mapGetters(['ingredientsList']),
    ingredients: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    addIngredient () {
      this.value.push(new Ingredient({ name: '', quantity: 1, unit: '' }))
    },
    deleteIngredient (idx) {
      this.value.splice(idx, 1)
    }
  }
}
</script>

<style scoped>
  .draggable-box {
    width: 100%;
  }
</style>
