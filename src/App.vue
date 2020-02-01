<template>
  <div id="app">
    <div class="hero-head is-dark">
      <div class="container">
        <Navbar></Navbar>
      </div>
    </div>
    <router-view />
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Navbar from '@/components/Navbar.vue'; // @ is an alias to /src

@Component({
  components: {
    Navbar,
  },
})
export default class App extends Vue {}
</script>
