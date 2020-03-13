<template>
  <section class="hero is-dark">
    <div class="hero-body">
      <div class="container">
        <div class="blurb">
          <h1 class="title">Your Smart Mirror Platform</h1>
          <br />
          <p class="subtitle">
            Spend your time building apps, not ops.
            The Mira platform provides Mira OS, the Mira Marketplace,
            and a plethora of helpful tools right out of the box.
            Forget about the complexities of setting up the backend and start
            configuring your own smart mirror today.
          </p>
        </div>
        <img class="hero-image is-hidden-mobile" src="../assets/isometric.svg" alt="Mira Hero" />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import Navbar from "@/components/Navbar.vue" // @ is an alias to /src

@Component({
  components: {
    Navbar,
  },
})
export default class Hero extends Vue {}
</script>

<style lang="stylus" scoped>
blurb {
  display: flex;
  align-items: center;
}

h1 {
  font-family: 'Open Sans regular', sans-serif;
  font-weight: 300;
  font-size: 2.2em;
}

p {
  font-family: 'Open Sans regular', sans-serif;
  font-weight: 300;
  font-size: 1.3em;
}

.container {
  display: flex;
  justify-content: space-between;
}

.hero-image {
  width: 40vw;
  height: auto;
  margin-right: 0 !important;
}
</style>
