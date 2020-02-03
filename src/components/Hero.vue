<template>
  <section class="hero is-shadowless">
    <div class="hero-body is-dark">
      <div class="container">
        <div class="blurb">
          <h1 class="text-white">Your Smart Mirror Platform</h1>
          <p class="text-white">Spend your time building apps, not ops.
            The Mira platform provides Mira OS, the Mira Marketplace,
            and a plethora of helpful tools right out of the box.
            Forget about the complexities of setting up the backend and start
            configuring your own smart mirror today.</p>
        </div>
        <img class="hero-image is-hidden-mobile" src="../assets/isometric.svg" alt="Mira Hero">
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
  font-size 2.2em

p
  font-family 'Open Sans regular', sans-serif;
  font-weight 300
  font-size 1.2em

.container
  display flex
  justify-content space-between

.hero-image
  width 50vw
  height auto
  margin-right 0 !important
  // object-fit contain
  // mask-image: linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0));

</style>
