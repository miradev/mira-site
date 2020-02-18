<template>
  <div class="container">
    <br />
    <br />
    <div class="hero center is-fullheight">
      <div class="columns is-centered">
        <div class="column is-4">
          <div class="box">
            <div class="section has-text-centered">
              <img src="@/assets/logo_square.png" width="112" height="28" />
            </div>
            <div class="field has-text-centered">
              <h2 class="subtitle is-3">Log in</h2>
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
                <input
                  id="password"
                  v-model="password"
                  class="input"
                  type="password"
                  name="password"
                />
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
                  <p>{{ msg }}</p>
                </div>
              </div>
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
        let user: User = { username: this.username, id: response.id }
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
