<template>
  <div class="container">
    <br />
    <br />
    <div class="flex-center">
      <div class="box is-mid-dark">
        <div class="has-text-centered">
          <img src="@/assets/logo_square.png" alt="Mira" width="150" />
        </div>
        <div class="field has-text-centered">
          <h2 class="subtitle is-3">Log in</h2>
          <h3 class="subtitle is-6 red-text is-mid-dark" v-show="this.msg">{{this.msg}}</h3>
        </div>
        <div class="field">
          <label class="label" for="username">User</label>
          <div class="control has-icons-right">
            <input id="name" v-model="username" class="input" type="text" name="username" />
            <span class="icon is-right">
              <i class="fa fa-user"></i>
            </span>
          </div>
        </div>
        <div class="field">
          <label class="label" for="password">Password</label>
          <div class="control has-icons-right">
            <input id="password" v-model="password" class="input" type="password" name="password" />
            <span class="icon is-right">
              <i class="fa fa-key"></i>
            </span>
          </div>
        </div>
        <div class="level is-mobile">
          <div class="level-left"></div>
          <div class="level-right">
            <div class="level-item">
              <button class="button is-primary" @click="login()">Sign In</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import axios from "axios"
import router from "../router"
import store from "../store"
import { User } from "@/components/User"

@Component
export default class Login extends Vue {
  private url = process.env.VUE_APP_HAR + "login"

  private username: string = ""

  private password: string = ""

  private msg: string = ""

  login() {
    let body = {
      username: this.username,
      password: this.password,
    }
    axios
      .post(this.url, body)
      .then(response => {
        if (response.data.redirect == "/login") {
          this.msg = "Incorrect credentials."
          this.$forceUpdate()
          return
        }
        let user: User = response.data
        store.commit("login", user)
        this.msg = "Logged in."
        this.$forceUpdate()
        router.push("/")
      })
      .catch(error => {
        this.msg = "Incorrect credentials."
        this.$forceUpdate()
      })
  }
}
</script>

<style lang="stylus" scoped>
.box {
  width: 450px;
}
</style>
