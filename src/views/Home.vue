<template>
<body id='home'>
  <Hero></Hero>
  <!-- <div class="box cta">
    <p class="has-text-centered">
      <span class="tag is-primary">New</span> Version 0.1 Beta
    </p>
  </div>-->
  <ExploreWidgets></ExploreWidgets>
</body>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Hero from "@/components/Hero.vue"; // @ is an alias to /src
import ExploreWidgets from "@/components/ExploreWidgets.vue"; // @ is an alias to /src

@Component({
  components: {
    Hero,
    ExploreWidgets
  }
})
export default class Home extends Vue {}
</script>

<style>
.benefits svg.fa {
  fill: url(#primarygrad);
}

.comein {
  transform: translateX(-800px);
}

@keyframes comein {
  to {
    transform: translateX(0);
  }
}
</style>
