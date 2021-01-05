import Vue from 'vue'
import Vuex from 'vuex'
import * as types from '@/store/mutation-types'
import state from '@/store/state'
import mutations from '@/store/mutations'
import actions from '@/store/actions'
import getters from '@/store/getters'

Vue.use(Vuex)

const store =  new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

store.subscribe((mutation, state) => {
  if ([types.ADD_TO_SHOPPING_CART, types.CHANGE_CART_ITEM_SERVING_SIZE, types.REMOVE_FROM_SHOPPING_CART, types.CLEAR_CART].includes(mutation.type)) {
    localStorage.setItem('shoppingCart', JSON.stringify(state.shoppingCart))
  }
})

export default store
