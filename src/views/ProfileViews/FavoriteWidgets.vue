<template>
  <div class="column is-9">
    <section class="hero is-info welcome is-small">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Favourite Widgets</h1>
        </div>
      </div>
    </section>
    <br />

    <h2 v-show="widgets.length == 0">
      Oops. It looks like you have no widgets favourited. Check out some widgets
      <router-link to="/marketplace">here</router-link>.
    </h2>
    <section class="info-tiles">
      <div class="tile is-ancestor has-text-centered">
        <router-link
          :to="'/widget/' + widget._id"
          class="tile is-parent"
          v-for="widget in widgets"
          :key="widget._id"
        >
          <article class="tile is-child box">
            <p class="title">{{widget.name}}</p>
            <p class="subtitle">Online</p>
          </article>
        </router-link>
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
  get widgets() {
    return store.state.widgets
  }
}
</script>

<style lang="stylus" scoped></style>
