<template>
  <div class="container">
    <br />
    <br />
    <div class="hero center is-fullheight">
      <div class="columns is-centered">
        <div class="column is-4">
          <div class="box">
            <div class="section has-text-centered">
              <img src="@/assets/logo_square.png" alt="Mira" width="112" height="28" />
            </div>
            <div class="field has-text-centered">
              <h2 class="subtitle is-3">Create an account</h2>
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
              <label class="label" for="email">Email</label>
              <div class="control has-icons-right">
                <input id="email" v-model="email" class="input" type="email" name="email" />
                <span class="icon is-right">
                  <i class="fa fa-at"></i>
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
            <div class="control field">
              <label class="Checkbox">
                <b-checkbox v-model="checked">I would like to be a developer: {{checked}}</b-checkbox>
              </label>
            </div>
            <div class="level is-mobile">
              <div class="level-left"></div>
              <div class="level-right">
                <div class="level-item">
                  <button class="button is-primary" @click="register()">Sign In</button>
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
export default class Register extends Vue {
  private url = process.env.VUE_APP_HAR + "signup"

  private username: string = ""

  private email: string = ""

  private password: string = ""

  private msg: string = ""

  public checked: boolean = false

  register() {
    let body = {
      username: this.username,
      password: this.password,
      email: this.email,
      dev: this.checked,
    }
    axios
      .post(this.url, body)
      .then(response => {
        this.$forceUpdate()
        router.push("/login")
      })
      .catch(error => {
        this.msg = "Invalid credentials."
        this.$forceUpdate()
      })
  }

  beforeRouteUpdate(to: any, from: any, next: any) {
    // just use `this`
    this.$forceUpdate()
    console.log("Hi")
    next()
  }
}
</script>
