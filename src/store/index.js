import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 1,
    CategorySelected: ''
  },
  mutations: {
    changeCategory(state, Category) {
      state.CategorySelected = Category
      console.log(state.CategorySelected)
    }
  },
  actions: {},
  modules: {}
})
