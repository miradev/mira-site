<template>
  <router-link :to="deviceURL" class="tile is-parent box is-4">
    <article class="tile is-child">
      <p class="title is-4">{{deviceName}}</p>
      <p
        class="subtitle is-6"
      >{{deviceStatuses.status == 1 ? "Online" : deviceStatuses.status == 2 ? "Offline" : "Uninitialized"}}</p>
    </article>
  </router-link>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import { Prop } from "vue-property-decorator"

import { IDevice } from "@/common/Types"
import store from "../store"
import * as Utility from "@/common/utility"

@Component
export default class DeviceCard extends Vue {
  @Prop() private device!: string
  public deviceURL: String = "/device/" + this.device

  get deviceName() {
    return Utility.getDeviceName(this.device)
  }

  get deviceStatuses() {
    return store.state.deviceStatuses ?? []
  }
}
</script>

<style lang="stylus" scoped></style>
