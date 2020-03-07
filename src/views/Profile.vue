<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <!--Side Bar-->
        <div class="column is-3">
          <aside class="menu is-hidden-mobile">
            <p class="menu-label">General</p>
            <ul class="menu-list">
              <li>
                <a :class="getClass(0)" @click="currentPage = 0">Profile</a>
              </li>
              <li>
                <a :class="getClass(1)" @click="currentPage = 1">My Devices</a>
              </li>
              <li>
                <a :class="getClass(2)" @click="currentPage = 2">Register New Device</a>
              </li>
              <li>
                <a :class="getClass(3)" @click="currentPage = 3">Favourite Widgets</a>
              </li>
              <li>
                <a :class="getClass(4)" @click="currentPage = 4">Settings</a>
              </li>
            </ul>
            <p v-if="isDeveloper" class="menu-label">Developer</p>
            <ul v-if="isDeveloper" class="menu-list">
              <li>
                <a :class="getClass(5)" @click="currentPage = 5">Dashboard</a>
              </li>
              <li>
                <a :class="getClass(6)" @click="currentPage = 6">My Widgets</a>
              </li>
              <li>
                <a :class="getClass(7)" @click="currentPage = 7">Upload New Widget</a>
              </li>
            </ul>
          </aside>
        </div>
        <!-- Content -->

        <MyDevices v-if="isActive(1)"></MyDevices>
        <RegisterDevice v-else-if="isActive(2)"></RegisterDevice>
        <FavouriteWidgets v-else-if="isActive(3)"></FavouriteWidgets>
        <Settings v-else-if="isActive(4)"></Settings>
        <Dashboard v-else-if="isActive(5)"></Dashboard>
        <MyWidgets v-else-if="isActive(6)"></MyWidgets>
        <UploadWidget v-else-if="isActive(7)"></UploadWidget>

        <div v-else class="column is-9">
          <section class="hero is-info welcome is-small">
            <div class="hero-body">
              <div class="container">
                <div class="columns">
                  <div class="column">
                    <h1 class="title">Hello, {{$store.state.user.username}}</h1>
                    <h2 class="subtitle">I hope you are having a great day!</h2>
                  </div>
                  <button class="button is-warning" @click="refresh()">
                    <b-icon icon="sync-alt"></b-icon>
                  </button>
                </div>
              </div>
            </div>
          </section>
          <br />

          <div class="columns">
            <div class="column">
              <h1 class="title">Device Status</h1>
            </div>
            <div class="column flex-right">
              <a @click="currentPage = 1" class="title is-6 is-blue">See all devices</a>
            </div>
          </div>
          <h2 v-if="$store.state.user.devices.length == 0">
            Oops. It looks like you have no devices registered. Register one
            <a
              @click="currentPage = 2"
            >here</a>.
          </h2>
          <section v-else class="info-tiles">
            <div class="tile is-ancestor has-text-centered">
              <router-link
                :to="'/device/' + device"
                class="tile is-parent"
                v-for="device in $store.state.user.devices.slice(0, 3)"
                :key="device"
              >
                <article class="tile is-child box">
                  <p class="title is-4">{{device}}</p>
                  <p class="subtitle is-6">Online</p>
                </article>
              </router-link>
            </div>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue"
import axios from "axios"
import Component from "vue-class-component"
import WidgetCard from "@/components/WidgetCard.vue"
import DeviceCard from "@/components/DeviceCard.vue"
// Pages
import MyDevices from "@/views/ProfileViews/MyDevices.vue"
import RegisterDevice from "@/views/ProfileViews/RegisterDevice.vue"
import FavouriteWidgets from "@/views/ProfileViews/FavoriteWidgets.vue"
import Settings from "@/views/ProfileViews/Settings.vue"
import Dashboard from "@/views/ProfileViews/Dashboard.vue"
import UploadWidget from "@/views/ProfileViews/UploadWidget.vue"
import MyWidgets from "@/views/ProfileViews/MyWidgets.vue"

import { UserTags, IDevice } from "@/common/Types"
import store from "../store"
import router from "../router"
@Component({
  components: {
    WidgetCard,
    DeviceCard,
    MyDevices,
    RegisterDevice,
    FavouriteWidgets,
    Dashboard,
    UploadWidget,
    MyWidgets,
    Settings,
  },
})
export default class Profile extends Vue {
  public editMode: boolean = false
  public editText: string = "Edit"
  public currentPage: number = 0
  private currentUserURL = process.env.VUE_APP_HAR + "currentUser"

  get dashboardURL() {
    return "/dashboard/" + store.state.user.username
  }

  get createDeviceURL() {
    return "/registerDevice"
  }

  get widgets() {
    return store.state.widgets
  }

  get devices() {
    return store.state.user.devices ?? []
    //return [
    //{
    //_id: "deviceid",
    //name: "My First Mirror",
    //config: {
    //location: "Upstairs Bathroom",
    //},
    //connection: {
    //address: "192.168.0.1",
    //authToken: "Some Token",
    //},
    //deviceWidgets: [
    //{
    //widgetId: "mira_clock",
    //config: {
    //latitude: "43.6532",
    //longitude: "79.3832",
    //},
    //},
    //],
    //},
    //]
  }

  get isDeveloper() {
    return store.state.user.tags.includes(UserTags.DEVELOPER)
  }

  getClass(page: Number) {
    return this.isActive(page) ? "is-active" : ""
  }

  isActive(page: Number) {
    return page == this.currentPage
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

  logout() {
    store.commit("logout")
    router.push("/")
  }
}
</script>

<style lang="stylus" scoped>
div >>> .is-blue {
  color: #276cda;
}
</style>
