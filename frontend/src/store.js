import Vue from 'vue';
import Vuex from 'vuex';

import config from '@/config.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pollID: null,
    pollData: null,
  },
  mutations: {
    changeID(state, id) {
      state.pollID = id;
    },
    setData(state, data) {
      state.pollData = data;
    },
  },
  actions: {
    getData(state, id) {
      fetch(`${config.API}/poll/${id}`)
        .then(res => res.json())
        .then(data => state.pollData = data)
        .catch(err => console.error(err));
    },
    pushData(state, data) {

    },
  },
  getters: {
    ID(state) {
      return state.pollID;
    },
    data(state) {
      return state.pollData;
    },
  },
});
