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
import { Component, Vue } from 'vue-property-decorator';
import Navbar from '@/components/Navbar.vue'; // @ is an alias to /src

@Component({
  components: {
    Navbar,
  },
})
export default class App extends Vue {}
</script>
