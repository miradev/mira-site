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
        <b-input type="email" :value="user.email" maxlength="30"></b-input>
      </b-field>

      <b-field label="Username">
        <b-input :value="user.username" maxlength="30"></b-input>
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
@Component({
  components: {
    WidgetCard,
    DeviceCard,
  },
})
export default class MyDevices extends Vue {
  public isDev: Boolean = store.state.user.tags.includes(UserTags.DEVELOPER)
  public password: String = ""
  get user() {
    return store.state.user
  }
}
</script>

<style lang="stylus" scoped></style>
