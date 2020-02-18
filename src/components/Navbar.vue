<template>
  <b-navbar>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <LogoSmall />
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item tag="router-link" :to="{ path: '/about' }">Features</b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ path: '/marketplace' }">Marketplace</b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ path: '/docs' }">Developer</b-navbar-item>
    </template>

    <template slot="end">
      <!-- Show if logged in -->
      <b-navbar-item tag="div" v-show="authenticated">
        <div class="buttons">
          <router-link class="button is-primary" :to="profile">Hello {{ username }}</router-link>
          <button class="button is-alert" @click="logout()">Log Out</button>
        </div>
      </b-navbar-item>

      <!-- Show if not logged in -->
      <b-navbar-item tag="div" v-show="!authenticated">
        <div class="buttons">
          <router-link to="/login" class="button is-primary">Login</router-link>
          <router-link to="/register" class="button is-light">Sign Up</router-link>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script lang="ts">
import Vue from "vue"
import axios from "axios"
import Component from "vue-class-component"
import LogoSmall from "@/components/LogoSmall.vue"
import store from "../store"
import router from "../router"

@Component({
  components: {
    LogoSmall,
  },
})
export default class Navbar extends Vue {
  public name = "navbar"
  private logoutUrl = process.env.VUE_APP_HAR + "logout"
  get profile() {
    return "/profile/" + store.state.user.username
  }

  get authenticated() {
    return store.state.authenticated
  }

  get username() {
    return store.state.user.username
  }

  logout() {
    axios
      .get(this.logoutURL)
      .then(response => {
        console.log(response)
        store.commit("logout")
        this.$forceUpdate()
        router.push("/")
      })
      .catch(error => {
        console.log(`Error: ${error}`)
        this.$forceUpdate()
        router.push("/")
      })
  }

  beforeRouteUpdate(to: any, from: any, next: any) {
    this.name = to.params.name
    next()
  }
}
</script>

<style lang="stylus" scoped>
nav {
  background-color: $dark-gray !important;
}

.is-active {
  background-color: $dark-gray;
}

.navbar-item {
  color: $cream;
  background-color: $dark-gray;
}

.is-text {
  color: $cream !important;
}
</style>
