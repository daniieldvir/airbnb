import Vue from 'vue';
import Vuex from 'vuex';

import { stayService } from '../services/stay.service.js';

Vue.use(Vuex);

export const stayStore = new Vuex.Store({
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
    setStay(state, { stays }) {
      state.stays = stays;
      console.log('stays', stays);
    },
  },
  actions: {
    loadStays(context, { filterBy }) {
      const stays = stayService.query();
      context.commit({ type: 'setStay', stays });

      //   try {
      //     const stays = await stayService.query();
      //     context.commit({ type: 'setStay', stays });
      //   } catch (err) {
      //     console.log('stayService: Error in loading stays', err);
      //     throw err;
      //   }
    },
  },
  modules: {},
});
