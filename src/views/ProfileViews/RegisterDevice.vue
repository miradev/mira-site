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
            <h2 class="subtitle is-6">This is the 10-digit number found on your mirror</h2>
            <input
              class="input"
              type="text"
              placeholder="Device Identifier"
              autofocus
              v-model="identifer"
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
              v-show="identifer.length == 10"
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
            <h2 class="subtitle is-4">Any additional comments you would like to leave?</h2>
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
            <h2 class="subtitle is-6">ID: {{identifer}}</h2>
            <h2 class="subtitle is-6">Name: {{name}}</h2>
            <h2 class="subtitle is-6">Description: {{description}}</h2>
            <h2 class="subtitle is-6">{{msg}}</h2>
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
import axios from "axios"
import router from "@/router"
import store from "@/store"
import { IUser } from "@/common/Types"

@Component
export default class CreateDevice extends Vue {
  private url = process.env.VUE_APP_HAR + "users/" + store.state.user._id + "/devices"
  private currentUserURL = process.env.VUE_APP_HAR + "currentUser"
  private identifer: string = ""
  private name: string = ""
  private description: string = ""
  private msg: string = ""
  private activeStep: Number = 0

  submit() {
    let body = {
      _id: this.identifer,
      name: this.name,
    }
    axios
      .post(this.url, body, { withCredentials: true })
      .then(response => {
        let description: string = response.data.description
        if (description) {
          this.msg = description
          this.$forceUpdate()
          return
        }
        this.$forceUpdate()
        this.$buefy.snackbar.open({
          message: "Successfully Saved! Click OK to refresh.",
          indefinite: true,
          onAction: () => {
            axios
              .get(this.currentUserURL, { withCredentials: true })
              .then(response => {
                let user: IUser = response.data.user
                store.commit("login", user)
                router.go(0)
              })
              .catch(error => {
                this.msg = "Something bad happened."
                this.$forceUpdate()
              })
          },
        })
      })
      .catch(error => {
        this.msg = "Something bad happened."
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
