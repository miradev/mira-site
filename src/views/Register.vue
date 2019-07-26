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
                <input class="input" type="text" id="name" name="username" v-model="username" />
                <span class="icon is-right">
                  <i class="fa fa-user"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <label class="label" for="email">Email</label>
              <div class="control has-icons-right">
                <input class="input" type="email" id="email" name="email" v-model="email" />
                <span class="icon is-right">
                  <i class="fa fa-at"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <label class="label" for="password">Password</label>
              <div class="control has-icons-right">
                <input
                  class="input"
                  type="password"
                  id="password"
                  name="password"
                  v-model="password"
                />
                <span class="icon is-right">
                  <i class="fa fa-key"></i>
                </span>
              </div>
            </div>
            <div class="control field">
              <label class="Checkbox">
                <input type="Checkbox" name="answer" />
                I would like to be a developer.
              </label>
            </div>
            <div class="level is-mobile">
              <div class="level-left"></div>
              <div class="level-right">
                <div class="level-item">
                  <button class="button is-primary" @click="register()">Sign In</button>
                  <p>{{msg}}</p>
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
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import router from "../router";
import store from "../store";

export default class Register extends Vue {
  private url =
    "http://mirabackend-env.zp8gkvhdwt.ca-central-1.elasticbeanstalk.com/register";
  private username: string = "";
  private password: string = "";
  private msg: string = "";
  public checked: boolean = false;

  register() {
    // TODO: Fix SSL
    // var form = new FormData();
    // form.set("username", this.username);
    // form.set("password", this.password);
    // axios
    //   .post(this.url, form)
    //   .then(response => {
    //     store.commit("login", this.username);
    //     this.msg = "Logged in.";
    //     this.$forceUpdate();
    //     router.push("/");
    //     return;
    //   })
    //   .catch(error => {
    //     this.msg = "Incorrect credentials.";
    //     this.$forceUpdate();
    //     return;
    //   });
    if (this.username && this.password) {
      var users = store.state.users;
      if (this.username in users) {
        this.msg = "Username taken!";
        this.$forceUpdate();
        return;
      }
      store.commit("register", { username :this.username, password: this.password });
      store.commit("login", this.username);
      this.$forceUpdate();
      router.push("/");
      return;
    }
    this.msg = "Invalid credentials.";
    this.$forceUpdate();
  }
}
</script>
