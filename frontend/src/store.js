import Vue from 'vue';
import Vuex from 'vuex';

import config from '@/config.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pollID: undefined,
    pollData: undefined,
    API: config.API,
  },
  mutations: {
    id(state, id) {
      state.pollID = id;
    },
    data(state, data) {
      state.pollData = data;
    },
  },
  getters: {
    id(state) {
      return state.pollID;
    },
    data(state) {
      return state.pollData;
    },
    api(state) {
      return state.API;
    },
  },
});
