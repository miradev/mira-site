<template>
  <section class="section">
    <div class="columns">
      <div class="column is-one-quarter">
        <h1 class="title">Profile</h1>
        <h2 class="subtitle">{{$store.state.user.username}}</h2>
        <h2 class="subtitle">{{$store.state.user.email}}</h2>
        <button class="button" v-show="isDeveloper">Switch to Dev Dashboard</button>
        <button class="button is-danger">Log Out</button>
      </div>
      <div class="column">
        <h1 class="title">My Devices</h1>
        <router-link class="button" :to="deviceLink">Device</router-link>
        <h1 class="title">Saved Widgets</h1>
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
import store from "../store"
import router from "../router"
@Component({
  components: {
    WidgetCard,
  },
})
export default class Profile extends Vue {
  get deviceLink() {
    return "/profile/" + store.state.user.username + "/device/1"
  }
  get widgets() {
    return store.state.widgets
  }
  get isDeveloper() {
    return store.state.user.tags.includes("dev")
  }
}
</script>

<style>
</style>
