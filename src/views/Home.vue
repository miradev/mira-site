<template>
  <div>
    <Hero></Hero>
    <section class="section">
      <div class="container">
        <h1 class="title is-2 has-text-centered">All the features your mirror needs</h1>
        <br>
        <div class="columns">
          <div class="column">
            <h1 class="title">Mira OS</h1>
            <p class="">
              Mira OS is a dedicated operating system made with smart mirrors in mind.
              Comes built-in with common smart mirror functionality and is fully
              extensible.
            </p>
            <br>
            <button class="button">Learn More</button>
          </div>
          <div class="column">
            <img class="is-hidden-mobile" src="../assets/miraos.svg" alt="Mira OS">
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column">
            <img class="is-hidden-mobile" src="../assets/widgetsupport.svg" alt="Widget support">
          </div>
          <div class="column">
            <h1 class="title">Rich Widget Support</h1>
            <p class="">
              Mira OS is built with customizability and extensibility in mind.
              Developers can write custom widgets using familier languages
              and run them directly on the mirror. Mira OS provides the APIs
              necessary for developers to leverage all of the mirror’s features.
              </p>
            <br>
            <button class="button">Developer Portal</button>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column">
            <h1 class="title">Mira Marketplace</h1>
            <p class="">
              The Mira Marketplace is a place for developers to share their
              customizations and widgets with the community. Users can use
              the marketplace to quickly and easily add user creations to
              their own mirrors.
            </p>
            <br>
            <button class="button">View Marketplace</button>
          </div>
          <div class="column">
            <img class="is-hidden-mobile" src="../assets/marketplace.svg" alt="Marketplace">
          </div>
        </div>
      </div>
    </section>
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
