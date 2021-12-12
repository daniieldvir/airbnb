import { stayService } from '../services/stay.service.new.js';

export const stayStore = {
  strict: true,
  state: {
    stays: [],
    hostStays: [],
    filterBy: {
      hostId: '',
      city: '',
      guests: '',
      dates: {
        checkInDate: '',
        checkOutDate: '',
      },
      guests: { adults: 0, children: 0, infants: 0, pets: 0 },
      totalGuests: 0,
      priceRange: [15, 850],
      amenities: [],
      propertyType: '',
    },
    currStay: null,
    isLoading: false,
  },
  getters: {
    filterBy(state) {
      // console.log('store filter', state.filterBy);
      return state.filterBy;
    },
    staysToShow(state) {
      console.log('stays to show fron store', state.stays);
      return state.stays;
    },
    avgPrice(state) {
      return state.stays.reduce((acc, stay) => {
        (acc + stay.price) / state.stays.length;
      });
    },
    imgsToShow(state) {
      return state.currStay.imgUrls.slice(0, 5);
    },
    hostStays(state) {
      return state.hostStays;
    },
    isLoading({ isLoading }) { return isLoading },
  },
  mutations: {
    setLoading(state, { isLoading }) {
      state.isLoading = isLoading;
    },
    setFilter(state, { filterBy }) {
      state.filterBy = filterBy;
      // console.log('filter state', state.filterBy);
    },
    setStays(state, { stays }) {
      state.stays = stays;
      // console.log('stays', stays);
    },
    setStay(state, { stay }) {
      state.currStay = stay;
    },
    updateStay(state, { stay }) {
      console.log('state in store of stay', stay)
      const idx = state.stays.findIndex((stay1) => stay1._id === stay._id)
      console.log('stays in state in update stay', state.stays);
      console.log('idx', idx)
      state.stays.splice(idx, 1, stay)
    },
    clearAllFilters(state) {
      state.filterBy = {
        hostId: '',
        city: '',
        guests: '',
        dates: {
          checkInDate: '',
          checkOutDate: '',
        },
        guests: { adults: 0, children: 0, infants: 0, pets: 0 },
        totalGuests: 0,
        priceRange: [15, 850],
        amenities: [],
        propertyType: '',
      };
    },
    setHostStays(state, { hostStays }) {
      state.hostStays = hostStays;
    },
  },
  actions: {
    async loadStays({ commit, state }) {
      console.log('store: state.filterBy', state.filterBy);
      commit({ type: 'setLoading', isLoading: true });
      try {
        // const stays = await stayService.query();
        const stays = await stayService.query(state.filterBy);
        commit({ type: 'setStays', stays });
        // console.log('stay', stays);
      } catch (err) {
        console.log('stayStore: Error in loadStays', err);
        throw err;
      } finally {
        commit({ type: 'setLoading', isLoading: false });
      }
    },
    async loadHostStays({ commit }, { hostId }) {
      try {
        console.log('store hostId', hostId);
        const hostStays = await stayService.getHostStays(hostId);
        console.log('hostStays', hostStays);
        commit({ type: 'setHostStays', hostStays });
      } catch (err) {
        console.log('stayStore: Error in loadHostStays', err);
      }
    },
    setFilter({ commit, dispatch }, { filterBy }) {
      console.log('store set filter', filterBy);
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
    async getStayById({ commit }, { stayId }) {
      try {
        const stay = await stayService.getById(stayId);
        console.log('stay store: stay by id ', stay);
        commit({ type: 'setStay', stay });
        return stay;
      } catch (err) {
        console.log('stayStore: Error in get stay', err);
        throw err;
      }
    },
    async toggleLikedStay({ commit, rootGetters }, { stayId }) {
      try {
        const stay = await stayService.getById(stayId);
        console.log('rootGetters.loggedInUser._id', rootGetters.loggedInUser._id);
        const idxLikedBy = stay.likedByUsers.findIndex((userId) =>
          userId === rootGetters.loggedInUser._id)
        if (idxLikedBy < 0) stay.likedByUsers.push(rootGetters.loggedInUser._id);
        else stay.likedByUsers.splice(idxLikedBy, 1);
        const updatedStay = await stayService.save(stay);
        console.log('stay store updatedStay', updatedStay);
        commit({ type: 'updateStay', stay: updatedStay })
      } catch (err) {
        console.log('stay Store: Error in toggling wishList', err)
        throw err
      }
    }
  },
  modules: {},
};
