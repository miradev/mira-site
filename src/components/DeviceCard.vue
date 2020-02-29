<template>
  <div class="box is-mid-dark column is-one-quarter">
    <div class="content">
      <router-link :to="deviceURL">
        <p class="title is-4">{{ device.name }}</p>
        <p class="title is-6">{{ device.config.location }}</p>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import { Prop } from "vue-property-decorator"

import { IDevice } from "@/components/Types"

@Component
export default class DeviceCard extends Vue {
  @Prop() private device!: IDevice
  public deviceURL: String = "/device/" + this.device._id
}
</script>

<style lang="stylus" scoped></style>
