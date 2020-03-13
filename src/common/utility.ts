import axios from "axios"
import store from "../store"

export function getDevice(id: string) {
  let url = process.env.VUE_APP_HAR + "users/" + store.state.user.username + "/devices/"
  axios
    .get(url + id, { withCredentials: true })
    .then(response => {
      const { device } = response.data
      console.log("Comitting" + device)
      store.commit("setDevice", device)
    })
    .catch(error => {
      console.log("getDevice: " + error)
    })
}

export function getStatus() {
  let url = process.env.VUE_APP_HAR + "users/" + store.state.user.username + "/devices"
  axios
    .get(url, { withCredentials: true })
    .then(response => {
      let deviceStatuses = response.data.devices
      for (let device of store.state.user.devices) {
        if (device in deviceStatuses) {
          store.commit("setDeviceStatus", { id: device, status: 1 })
        } else {
          store.commit("setDeviceStatus", { id: device, status: 3 })
        }
      }
    })
    .catch(error => {
      console.log("getStatusError: " + error)
    })
}

export function getDeviceName(id: string) {
  return store.state.devices[id]?.name ?? id
}
