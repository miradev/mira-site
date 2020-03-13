<template>
  <div class="column is-9">
    <section class="hero is-info welcome is-small">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column">
              <h1 class="title">Favourite Widgets</h1>
            </div>
            <button class="button is-warning" @click="refresh()">
              <b-icon icon="sync-alt"></b-icon>
            </button>
          </div>
        </div>
      </div>
    </section>
    <br />

    <h2 v-show="widgets.length == 0">
      Oops. It looks like you have no widgets favourited. Check out some widgets
      <router-link to="/marketplace">here</router-link>.
    </h2>
    <section class="info-tiles">
      <div class="tile has-text-centered wrap">
        <WidgetCard v-for="widget in widgets" :key="widget._id" :widget="widget" :canSave="true"></WidgetCard>
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
import { IUser, UserTags, IDevice } from "@/common/Types"
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
  get widgets() {
    return store.state.widgets
  }
}
</script>

<style lang="stylus" scoped></style>
