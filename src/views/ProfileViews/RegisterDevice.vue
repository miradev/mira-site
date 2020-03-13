<template>
  <div class="column is-9">
    <section class="hero is-info welcome is-small">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Register New Device</h1>
        </div>
      </div>
    </section>
    <br />
    <section class="section is-fw">
      <div class="container">
        <b-steps v-model="activeStep" :hasNavigation="false">
          <b-step-item label="Identifier" clickable>
            <h2 class="subtitle is-4">Enter your device identifer</h2>
            <h2 class="subtitle is-6">This is the long number found on your mirror</h2>
            <input
              class="input"
              type="text"
              placeholder="Device Identifier"
              autofocus
              v-model="identiferValue"
            />
            <br />
            <br />
            <br />
            <b-button
              outlined
              @click="activeStep++"
              type="is-success"
              icon-pack="fas"
              icon-right="forward"
              v-show="identiferValue.length > 0"
            >Next</b-button>
          </b-step-item>
          <b-step-item label="Name">
            <h2 class="subtitle is-4">What do you want to name this device?</h2>
            <input class="input" type="text" placeholder="Name" autofocus v-model="name" />
            <br />
            <br />
            <br />
            <b-button
              outlined
              @click="activeStep--"
              type="is-danger"
              icon-pack="fas"
              icon-left="backward"
            >Previous</b-button>
            <b-button
              v-show="name.length > 0"
              @click="activeStep++"
              outlined
              type="is-success"
              icon-pack="fas"
              icon-right="forward"
            >Next</b-button>
          </b-step-item>
          <b-step-item label="Details">
            <h2 class="subtitle is-4">Leave a description here. (e.g. Bedroom washroom)</h2>
            <input
              class="input"
              type="text"
              placeholder="Description"
              autofocus
              v-model="description"
            />
            <br />
            <br />
            <br />
            <b-button
              @click="activeStep--"
              outlined
              type="is-danger"
              icon-pack="fas"
              icon-left="backward"
            >Previous</b-button>
            <b-button
              @click="activeStep++"
              outlined
              type="is-success"
              icon-pack="fas"
              icon-right="forward"
            >Next</b-button>
          </b-step-item>
          <b-step-item label="Confirm">
            <h2 class="subtitle is-4">Confirm registration</h2>
            <h2 class="subtitle is-6">ID: {{identiferValue}}</h2>
            <h2 class="subtitle is-6">Name: {{name}}</h2>
            <h2 class="subtitle is-6">Description: {{description}}</h2>
            <h2 class="subtitle is-6">{{msg}}</h2>
            <br />
            <b-progress
              :value="progress"
              v-show="connected || connecting || failed"
              :type="progressType"
              size="is-medium"
            ></b-progress>
            <button class="button" @click="submit()">Submit</button>
          </b-step-item>
        </b-steps>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import { Prop } from "vue-property-decorator"
import axios from "axios"
import router from "@/router"
import store from "@/store"
import { IUser } from "@/common/Types"

@Component
export default class CreateDevice extends Vue {
  @Prop() public identifer!: string
  private url = process.env.VUE_APP_HAR + "users/" + store.state.user.username + "/devices"
  private currentUserURL = process.env.VUE_APP_HAR + "currentUser"
  private name: string = ""
  private description: string = ""
  private msg: string = ""
  private activeStep: number = 0
  private identiferValue: string = ""

  public connecting: boolean = false
  public failed: boolean = false
  public connected: boolean = false
  public progress: number = 0
  public progressType: string = "is-primary"

  mounted() {
    this.identiferValue = this.identifer
  }

  connect() {
    this.connecting = true
    this.failed = false
    this.connected = false
    let body = {
      _id: this.identiferValue,
    }
    axios
      .post(this.url + "/" + this.identiferValue + "/connect", body, { withCredentials: true })
      .then(r => {
        this.connecting = false
        this.connected = true
        this.failed = false
        this.progress = 100
        this.progressType = "is-success"
        this.msg = "Connected!"
        this.$buefy.snackbar.open({
          message: "Successfully Saved! Click OK to refresh.",
          indefinite: true,
          onAction: () => {
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
          },
        })
      })
      .catch(err => {
        this.connecting = false
        this.connected = false
        this.failed = true
        this.progress = 100
        this.progressType = "is-danger"
        this.msg = err
        this.$forceUpdate()
      })
  }

  submit() {
    let body = {
      _id: this.identiferValue,
      name: this.name,
    }
    axios
      .post(this.url, body, { withCredentials: true })
      .then(response => {
        let description: string = response.data.description
        store.commit("setQR", "")
        if (description) {
          this.msg = description
          this.connecting = false
          this.connected = false
          this.failed = true
          this.progress = 100
          this.progressType = "is-danger"
          this.$forceUpdate()
          return
        }
        let user = store.state.user
        user.devices.push(this.identiferValue)
        store.commit("login", user)
        this.$forceUpdate()
        this.connect()
      })
      .catch(error => {
        this.connecting = false
        this.connected = false
        this.failed = true
        this.progress = 100
        this.progressType = "is-danger"
        this.msg = error
        this.$forceUpdate()
      })
  }
}
</script>

<style lang="stylus" scoped>
a >>> span {
  color: white;
}

.box {
  width: 450px;
}
</style>
