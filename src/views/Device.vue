<template>
  <div>
    <section class="hero welcome is-info">
      <div class="hero-body">
        <div class="container content">
          <div class="columns">
            <div class="column">
              <h1 class="title">{{device.name}}</h1>
            </div>
            <button class="button is-warning" @click="save()">Save</button>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h1 class="title">Saved Widgets</h1>
        <div class="columns">
          <ConfigureWidget v-for="widget in widgets" :key="widget._id" :widget="widget"></ConfigureWidget>
        </div>
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
import { UserTags, IDevice } from "@/common/Types"

@Component({
  components: {
    ConfigureWidget,
  },
})
export default class Profile extends Vue {
  private url = process.env.VUE_APP_HAR + "users/" + store.state.user._id + "/devices/"
  private device: IDevice

  private mounted() {
    const id = this.$route.params.id
    axios
      .get(this.url + id, { withCredentials: true })
      .then(response => {
        const { device } = response.data
        this.device = device
        this.$forceUpdate()
      })
      .catch(err => {
        console.log("Bad:" + err)
        this.failed = true
      })
  }
  get widgets() {
    return store.state.widgets
  }
  get isDeveloper() {
    return store.state.user.tags.includes(UserTags.DEVELOPER)
  }
  save() {}
}
</script>

<style lang="stylus" scoped>
.is-online {
  margin: 0 0 0 5px;
}

.level {
  display: flex;
  justify-content: space-between;
}
</style>
