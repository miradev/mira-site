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
              <button class="button is-warning" @click="save()">Save</button>
              <button class="button" @click="update()">Sync</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="columns">
        <div class="column is-3">
          <b-table
            :checked-rows.sync="checkedRows"
            :data="tableData"
            checkable
            :selected.sync="selectedWidget"
          >
            <template slot-scope="props">
              <b-table-column field="name" label="All Widgets">
                <template slot="header" slot-scope="{ column }">
                  <b-tooltip :label="column.label" dashed>
                    <b>{{ column.label }}</b>
                  </b-tooltip>
                </template>
                {{ props.row.widget.name }}
              </b-table-column>

              <b-table-column field="name" label="Page">
                <template slot="header" slot-scope="{ column }">
                  <b-tooltip :label="column.label" dashed>
                    <b>{{ column.label }}</b>
                  </b-tooltip>
                </template>
                <b-field>
                  <b-select v-model="pages[props.row.widget._id]">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </b-select>
                </b-field>
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
            :key="selectedWidget._id"
            :widget="selectedWidget.widget"
            :device="device"
          ></ConfigureWidget>
        </div>
        <div v-else class="column">nothing here</div>
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
  public draggingRow = null
  public draggingRowIndex = null
  public isOpen: boolean = true
  public device: IDevice = {}
  public selectedWidget: object = {}
  public checkedRows = []
  public loading: boolean = false
  public pages = {}

  private mounted() {
    const id = this.$route.params.id
    axios
      .get(this.url + id, { withCredentials: true })
      .then(response => {
        const { device } = response.data
        this.device = device
        for (let w in this.device.widgets) {
          let widget = this.widgets.find(el => el._id == w)
          this.checkedRows.push(widget)
          this.pages[w] = this.device.widgets[w].page
        }
        this.selectedWidget = { widget: this.widgets[0], page: this.pages[this.widgets[0]._id] }
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
    return this.widgets.map(e => {
      return { widget: e, page: this.pages[e._id] }
    })
  }

  private initObjects() {
    if (this.selectedWidget == null) return
    if (!this.device.widgets) {
      this.device.widgets = {}
    }
    if (!this.device.widgets[this.selectedWidget._id]) {
      this.device.widgets[this.selectedWidget._id] = {
        page: this.pages[this.device.widgets[this.selectedWidget._id]],
      }
    }
  }

  private updateConfig(config) {
    this.initObjects()
    this.device.widgets[this.selectedWidget._id].config = config
  }

  private updateCSS(style) {
    this.initObjects()
    this.device.widgets[this.selectedWidget._id].style = style
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
    if (!this.device.widgets) {
      this.device.widgets = {}
    }
    for (let row in this.checkedRows) {
      let w = this.checkedRows[row]
      if (w._id in this.device.widgets) {
        widgets[w._id] = { page: parseInt(this.pages[w._id]) }
      }
    }

    let body: IDevice = {
      name: this.device.name,
      config: {},
      widgets: widgets,
    }
    console.log(body)
    console.log(this.pages)
    axios
      .put(this.url + id, body, { withCredentials: true })
      .then(response => {
        console.log(response)
        this.$buefy.toast.open({
          message: "Saved!",
          type: "is-success",
        })
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
      .catch(err => {
        console.log(err)
      })
  }

  //Dragging
  dragstart(payload) {
    this.draggingRow = payload.row
    this.draggingRowIndex = payload.index
    payload.event.dataTransfer.effectAllowed = "copy"
  }
  dragover(payload) {
    payload.event.dataTransfer.dropEffect = "copy"
    payload.event.target.closest("tr").classList.add("is-selected")
    payload.event.preventDefault()
  }
  dragleave(payload) {
    payload.event.target.closest("tr").classList.remove("is-selected")
    payload.event.preventDefault()
  }
  drop(payload) {
    payload.event.target.closest("tr").classList.remove("is-selected")
    const droppedOnRowIndex = payload.index
    this.$buefy.toast.open(
      `Moved ${this.draggingRow.name} from row ${this.draggingRowIndex + 1} to ${droppedOnRowIndex +
        1}`,
    )
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

.heading {
  color: white;
  font-size: 12pt;
}
</style>
