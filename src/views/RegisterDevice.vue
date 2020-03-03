<template>
  <section class="section">
    <div class="container">
      <b-button
        tag="router-link"
        :to="'/profile/' + $store.state.user.username"
        type="is-link"
        icon-left="arrow-left"
      >Profile</b-button>
      <b-tabs v-model="activeTab" position="is-centered" class="block" type="is-boxed">
        <b-tab-item label="Enter Identifier">
          <div class="flex-center">
            <div class="box is-mid-dark">
              <div class="field has-text-centered">
                <h2 class="subtitle is-4">Enter your device identifer</h2>
                <h3 class="subtitle is-6 red-text is-mid-dark" v-show="this.msg">{{this.msg}}</h3>
              </div>
              <div class="field">
                <label class="label" for="identifer">Device Identifier</label>
                <div class="control has-icons-right">
                  <input v-model="identifer" class="input" type="text" name="identifer" />
                </div>
              </div>
              <div class="level is-mobile">
                <div class="level-left"></div>
                <div class="level-right">
                  <div class="level-item">
                    <button class="button is-primary" @click="setPage(1)">Next</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-tab-item>

        <b-tab-item :disabled="!validate(identifer)" label="Device Details">
          <div class="flex-center">
            <div class="box is-mid-dark">
              <div class="field has-text-centered">
                <h2 class="subtitle is-4">Device Details</h2>
                <h3 class="subtitle is-6 red-text is-mid-dark" v-show="this.msg">{{this.msg}}</h3>
              </div>
              <div class="field">
                <label class="label" for="name">Name your device</label>
                <div class="control has-icons-right">
                  <input v-model="name" class="input" type="text" name="name" />
                  <span class="icon is-right">
                    <i class="fa fa-user"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <label class="label" for="description">Description</label>
                <div class="control has-icons-right">
                  <input v-model="description" class="input" type="text" name="description" />
                  <span class="icon is-right">
                    <i class="fa fa-user"></i>
                  </span>
                </div>
              </div>
              <div class="level is-mobile">
                <div class="level-left">
                  <div class="level-item">
                    <button class="button is-primary" @click="activeTab = 0">Back</button>
                  </div>
                </div>
                <div class="level-right">
                  <div class="level-item">
                    <button class="button is-primary" @click="registerDevice()">Next</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-tab-item>
      </b-tabs>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import axios from "axios"
import router from "../router"
import store from "../store"
import { IUser } from "@/components/Types"

@Component
export default class CreateDevice extends Vue {
  private url = process.env.VUE_APP_HAR + "users/" + store.state.user._id + "/devices"
  private identifer: string = ""
  private name: string = ""
  private description: string = ""
  private msg: string = ""
  private activeTab: Number = 0

  setPage(page: Number) {
    if (this.validate(this.identifer)) {
      this.activeTab = page
      this.msg = ""
    } else {
      this.msg = "Identifier must be exactly 10 characters."
    }
  }

  validate(id: string) {
    return id.length == 10
  }

  registerDevice() {
    let body = {
      _id: this.identifer,
      name: this.name,
    }
    console.log(this.url)
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
        //router.push("/profile/" + store.state.user.username)
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
