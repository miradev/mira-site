<template>
  <section class="section is-dark is-fullheight top-paddingless left-paddingless">
    <div class="columns is-fullheight">
      <aside class="menu column is-one-quarter is-left-menu">
        <div class="profile-header">
          <h1 class="title">Profile</h1>
          <b-button
            :type="editMode ? 'is-success' : 'is-warning'"
            @click="toggleConfig"
            icon-left="edit"
          >
            {{
            editText
            }}
          </b-button>
        </div>
        <b-field label="Username">
          <b-input type="text" :value="$store.state.user.username" :disabled="!editMode"></b-input>
        </b-field>
        <b-field label="Email">
          <b-input type="email" :value="$store.state.user.email" :disabled="!editMode"></b-input>
        </b-field>
        <br />
        <br />
        <b-button type="is-danger" icon-left="sign-out-alt">Log Out</b-button>
      </aside>
      <div class="column has-left-menu">
        <div class="level">
          <div class="level-left">
            <div class="level-item">
              <h1 class="title">My Devices ({{devices.length}})</h1>
            </div>
          </div>
          <div class="level-left">
            <div class="level-item">
              <b-button
                tag="router-link"
                :to="dashboardURL"
                v-show="isDeveloper"
                type="is-link"
              >Switch to Developer Dashboard View</b-button>
            </div>
          </div>
        </div>
        <DeviceCard v-for="device in devices" :key="device._id" :device="device"></DeviceCard>
        <router-link class="button" :to="createDeviceURL">Register New Device</router-link>
        <br />
        <br />
        <br />
        <h1 class="title">Saved Widgets ({{widgets.length}})</h1>
        <div class="columns">
          <WidgetCard v-for="widget in widgets" :key="widget._id" :widget="widget"></WidgetCard>
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
import { UserTags, IDevice } from "@/components/Types"
import store from "../store"
import router from "../router"
@Component({
  components: {
    WidgetCard,
    DeviceCard,
  },
})
export default class Profile extends Vue {
  public editMode: Boolean = false
  public editText: String = "Edit"

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

  logout() {
    store.commit("logout")
  }
}
</script>

<style lang="stylus" scoped>
.column >>> .profile-header {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
}

.field >>> input {
  background-color: $mid-gray;
  color: white;
}

.columns >>> .is-left-menu {
  margin-right: 40px;
  padding-left: 40px;
  padding-right: 20px;
  padding-top: 30px;
  background-color: $mid-gray;
}

.columns >>> .has-left-menu {
  padding-top: 30px;
}
</style>
