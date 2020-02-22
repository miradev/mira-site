<template>
  <div class="wrapper">
    <nav class="level">
      <div class="level-left">
        <div class="level-item has-text-centered">
          <div>
            <p class="title">Mira Alpha</p>
          </div>
        </div>
        <div class="level-item">
          <b-icon pack="fas" icon="circle" size="is-small" type="is-success"></b-icon>
          <p class="heading is-success is-online">Online</p>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <button class="button">Save Changes</button>
        </div>
      </div>
    </nav>
    <section class="section is-dark">
      <h1 class="title">Saved Widgets</h1>
      <div class="columns">
        <ConfigureWidget v-for="widget in widgets" :key="widget._id" :widget="widget"></ConfigureWidget>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import axios from "axios"
import Component from "vue-class-component"
import ConfigureWidget from "@/components/ConfigureWidget.vue"
import store from "../store"
import router from "../router"
@Component({
  components: {
    ConfigureWidget,
  },
})
export default class Profile extends Vue {
  get widgets() {
    return store.state.widgets
  }
  get isDeveloper() {
    return store.state.user.tags.includes("dev")
  }
}
</script>

<style lang="stylus" scoped>
.is-online {
  margin: 0 0 0 5px;
}

.wrapper {
  background-color: $mid-gray;
}

.level {
  display: flex;
  justify-content: space-between;
}
</style>
