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
        .then(data => this.commit('setData', data))
        .catch(err => console.error(err));
    },
    pushData(state, data) {
      this.commit('setData', data);
      console.log('RAW',state.getters.data,'SERVER');
      fetch(`${config.API}/poll`, {
        method: 'POST',
        body: JSON.stringify(state.getters.data),
        headers: {
          'content-type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        this.commit('changeID', data.id || 0);
        console.log(data);
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
