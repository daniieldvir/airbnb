import { stayService } from '../services/stay.service.js';

export const stayStore = {
  strict: true,
  state: {
    stays: null,
    filterBy: { city: '', guests: '' },
  },
  //   getters: {
  //     filterBy(state) {
  //       return state.filterBy;
  //     },
  // staysToShow(state){

  // }
  //   },
  mutations: {
    setFilter(state, { filterBy }) {
      state.filterBy = filterBy;
    },
    setStays(state, { stays }) {
      state.stays = stays;
      console.log('stays', state.stays);
    },
  },
  actions: {
    loadStays({ commit }) {
      stayService.query().then((stays) => commit({ type: 'setStays', stays }));
    },
    // async loadStays(context, { filterBy }) {
    //     try {
    //       const stays = await stayService.query();
    //       context.commit({ type: 'setStay', stays });
    //     } catch (err) {
    //       console.log('stayService: Error in loading stays', err);
    //       throw err;
    //     }
    // },
  },
  modules: {},
};
