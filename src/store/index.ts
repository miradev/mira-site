import Vue from "vue"
import Vuex from "vuex"
import { User } from "@/components/User"
import { Widget } from "@/components/Widget"
import VuexPersistence from "vuex-persist"

Vue.use(Vuex)

export interface State {
  authenticated: boolean
  user: User
  widgets: Widget[]
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
      state.user = {
        username: "",
        _id: "",
        email: "",
        tags: [],
        hash: "",
      }
      state.authenticated = false
      state.widgets = []
    },
    saveWidget(state: State, widget: Widget) {
      if (!state.widgets) {
        state.widgets = [widget]
      } else {
        state.widgets.push(widget)
      }
    },
    removeWidget(state: State, widget: Widget) {
      state.widgets = state.widgets.filter(w => w._id != widget._id)
    },
  },
  actions: {},
  plugins: [vuexLocal.plugin],
})
