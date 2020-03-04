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
            <p class="menu-label">Developer</p>
            <ul class="menu-list">
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

        <div v-else class="column is-9">
          <section class="hero is-info welcome is-small">
            <div class="hero-body">
              <div class="container">
                <h1 class="title">Hello, {{$store.state.user.username}}</h1>
                <h2 class="subtitle">I hope you are having a great day!</h2>
              </div>
            </div>
          </section>
          <br />

          <h1 class="title">Device Status</h1>
          <h2 v-if="$store.state.user.devices.length == 0">
            Oops. It looks like you have no devices registered. Register one
            <router-link to="/registerDevice">here</router-link>.
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
                  <p class="title">{{device}}</p>
                  <p class="subtitle">Online</p>
                </article>
              </router-link>
              <a @click="currentPage = 1" class="tile is-parent">
                <article class="tile is-child box">
                  <p class="title is-link">See All Devices</p>
                </article>
              </a>
            </div>
          </section>
          <br />

          <h1 class="title">Widgets you may like</h1>
          <section class="info-tiles">
            <div class="tile is-ancestor has-text-centered">
              <div class="tile is-parent">
                <article class="tile is-child box">
                  <p class="title">439k</p>
                  <p class="subtitle">Users</p>
                </article>
              </div>
              <div class="tile is-parent">
                <article class="tile is-child box">
                  <p class="title">3.4k</p>
                  <p class="subtitle">Open Orders</p>
                </article>
              </div>
              <div class="tile is-parent">
                <article class="tile is-child box">
                  <p class="title">19</p>
                  <p class="subtitle">Exceptions</p>
                </article>
              </div>
            </div>
          </section>
          <br />
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
import MyDevices from "@/views/ProfileViews/MyDevices.vue"
import RegisterDevice from "@/views/ProfileViews/RegisterDevice.vue"
import FavouriteWidgets from "@/views/ProfileViews/FavoriteWidgets.vue"
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
  },
})
export default class Profile extends Vue {
  public editMode: Boolean = false
  public editText: String = "Edit"
  public currentPage: Number = 0

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

  toggleConfig() {
    this.editMode = !this.editMode
    this.editText = this.editMode ? "Save" : "Edit"
  }

  getClass(page: Number) {
    return this.isActive(page) ? "is-active" : ""
  }

  isActive(page: Number) {
    return page == this.currentPage
  }

  logout() {
    store.commit("logout")
  }
}
</script>

<style lang="stylus" scoped></style>
