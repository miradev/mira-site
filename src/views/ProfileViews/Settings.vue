<template>
  <div class="column is-9">
    <section class="hero is-info welcome is-small">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Settings</h1>
        </div>
      </div>
    </section>
    <br />
    <section>
      <b-field label="Email">
        <b-input type="email" v-model="email" maxlength="30"></b-input>
      </b-field>

      <b-field label="Username">
        <b-input v-model="username" maxlength="30"></b-input>
      </b-field>
      <b-field label="I would like to be a developer">
        <b-switch v-model="isDev">{{ isDev ? 'Yes' : 'No' }}</b-switch>
      </b-field>
      <b-button type="is-primary" outlined @click="submit()">Save</b-button>
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
import { ToastProgrammatic as Toast } from "buefy"
@Component({
  components: {
    WidgetCard,
    DeviceCard,
  },
})
export default class MyDevices extends Vue {
  private url = process.env.VUE_APP_HAR + "currentUser"
  public isDev: Boolean = store.state.user.tags.includes(UserTags.DEVELOPER)
  public email: string = this.user.email
  public username: string = this.user.username

  get user() {
    return store.state.user
  }

  submit() {
    let body = {
      _id: store.state.user._id,
      username: this.username,
      email: this.email,
      tags: this.isDev ? ["dev"] : [],
      devices: store.state.user.devices,
      favorites: store.state.user.favorites,
    }
    axios
      .put(this.url, body, { withCredentials: true })
      .then(response => {
        console.log(response)
        this.$forceUpdate()
        store.commit("login", body)
      })
      .catch(error => {
        Toast.open("Failed!" + error)
        this.$forceUpdate()
      })
  }
}
</script>

<style lang="stylus" scoped></style>
