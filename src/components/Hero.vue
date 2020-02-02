<template>
  <section class="hero is-dark is-shadowless is-fullheight">
    <div class="hero-head">
      <Navbar></Navbar>
    </div>
    <div class="hero-body is-dark">
      <div class="container">
        <div>
          <h1 class="text-white">Your Smart Mirror Platform</h1>
          <p class="text-white">Spend your time building apps, not ops.
            The Mira platform provides Mira OS, the Mira Marketplace,
            and a plethora of helpful tools right out of the box.
            Forget about the complexities of setting up the backend and start
            configuring your own smart mirror today.</p>
        </div>
        <img class="hero-image" src="../assets/Isometric.png" alt="">
      </div>
    </div>
  </section>
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
export default class Hero extends Vue {}
</script>

<style lang="stylus" scoped>
h1
  font-family 'Open Sans regular', sans-serif;
  font-weight 300
  font-size 3rem

p
  font-family 'Open Sans regular', sans-serif;
  font-weight 300
  font-size 1.5rem

.container
  display flex
  justify-content space-between

.hero-image
  height 75vh

.highlight
  color #AFEDFA !important

.text-white
  color: white

.is-dark
  background-color: $dark-gray

.bg-white
  background-color white

</style>
