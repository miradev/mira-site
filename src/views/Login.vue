<template>
  <section class="section hero">
    <div class="hero-body login-page">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-black">Login</h3>
          <hr class="login-hr" />
          <p class="subtitle has-text-black">Please login to proceed.</p>
          <div class="box">
            <figure class="avatar">
              <img src="@/assets/logo_square.png" alt="Mira" />
            </figure>
            <form>
              <h3 class="subtitle is-6 red-text" v-show="this.msg">{{this.msg}}</h3>
              <div class="field">
                <div class="control">
                  <input
                    class="input is-large"
                    type="text"
                    placeholder="Username"
                    autofocus
                    v-model="username"
                  />
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <input
                    class="input is-large"
                    type="password"
                    placeholder="Password"
                    v-model="password"
                  />
                </div>
              </div>
              <b-button type="is-primary" icon-right="sign-out-alt" expanded @click="login()">Login</b-button>
            </form>
          </div>
          <p class="has-text-grey">
            <router-link to="/register">Sign Up</router-link>&nbsp;·&nbsp;
            <a href="../">Forgot Password</a> &nbsp;·&nbsp;
            <a href="../">Need Help?</a>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import axios from "axios"
import router from "../router"
import store from "../store"
import { IUser } from "@/common/Types"

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
      .post(this.url, body, { withCredentials: true })
      .then(response => {
        if (response.data.redirect == "/login" || response.data.success == false) {
          this.msg = "Incorrect credentials."
          this.$forceUpdate()
          return
        }
        let user: IUser = response.data.user
        store.commit("login", user)
        this.msg = "Logged in."
        this.$forceUpdate()
        if (store.state.qr) {
          router.push("/profile/" + user.username + "/2")
        } else {
          router.push("/")
        }
      })
      .catch(error => {
        this.msg = "Incorrect credentials."
        this.$forceUpdate()
      })
  }
}
</script>

<style scoped>
.hero >>> .login-page {
  font-family: "Questrial", sans-serif;
  font-size: 14px;
  font-weight: 300;
}

.box {
  margin-top: 5rem;
}

.avatar {
  margin-top: -70px;
  padding-bottom: 20px;
}

.avatar img {
  padding: 5px;
  background: #fff;
  border-radius: 50%;
  -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  width: 150px;
}

.login-page >>> input {
  font-weight: 300;
}

.login-hr {
  border-bottom: 1px solid black;
}

.has-text-black {
  color: black;
}

.field {
  padding-bottom: 10px;
}

.fa {
  margin-left: 5px;
}
</style>
