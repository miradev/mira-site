<template>
  <nav class="navbar inverttooltips navbartooltips is-dark">
    <div class="navbar-brand">
      <router-link
        to="/"
        class="navbar-item navbar-logo"
        style="margin-right: auto;"
      >
        <img
          src="../assets/logo.png"
          alt="mira"
        />
      </router-link>
      <router-link
        to="/login"
        class="navbar-item is-hidden-tablet is-paddingless"
      >
        Login
      </router-link>
      <div
        class="navbar-burger burger"
        style="margin-left: 0;"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div class="navbar-menu">
      <div class="navbar-start">
        <router-link
          to="/marketplace"
          class="navbar-item"
        >
          Marketplace
        </router-link>
        <router-link
          to="/docs"
          class="navbar-item"
        >
          Documentation
        </router-link>
        <router-link
          to="/about"
          class="navbar-item is-hidden-tablet-only"
        >
          About
        </router-link>
      </div>
      <div class="navbar-end">
        <!-- Show if logged in -->
        <router-link
          v-show="authenticated"
          to="/profile"
          class="navbar-item is-hidden-mobile"
        >
          Hello {{ username }}
        </router-link>
        <a
          v-show="authenticated"
          class="navbar-item is-hidden-mobile"
          @click="logout()"
        >Log Off</a>

        <!-- Show if not logged in -->
        <router-link
          to="/login"
          class="navbar-item is-hidden-tablet"
        >
          Login
        </router-link>
        <router-link
          to="/register"
          class="navbar-item is-hidden-tablet"
        >
          Sign Up
        </router-link>
        <div
          v-show="!authenticated"
          class="navbar-item is-hidden-mobile is-paddingless"
        >
          <router-link
            to="/login"
            class="button is-text is-nolink is-uppercase"
          >
            <span class="icon is-small">
              <svg class="fa icon-light-sign-in">
                <use
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  xlink:href="#icon-light-sign-in"
                />
              </svg>
            </span>
            <span>Login</span>
          </router-link>
        </div>
        <span
          v-show="!authenticated"
          class="navbar-item is-hidden-mobile is-paddingless"
        >or</span>
        <div
          v-show="!authenticated"
          class="navbar-item is-hidden-mobile"
        >
          <router-link
            to="/register"
            class="button is-primary is-uppercase"
          >
            Sign Up
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import store from '../store';
import router from '../router';

@Component
export default class Navbar extends Vue {
  public name = 'navbar'

  get authenticated() {
    return this.$store.state.authenticated;
  }

  get username() {
    return this.$store.state.username;
  }

  logout() {
    this.$store.commit('logout');
    router.push('/');
  }

  beforeRouteUpdate(to: any, from: any, next: any) {
    this.name = to.params.name;
    next();
  }
}
</script>

<style lang="stylus" scoped>
.is-text
  color #44bfd5 !important
</style>
