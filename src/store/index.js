import Vue from 'vue';
import Vuex from 'vuex';

import { userStore } from './user.store.js';
import { reviewStore } from './review.store.js';
import { stayStore } from './stay.store.js';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    userStore,
    reviewStore,
    stayStore,
  },
});
