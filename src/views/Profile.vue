<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <!--Side Bar-->
        <div class="column is-3">
          <b-collapse
            aria-id="contentIdForA11y2"
            class="panel"
            animation="slide"
            :open.sync="isOpen"
          >
            <div
              slot="trigger"
              class="is-hidden-tablet is-trigger flex-center"
              role="button"
              aria-controls="contentIdForA11y2"
            >
              <b-icon :icon="isOpen ? 'caret-up' : 'caret-down'"></b-icon>
            </div>
            <aside class="menu">
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
          </b-collapse>
        </div>
        <!-- Content -->

        <MyDevices v-if="isActive(1)"></MyDevices>
        <RegisterDevice v-else-if="isActive(2)" :identifer="qr"></RegisterDevice>
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

          <div class="container">
            <div class="columns">
              <div class="column">
                <h1 class="title">My Devices</h1>
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
              <div class="tile has-text-centered">
                <DeviceCard
                  v-for="device in $store.state.user.devices.slice(0, 3)"
                  :key="device"
                  :device="device"
                ></DeviceCard>
              </div>
            </section>
          </div>
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

import { IUser, UserTags, IDevice } from "@/common/Types"
import store from "../store"
import router from "../router"
import * as Utility from "@/common/utility"

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
  public isOpen: boolean = true
  public currentPage: number = 0
  public windowWidth: number = window.innerWidth
  private currentUserURL = process.env.VUE_APP_HAR + "currentUser"

  mounted() {
    try {
      Utility.getStatus()
      for (let deviceId of this.devices) {
        Utility.getDevice(deviceId)
      }
      this.currentPage = parseInt(this.$route.params.page)
    } catch (error) {
      console.log(error)
    }
    window.addEventListener("resize", this.handleResize)
  }

  public handleResize() {
    if (window.innerWidth > 768) {
      this.isOpen = true
    }
  }

  public beforeDestroy() {
    window.removeEventListener("resize", this.handleResize)
  }

  get dashboardURL() {
    return "/dashboard/" + store.state.user.username
  }

  get createDeviceURL() {
    return "/registerDevice"
  }

  get qr() {
    return store.state.qr ?? ""
  }

  get widgets() {
    return store.state.widgets
  }

  get devices() {
    return store.state.user.devices ?? []
  }

  get deviceStatuses() {
    return store.state.deviceStatuses ?? []
  }

  get isDeveloper() {
    return store.state.user.tags.includes(UserTags.DEVELOPER)
  }

  getClass(page: number) {
    return this.isActive(page) ? "is-active" : ""
  }

  isActive(page: number) {
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

.panel >>> .is-trigger {
  background-color: #eee;
  border: 1px solid #bbb;
}
</style>
