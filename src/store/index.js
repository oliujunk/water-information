import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: '',
    collapse: false,
    dataRefresh: false,
    userId: 0,
    currentDeviceId: '',
    currentDeviceType: 0,
    deviceList: [],
    elementInfo: [],
    relayInfo: [],
    deviceInfo: {},
    language: 'zh_CN',
    searchKeyword: '',
  },
  mutations: {
    username(state, payload) {
      state.username = payload.username;
    },
    language(state, payload) {
      state.language = payload.language;
    },
    collapse(state) { // 改变收缩状态
      state.collapse = !state.collapse;
    },
    deviceList(state, payload) {
      state.deviceList = payload.deviceList;
    },
    elementInfo(state, payload) {
      state.elementInfo = payload.elementInfo;
    },
    relayInfo(state, payload) {
      state.relayInfo = payload.relayInfo;
    },
    deviceInfo(state, payload) {
      state.deviceInfo = payload.deviceInfo;
    },
    currentDeviceId(state, payload) {
      state.currentDeviceId = payload.currentDeviceId;
    },
    currentDeviceType(state, payload) {
      state.currentDeviceType = payload.currentDeviceType;
    },
    userId(state, payload) {
      state.userId = payload.userId;
    },
    dataRefresh(state, payload) {
      state.dataRefresh = payload.dataRefresh;
    },
  },
  actions: {
  },
  modules: {
  },
});
