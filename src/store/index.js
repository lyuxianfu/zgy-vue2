import Vue from "vue";
import Vuex from "vuex";
// import { ZStore } from "@/store/ZStore";

import zgy from "../../index";
console.log(zgy);

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    ZStore: zgy.ZStore,
  },
});
