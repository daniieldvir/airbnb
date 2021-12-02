import { stayService } from '../services/stay.service.js';

export const stayStore = {
  strict: true,
  state: {
    stays: [],
    filterBy: {
      city: '',
      guests: '',
      dates: [],
      guests: { adults: 0, children: 0, infants: 0, pets: 0 },
      totalGuests: 0,
    },
    currStay: null,
  },
  getters: {
    filterBy(state) {
      return state.filterBy;
    },
    staysToShow(state) {
      return state.stays;
    },
    // currStay(state) {
    //   return state.currStay;
    // },
    imgsToShow(state) {
      return state.currStay.imgUrls.slice(0, 5);
    },
  },
  mutations: {
    setFilter(state, { filterBy }) {
      state.filterBy = filterBy;
      console.log(state.filterBy);
    },
    setStays(state, { stays }) {
      state.stays = stays;
    },
    setStay(state, { stay }) {
      state.currStay = stay;
    },
  },
  actions: {
    loadStays({ commit, state }) {
      stayService.query(state.filterBy).then((stays) => {
        commit({ type: 'setStays', stays });
        // console.log('stay', stays);
      });
    },
    setFilter({ commit, dispatch }, { filterBy }) {
      commit({ type: 'setFilter', filterBy });
      dispatch({ type: 'loadStays' });
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
        commit({ type: 'setStay', stay });
        console.log('stay', stay);
        return stay;
      });
    },
  },
  modules: {},
};
