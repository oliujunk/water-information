import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: '',
  },
  mutations: {
    username(state, payload) {
      state.username = payload.username;
    },
  },
  actions: {
  },
  modules: {
  },
});
