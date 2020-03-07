<template>
  <section class="section hero">
    <div class="hero-body login-page">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-black">Register</h3>
          <hr class="login-hr" />
          <p class="subtitle has-text-black">Create a new account</p>
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
                    type="email"
                    placeholder="Email"
                    autofocus
                    v-model="email"
                  />
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input
                    class="input is-large"
                    type="text"
                    placeholder="Username"
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
              <div class="field">
                <div class="control">
                  <input
                    class="input is-large"
                    type="password"
                    placeholder="Repeat Password"
                    v-model="password2"
                  />
                </div>
              </div>
              <b-button
                type="is-primary"
                icon-right="sign-out-alt"
                expanded
                @click="register()"
              >Create Account</b-button>
            </form>
          </div>
          <p class="has-text-grey">
            <router-link to="/login">Already have an account?</router-link>&nbsp;·&nbsp;
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

@Component
export default class Register extends Vue {
  private url = process.env.VUE_APP_HAR + "signup"
  private username: string = ""
  private email: string = ""
  private password: string = ""
  private password2: string = ""
  private msg: string = ""
  public checked: boolean = false

  register() {
    if (this.password2 != this.password) {
      this.msg = "Passwords don't match!"
      return
    }
    let body = {
      username: this.username,
      password: this.password,
      email: this.email,
      dev: this.checked,
    }
    axios
      .post(this.url, body)
      .then(response => {
        let description: string = response.data.description
        if (description) {
          this.msg = "User already exists."
          this.$forceUpdate()
          return
        }
        this.$forceUpdate()
        router.push("/login")
      })
      .catch(error => {
        this.msg = "Something bad happened."
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
