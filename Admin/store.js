import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
 
  state: {
    currency:"",
    adAccount:{},
    defaults:{},
  },

  mutations: {
    SET_CURRENCY: (state,c) => {
      state.currency = c
    },
    SET_ADACCOUNT: (state,c) => {
      state.adAccount = c
    },
    SET_DEFAULT_SETTING: (state,c) => {
      state.defaults = c
    },
  },
  
})
