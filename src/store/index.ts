import Vue from "vue"
import Vuex from "vuex"
import { IUser, IWidget } from "@/common/Types"
import VuexPersistence from "vuex-persist"

Vue.use(Vuex)

export interface State {
  authenticated: boolean
  user: IUser
  widgets: IWidget[]
}

const vuexLocal = new VuexPersistence<State>({
  storage: window.localStorage,
})

export default new Vuex.Store<State>({
  mutations: {
    login(state: State, user: IUser) {
      state.user = user
      state.authenticated = true
    },
    logout(state: State) {
      state.user = {
        username: "",
        email: "",
        tags: [],
        hash: "",
        devices: [],
        favorites: [],
      }
      state.authenticated = false
      state.widgets = []
    },
    saveWidget(state: State, widget: IWidget) {
      if (!state.user.favorites) {
        state.user.favorites = [widget._id]
        state.widgets = [widget]
      } else {
        state.user.favorites.push(widget._id)
        state.widgets.push(widget)
      }
    },
    removeWidget(state: State, widget: IWidget) {
      state.user.favorites = state.user.favorites.filter(w => w != widget._id)
      state.widgets = state.widgets.filter(w => w._id != widget._id)
    },
  },
  actions: {},
  plugins: [vuexLocal.plugin],
})
