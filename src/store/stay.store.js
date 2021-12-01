import Vue from 'vue';
import Vuex from 'vuex';

import { stayService } from '../services/stay.service.js';

Vue.use(Vuex);

export const store = new Vuex.Store({
  strict: true,
  state: {
    stays: null,
    filterBy: { city: '', guests: '' },
  },
  getters: {
    filterBy(state) {
      console.log('store', state.filterBy);
      return state.filterBy;
    },
    // staysToShow(state){

    // }
  },
  mutations: {
    setFilter(state, { filterBy }) {
      console.log('store', filterBy);
      state.filterBy = filterBy;
      //   state.stays=
    },
  },
  actions: {
    loadStays({ commit }, { filterBy }) {},
  },
  modules: {},
});
