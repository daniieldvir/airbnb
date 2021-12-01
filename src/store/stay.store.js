import { stayService } from "../services/stay.service.js";

export const stayStore = {
  strict: true,
  state: {
    stays: null,
    filterBy: { city: "", guests: "" },
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
      console.log("stays mutation", stays);
      state.stays = stays;
    },
  },
  actions: {
    loadStays(context, { filterBy }) {
      const stays = stayService
        .query()
        .then(context.commit({ type: "setStays", stays }));

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
};
