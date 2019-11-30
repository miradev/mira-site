<template>
  <section class="hero is-dark is-shadowless is-medium is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title toggleadd is-1 is-cursor-pointer is-size-1-touch">
          In
          <span class="highlight">Development...</span>
        </h1>
        <span class="icon is-large">
          <i class="fa fa-hammer fa-3x"></i>
          <i class="fa fa-hard-hat fa-3x"></i>
        </span>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Navbar from '@/components/Navbar.vue'; // @ is an alias to /src
@Component({
  components: {
    Navbar,
  },
})
export default class Hero extends Vue {}
</script>

<style lang="stylus" scoped>
.highlight {
  color: #AFEDFA !important;
}

.is-dark {
  background-color: #17171D;
}
</style>
