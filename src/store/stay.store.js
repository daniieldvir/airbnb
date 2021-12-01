import { stayService } from '../services/stay.service.js';

export const stayStore = {
  strict: true,
  state: {
    stays: [],
    filterBy: { city: '', guests: '' },
  },
  getters: {
    filterBy(state) {
      return state.filterBy;
    },
    staysToShow(state) {
      console.log(state.stays);
      return state.stays;
    },
  },
  mutations: {
    setFilter(state, { filterBy }) {
      state.filterBy = filterBy;
    },
    setStays(state, { stays }) {
      state.stays = stays;
      //   if (state.stays.length) {
      //     state.stays = [];
      //   }
      //   state.stays.push(...stays);
    },
  },
  actions: {
    loadStays({ commit, state }) {
      stayService.query(state.filterBy).then((stays) => {
        commit({ type: 'setStays', stays });
      });
    },
    setFilter({ commit, dispatch }, { filterBy }) {
      commit({ type: 'setFilter', filterBy });
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
