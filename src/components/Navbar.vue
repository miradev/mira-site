<template>
  <nav class="navbar">
    <!-- Mobile -->
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item navbar-logo" style="margin-right: auto;">
        <LogoSmall/>
      </router-link>
      <router-link to="/marketplace" class="navbar-item">
        Features
      </router-link>
      <router-link to="/docs" class="navbar-item">
        Marketplace
      </router-link>
      <router-link to="/about" class="navbar-item">
        Developers
      </router-link>
    </div>

    <!-- Desktop/Tablet -->
    <div class="navbar-menu">
      <div class="navbar-end">
        <!-- Show if logged in -->
        <router-link
          v-show="authenticated" to="/profile" class="navbar-item is-hidden-mobile">
          Hello {{ username }}
        </router-link>
        <a v-show="authenticated" class="navbar-item is-hidden-mobile" @click="logout()">Log Off</a>

        <!-- Show if not logged in -->
        <div v-show="!authenticated" class="navbar-item is-hidden-mobile is-paddingless">
          <router-link to="/login" class="button is-text is-nolink is-uppercase">
            <span>Login</span>
          </router-link>
        </div>
        <span v-show="!authenticated" class="navbar-item is-hidden-mobile is-paddingless">or</span>
        <div v-show="!authenticated" class="navbar-item is-hidden-mobile">
          <router-link to="/register" class="button is-primary is-uppercase">
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
