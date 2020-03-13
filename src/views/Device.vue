<template>
  <div>
    <section class="hero welcome is-info">
      <div class="hero-body">
        <div class="container content">
          <div class="columns">
            <div class="column">
              <h1 class="title">{{device.name}}</h1>
              <h2
                class="heading is-3"
              >{{deviceStatuses.status == 1 ? "Online" : deviceStatuses.status == 2 ? "Offline" : "Uninitialized...please connect to initialize"}}</h2>
            </div>
            <div class="buttons">
              <button class="button is-warning" @click="connect()" :loading="loading">Connect</button>
              <button class="button is-warning" @click="save()">{{saveButtonText}}</button>
              <button class="button" @click="update()">Sync</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container content">
        <div class="columns box">
          <div class="column is-3">
            <b-table
              :checked-rows.sync="checkedRows"
              :data="tableData"
              checkable
              :selected.sync="selectedWidget"
            >
              <template slot-scope="props">
                <b-table-column field="name" label="All Widgets" sortable>
                  <template slot="header" slot-scope="{ column }">
                    <b-tooltip :label="column.label" dashed>
                      <b>{{ column.label }}</b>
                    </b-tooltip>
                  </template>
                  {{ props.row.name }}
                </b-table-column>
                <b-table-column field="page" label="Page">
                  <template slot="header" slot-scope="{ column }">
                    <b-tooltip :label="column.label" dashed>
                      <b>{{ column.label }}</b>
                    </b-tooltip>
                  </template>
                  {{ pages[props.row._id] }}
                </b-table-column>
              </template>
              <template slot="empty">
                <section class="section">
                  <div class="content has-text-grey has-text-centered">
                    <p>No Favourited Widgets. Visit the marketplace</p>
                  </div>
                </section>
              </template>
            </b-table>
          </div>

          <div v-if="selectedWidget != null && device != null" class="column">
            <ConfigureWidget
              @updateCSS="updateCSS"
              @updateConfig="updateConfig"
              @updatePage="updatePage"
              :key="selectedWidget._id"
              :widget="selectedWidget"
              :device="device"
              :page="pages[selectedWidget._id]"
            ></ConfigureWidget>
          </div>
          <div v-else class="column">nothing here</div>
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
import { UserTags, IDevice, IWidget, WidgetSetting } from "@/common/Types"

@Component({
  components: {
    ConfigureWidget,
  },
})
export default class Profile extends Vue {
  private url = process.env.VUE_APP_HAR + "users/" + store.state.user._id + "/devices/"
  private currentUserURL = process.env.VUE_APP_HAR + "currentUser"
  private isOpen: boolean = true
  private saveButtonText: string = "Save"
  private device: IDevice = {}
  private selectedWidget: object = {}
  private checkedRows = []
  private loading: boolean = false
  private pages = {}

  private mounted() {
    const id = this.$route.params.id
    axios
      .get(this.url + id, { withCredentials: true })
      .then(response => {
        const { device } = response.data
        this.device = device
        for (let w of this.widgets) {
          this.pages[w._id] = 1
        }

        for (let [key, val] of Object.entries(this.device.widgets)) {
          let found = this.widgets.filter(e => e._id == key)
          this.pages[key] = this.device?.widgets[key]?.page ?? 1
          if (found.length == 1) {
            this.checkedRows.push(found[0])
          }
        }
        this.selectedWidget = this.widgets[0]
        this.$forceUpdate()
      })
      .catch(err => {
        console.log("Bad:" + err)
        this.failed = true
      })
  }

  get deviceStatuses() {
    return store.state.deviceStatuses ?? []
  }

  get widgets() {
    return store.state.widgets ?? []
  }

  get tableData() {
    return this.widgets
  }

  private initObjects() {
    if (this.selectedWidget == null) return
    if (!this.device.widgets) {
      this.device.widgets = {}
    }
    if (!this.device.widgets[this.selectedWidget._id]) {
      this.device.widgets[this.selectedWidget._id] = {
        page: this.pages[this.selectedWidget._id],
      }
    }
  }

  private updateConfig(config) {
    this.initObjects()
    this.device.widgets[this.selectedWidget._id].config = config
    this.saveButtonText = "Save*"
  }

  private updateCSS(style) {
    this.initObjects()
    this.device.widgets[this.selectedWidget._id].style = style
    this.saveButtonText = "Save*"
  }

  private updatePage(page) {
    this.initObjects()
    this.pages[this.selectedWidget._id] = page
    this.saveButtonText = "Save*"
    this.$forceUpdate()
  }

  connect() {
    this.loading = true
    let identifer = this.device._id
    let body = {
      _id: identifer,
    }
    axios
      .post(this.url + identifer + "/connect", body, { withCredentials: true })
      .then(r => {
        this.loading = false
        axios
          .get(this.currentUserURL, { withCredentials: true })
          .then(response => {
            let user: IUser = response.data.user
            store.commit("login", user)
            this.$buefy.toast.open({
              message: "Connected!",
              type: "is-success",
            })
            this.getStatus()
          })
          .catch(error => {
            console.log(error)
            this.$buefy.toast.open({
              message: error,
              type: "is-danger",
            })
          })
      })
      .catch(err => {
        console.log(error)
        this.loading = false
        this.$buefy.toast.open({
          message: error,
          type: "is-danger",
        })
      })
  }

  getStatus() {
    let deviceStatusURL =
      process.env.VUE_APP_HAR + "users/" + store.state.user.username + "/devices"
    axios
      .get(this.deviceStatusURL, { withCredentials: true })
      .then(response => {
        let deviceStatuses = response.data.devices
        for (let device of this.devices) {
          if (device in deviceStatuses) {
          } else {
            store.commit("updateDeviceStatus", { id: device, status: 3 })
          }
        }
        this.$forceUpdate()
      })
      .catch(error => {
        this.$forceUpdate()
      })
  }

  save() {
    const id = this.$route.params.id
    let widgets = {}
    for (let widget of this.widgets) {
      if (this.checkedRows.some(e => e._id == widget._id)) {
        widgets[widget._id] = { page: parseInt(this.pages[widget._id]) }
        let config = this.device?.widgets[widget._id]?.config
        let style = this.device?.widgets[widget._id]?.style
        if (config) {
          widgets[widget._id].config = config
        }
        if (style) {
          widgets[widget._id].style = style
        }
      }
    }

    let body: IDevice = {
      _id: this.device._id,
      name: this.device.name,
      config: {},
      widgets: widgets,
    }
    console.log(body)
    axios
      .put(this.url + id, body, { withCredentials: true })
      .then(response => {
        console.log(response)
        this.$buefy.toast.open({
          message: "Saved!",
          type: "is-success",
        })
        this.saveButtonText = "Save"
      })
      .catch(err => {
        this.$buefy.toast.open({
          message: err,
          type: "is-warning",
        })
        console.log(err)
      })
  }

  update() {
    const id = this.$route.params.id
    let body = {}
    axios
      .post(this.url + id + "/update", body, { withCredentials: true })
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style lang="stylus" scoped>
.heading {
  color: white;
  font-size: 12pt;
}
</style>
