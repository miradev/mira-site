<template>
    <b-navbar>
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
              <LogoSmall/>
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item tag="router-link" :to="{path: '/about'}">
                Features
            </b-navbar-item>
            <b-navbar-item tag="router-link" :to="{path: '/marketplace'}">
                Marketplace
            </b-navbar-item>
            <b-navbar-item tag="router-link" :to="{path: '/docs'}">
                Developer
            </b-navbar-item>
        </template>

        <template slot="end">
              <!-- Show if logged in -->
              <b-navbar-item tag="router-link"
                v-show="authenticated" :to="{path: '/profile'}">
                Hello {{ username }}
              </b-navbar-item>
              <b-navbar-item tag="div" v-show="authenticated" @click="logout()">
                Log Off
              </b-navbar-item>

              <!-- Show if not logged in -->
              <b-navbar-item v-show="!authenticated" tag="router-link"
              :to="{path: '/login'}" class="button is-text is-nolink is-uppercase">
                <span>Login</span>
              </b-navbar-item>
              <b-navbar-item v-show="!authenticated" tag="router-link"
              :to="{path: '/register'}" class="button is-primary is-uppercase">
                Sign Up
              </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import LogoSmall from '@/components/LogoSmall.vue';
import store from '../store';
import router from '../router';

@Component({
  components: {
    LogoSmall,
  },
})
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
nav
  background-color $dark-gray
.navbar-item
  color $cream

.is-text
  color $cream !important
</style>
