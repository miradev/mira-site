<template>
  <div>
    <section class="hero welcome is-info">
      <div class="hero-body">
        <div class="container content">
          <div class="columns">
            <div class="column">
              <h1 class="title">{{device.name}}</h1>
            </div>
            <button class="button is-warning" @click="save()">Save</button>
            <button class="button is-warning" @click="update()">Update</button>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h1 class="title">Favorited Widgets</h1>
        <div class="columns">
          <ConfigureWidget
            @added="added"
            @removed="removed"
            v-for="widget in widgets"
            :key="widget._id"
            :widget="widget"
          ></ConfigureWidget>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import axios from "axios"
import Component from "vue-class-component"
import ConfigureWidget from "@/components/ConfigureWidget.vue"
import store from "../store"
import router from "../router"
import { UserTags, IDevice, IWidget, DeviceWidget } from "@/common/Types"

@Component({
  components: {
    ConfigureWidget,
  },
})
export default class Profile extends Vue {
  private url = process.env.VUE_APP_HAR + "users/" + store.state.user._id + "/devices/"
  private device: IDevice

  private mounted() {
    const id = this.$route.params.id
    axios
      .get(this.url + id, { withCredentials: true })
      .then(response => {
        const { device } = response.data
        this.device = device
        this.$forceUpdate()
      })
      .catch(err => {
        console.log("Bad:" + err)
        this.failed = true
      })
  }
  get widgets() {
    return store.state.widgets
  }

  added(deviceWidget: DeviceWidget) {
    this.device.deviceWidgets.push(deviceWidget)
    console.log(this.device)
  }
  removed(deviceWidget: DeviceWidget) {
    this.device.deviceWidgets = this.device.deviceWidgets.filter(
      w => w.widgetId != deviceWidget.widgetId,
    )
    console.log(this.device)
  }

  save() {
    const id = this.$route.params.id
    let body = {
      name: this.device.name,
      config: this.device.config,
      deviceWidgets: this.device.deviceWidgets,
    }
    axios
      .put(this.url + id, body, { withCredentials: true })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }

  update() {
    const id = this.$route.params.id
    let body = {
      name: this.device.name,
      config: this.device.config,
      deviceWidgets: this.device.deviceWidgets,
    }
    axios
      .post(this.url + id + "/update", body, { withCredentials: true })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>

<style lang="stylus" scoped>
.is-online {
  margin: 0 0 0 5px;
}

.level {
  display: flex;
  justify-content: space-between;
}
</style>
