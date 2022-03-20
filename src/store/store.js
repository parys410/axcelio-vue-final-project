import { createStore } from "vuex";
export const store = createStore({
  state() {
    return {
      bootcampList: [],
    };
  },
  mutations: {
    setBootcampList(state, payload) {
      state.bootcampList = payload;
    },
  },
  getters: {
    getBootcampList(state) {
      return state.bootcampList;
    },
  },
});
