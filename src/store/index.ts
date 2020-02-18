import Vue from "vue"
import Vuex from "vuex"
import VuexPersistence from "vuex-persist"

Vue.use(Vuex)

export interface User {
  username: string
  id: string
}

export interface State {
  authenticated: boolean
  user: User
}

const vuexLocal = new VuexPersistence<State>({
  storage: window.localStorage,
})

export default new Vuex.Store<State>({
  mutations: {
    login(state: State, user: User) {
      state.user = user
      state.authenticated = true
    },
    logout(state: State) {
      state.user = { username: "", id: "" }
      state.authenticated = false
    },
  },
  actions: {},
  plugins: [vuexLocal.plugin],
})
