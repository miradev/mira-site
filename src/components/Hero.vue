<template>
  <section class="hero is-dark is-shadowless is-small">
    <div class="hero-body is-dark">
      <div class="container">
        <div>
          <h1>Your Smart Mirror Platform</h1>
          <p>Spend your time building apps, not ops.
            The Mira platform provides Mira OS, the Mira Marketplace,
            and a plethora of helpful tools right out of the box.
            Forget about the complexities of setting up the backend and start
            configuring your own smart mirror today.</p>
        </div>
        <HeroSVG/>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import HeroSVG from '@/components/HeroSVG.vue';

@Component({
  components: {
    HeroSVG,
  },
})

export default class Hero extends Vue {}
</script>

<style lang="stylus" scoped>
@import "../common/colors.styl"
.container
  display flex
  justify-content space-around

.highlight
  color #AFEDFA !important

.text-white
  color: white

.is-dark
  background-color: $dark-gray

.bg-white
  background-color white

</style>
