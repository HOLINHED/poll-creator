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
        .then(data => state.setData(data))
        .catch(err => console.error(err));
    },
    pushData(state, data) {
      state.setData(data);
      fetch(`${config.API}/poll`, {
        method: 'POST',
        body: JSON.stringify(state.getters.data),
        headers: {
          'content-type': 'application/json'
        }
      })
      .then(res => { return res })
      .then(data => {
        state.changeID(data.id)
      })
      .catch(err => console.error(err))
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
