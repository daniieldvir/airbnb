import { stayService } from '../services/stay.service.js';

export const stayStore = {
  strict: true,
  state: {
    stays: null,
    filterBy: { city: '', guests: '' },
    currStay: null
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
    setStay(state, { stay }) {
      state.currStay = stay
    },
  },
  actions: {
    loadStays({ commit }) {
      stayService.query().then((stays) => commit({ type: 'setStays', stays }));
    },
    // loadStays({ commit, state }) {
    //   var filterBy = state.filterBy ? state.filterBy : ''
    //   commit({ type: 'setLoading', isLoading: true })
    //   stayService
    //     .query(filterBy)
    //     .then((stays) => {
    //       commit({ type: 'setStays', stays })
    //     })
    //     .finally(() => {
    //       commit({ type: 'setLoading', isLoading: false })
    //     })
    // },
    getStayById({ commit }, { stayId }) {
      return stayService.getById(stayId).then((stay) => {
        commit({ type: 'setStay', stay })
        return stay
      })
    },
  },
  modules: {},
};
