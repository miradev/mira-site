<template>
  <div>
    <Hero></Hero>
    <ExploreWidgets></ExploreWidgets>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Hero from '@/components/Hero.vue'; // @ is an alias to /src
import ExploreWidgets from '@/components/ExploreWidgets.vue'; // @ is an alias to /src
import Footer from '@/components/FooterLarge.vue';

@Component({
  components: {
    Hero,
    ExploreWidgets,
    Footer,
  },
})
export default class Home extends Vue {}
</script>

<style lang="stylus" scoped>
.benefits svg.fa {
  fill: url('#primarygrad');
}

.comein {
  transform: translateX(-800px);
}

@keyframes comein {
  to {
    transform: translateX(0);
  }
}

body {
  background-color: #17171D;
}

.highlight {
  color: #AFEDFA !important;
}

.is-dark {
  background-color: #17171D;
}
</style>
