<template>
  <div class="column is-9">
    <section class="hero is-info welcome is-small">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column">
              <h1 class="title">My Devices</h1>
            </div>
            <button class="button is-warning" @click="refresh()">
              <b-icon icon="sync-alt"></b-icon>
            </button>
          </div>
        </div>
      </div>
    </section>
    <br />

    <h1 class="title">All Devices</h1>
    <h2 v-show="$store.state.user.devices.length == 0">
      Oops. It looks like you have no devices registered. Register one
      <a
        @click="$parent.currentPage = 2"
      >here</a>.
    </h2>
    <section class="info-tiles">
      <div class="tile has-text-centered wrap">
        <DeviceCard
          v-for="device in $store.state.user.devices.slice(0, 3)"
          :key="device"
          :device="device"
        ></DeviceCard>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import axios from "axios"
import Component from "vue-class-component"
import WidgetCard from "@/components/WidgetCard.vue"
import DeviceCard from "@/components/DeviceCard.vue"
import { UserTags, IDevice } from "@/common/Types"
import store from "@/store"
import router from "@/router"
@Component({
  components: {
    WidgetCard,
    DeviceCard,
  },
})
export default class MyDevices extends Vue {
  private currentUserURL = process.env.VUE_APP_HAR + "currentUser"
  get devices() {
    return store.state.user.devices
  }
  get deviceStatuses() {
    return store.state.deviceStatuses ?? []
  }
  refresh() {
    axios
      .get(this.currentUserURL, { withCredentials: true })
      .then(response => {
        let user: IUser = response.data.user
        store.commit("login", user)
        this.$forceUpdate()
      })
      .catch(error => {
        this.$forceUpdate()
      })
  }
}
</script>
