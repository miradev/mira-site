import Vue from "vue"
import Vuex from "vuex"
import { IUser, IWidget, IDevice } from "@/common/Types"
import VuexPersistence from "vuex-persist"

Vue.use(Vuex)

export interface State {
  authenticated: boolean
  user: IUser
  widgets: IWidget[]
  devices: DeviceMap
  deviceStatuses: {}
  qr: string
}

export enum ConnectionStatus {
  Connected = 1,
  Disconnected,
  Uninitialized,
}

export interface DeviceStatus {
  id: string
  status: ConnectionStatus
}

export interface DeviceMap {
  [key: string]: IDevice
}

const vuexLocal = new VuexPersistence<State>({
  storage: window.localStorage,
})

export default new Vuex.Store<State>({
  mutations: {
    setDevice(state: State, device: IDevice) {
      if (!state.devices) {
        state.devices = {}
      }
      state.devices[device._id] = device
    },
    setDeviceStatus(state: State, deviceStatus: DeviceStatus) {
      state.deviceStatuses[deviceStatus.id] = deviceStatus
    },
    login(state: State, user: IUser) {
      state.user = user
      state.authenticated = true
    },
    setQR(state: State, qr: string) {
      state.qr = qr
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
      state.deviceStatuses = {}
      state.qr = ""
      state.devices = {}
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
      state.user.favorites = state.user.favorites.filter(w => w != null && w != widget._id)
      state.widgets = state.widgets.filter(w => w != null && w._id != widget._id)
    },
  },
  actions: {},
  plugins: [vuexLocal.plugin],
})
