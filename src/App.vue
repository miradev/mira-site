<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view />
    <Footer></Footer>
  </div>
</template>
<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import Navbar from "@/components/Navbar.vue" // @ is an alias to /src
import Footer from "@/components/FooterLarge.vue" // @ is an alias to /src
import store from "./store"

@Component({
  components: {
    Navbar,
    Footer,
  },
})
export default class App extends Vue {}
</script>
<style lang="scss">
// Import Bulma's core
@import "~bulma/sass/utilities/_all";
$navbar-breakpoint: 768px;
// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>
