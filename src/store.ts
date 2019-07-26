import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: "",
    authenticated: false
  },
  mutations: {
    login(state, username){
      state.username = username;
      state.authenticated = true;
    },
    logout(state){
      state.username = ""
      state.authenticated = false;
    }
  },
  actions: {

  },
});
